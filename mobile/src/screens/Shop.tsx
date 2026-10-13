import { useState } from 'react';
import { FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CATEGORIES, IMAGE_ALT, filterProducts, formatCOP, type Category, type Product } from '@cumbre/core';
import { IMAGES } from '../images';
import { useCart } from '../store';
import { useTheme, fonts } from '../theme';
import { Button } from '../ui';

export function Shop({ onAdded }: { onAdded: (name: string) => void }) {
  const t = useTheme();
  const { add } = useCart();
  const [category, setCategory] = useState<Category | 'todos'>('todos');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const items = filterProducts(category, query);

  const addAndNotify = (p: Product) => { add(p.id); onAdded(p.name); };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16, gap: 10 }}>
        <TextInput value={query} onChangeText={setQuery} placeholder="Buscar: floral, Nariño, chocolate…" placeholderTextColor={t.muted}
          accessibilityLabel="Buscar productos" style={[s.search, { borderColor: t.line, backgroundColor: t.surface, color: t.fg }]} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {CATEGORIES.map((c) => {
            const on = c.id === category;
            return (
              <Pressable key={c.id} accessibilityRole="button" accessibilityState={{ selected: on }} onPress={() => setCategory(c.id)}
                style={[s.chip, { borderColor: on ? t.fg : t.line, backgroundColor: on ? t.fg : t.surface }]}>
                <Text style={{ color: on ? t.bg : t.fg, fontWeight: '600' }}>{c.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <FlatList data={items} keyExtractor={(p) => p.id} contentContainerStyle={{ padding: 16, paddingTop: 0, gap: 14 }}
        ListEmptyComponent={<Text style={{ color: t.muted, padding: 20 }}>No encontramos productos. Prueba con otra palabra.</Text>}
        renderItem={({ item: p }) => (
          <View style={[s.card, { backgroundColor: t.surface, borderColor: t.line }]}>
            <Pressable accessibilityRole="button" accessibilityLabel={`Ver detalle de ${p.name}`} onPress={() => setSelected(p)}>
              <Image source={IMAGES[p.image]} accessibilityLabel={IMAGE_ALT[p.image]} style={s.img} />
            </Pressable>
            <View style={{ padding: 14, gap: 6 }}>
              <Text style={[s.name, { color: t.fg }]}>{p.name}</Text>
              <Text style={{ color: t.muted }}>{p.tagline}</Text>
              <View style={s.buy}>
                <View>
                  <Text style={[s.price, { color: t.fg }]}>{formatCOP(p.price)}</Text>
                  <Text style={{ color: t.muted, fontSize: 11 }}>{p.unit}</Text>
                </View>
                <Button label="Agregar" onPress={() => addAndNotify(p)} style={{ minHeight: 40 }} />
              </View>
            </View>
          </View>
        )} />
      <Modal visible={selected !== null} animationType="slide" onRequestClose={() => setSelected(null)}>
        {selected && (
          <View style={{ flex: 1, backgroundColor: t.bg }}>
            <ScrollView>
              <Image source={IMAGES[selected.image]} accessibilityLabel={IMAGE_ALT[selected.image]} style={{ width: '100%', height: 340 }} />
              <View style={{ padding: 20, gap: 10 }}>
                <Text style={{ color: t.muted, fontFamily: fonts.mono, fontSize: 11 }}>{(selected.region ?? 'ACCESORIO').toUpperCase()}</Text>
                <Text style={[s.name, { color: t.fg, fontSize: 28 }]}>{selected.name}</Text>
                <Text style={{ color: t.fg, lineHeight: 22 }}>{selected.description}</Text>
                {selected.altitude && <Text style={{ color: t.muted }}>Altitud: {selected.altitude}</Text>}
                {selected.roast && <Text style={{ color: t.muted }}>Tostión: {selected.roast}</Text>}
                {selected.notes && <Text style={{ color: t.muted }}>Notas: {selected.notes.join(' · ')}</Text>}
                <Text style={[s.price, { color: t.fg, fontSize: 22, marginTop: 8 }]}>{formatCOP(selected.price)} <Text style={{ fontSize: 12, color: t.muted }}>{selected.unit}</Text></Text>
              </View>
            </ScrollView>
            <View style={{ padding: 16, flexDirection: 'row', gap: 10 }}>
              <Button label="Cerrar" variant="outline" onPress={() => setSelected(null)} style={{ flex: 1 }} />
              <Button label="Agregar al carrito" onPress={() => { addAndNotify(selected); setSelected(null); }} style={{ flex: 2 }} />
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  search: { minHeight: 44, borderWidth: 1.5, borderRadius: 999, paddingHorizontal: 16 },
  chip: { minHeight: 38, paddingHorizontal: 16, borderRadius: 999, borderWidth: 1.5, justifyContent: 'center' },
  card: { borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  img: { width: '100%', height: 220 },
  name: { fontSize: 20, fontWeight: '800', letterSpacing: -0.4 },
  buy: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  price: { fontFamily: fonts.mono, fontSize: 17, fontWeight: '500' },
});
