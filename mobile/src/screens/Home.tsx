import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FREE_SHIPPING_FROM, IMAGE_ALT, PROCESS_STEPS, REGIONS, formatCOP } from '@cumbre/core';
import { IMAGES } from '../images';
import { useTheme, fonts } from '../theme';
import { Button } from '../ui';

export function Home({ go }: { go: (tab: 'shop' | 'brew') => void }) {
  const t = useTheme();
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={s.pad}>
        <Text style={[s.eyebrow, { color: t.muted }]}>CAFÉ DE ESPECIALIDAD · COLOMBIA</Text>
        <Text style={[s.h1, { color: t.fg }]}>Del cafetal{'\n'}a tu <Text style={{ color: t.accent }}>taza.</Text></Text>
        <Text style={[s.lead, { color: t.muted }]}>Granos de Antioquia, Valle del Cauca y Nariño, tostados cada semana.</Text>
        <View style={s.row}>
          <Button label="Ver la tienda" onPress={() => go('shop')} />
          <Button label="Calcular receta" variant="outline" onPress={() => go('brew')} />
        </View>
      </View>
      <Image source={IMAGES.cafetal} accessibilityLabel={IMAGE_ALT.cafetal} style={s.hero} />
      <Text style={[s.note, { color: t.muted }]}>Envío gratis desde {formatCOP(FREE_SHIPPING_FROM)} · Pago contra entrega</Text>

      <Text style={[s.h2, s.pad, { color: t.fg }]}>Del grano a la taza</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
        {PROCESS_STEPS.map((p, i) => (
          <View key={p.title} style={{ width: 190 }}>
            <Image source={IMAGES[p.image]} accessibilityLabel={IMAGE_ALT[p.image]} style={s.step} />
            <Text style={[s.mono, { color: t.accent }]}>PASO {i + 1}</Text>
            <Text style={[s.h3, { color: t.fg }]}>{p.title}</Text>
            <Text style={{ color: t.muted }}>{p.text}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={[s.h2, s.pad, { color: t.fg }]}>Nuestros orígenes</Text>
      <View style={{ paddingHorizontal: 20, gap: 14 }}>
        {REGIONS.map((r) => (
          <View key={r.id} style={s.origin}>
            <Image source={IMAGES[r.image]} accessibilityLabel={IMAGE_ALT[r.image]} style={StyleSheet.absoluteFill} resizeMode="cover" />
            <View style={s.shade} />
            <View style={s.originIn}>
              <Text style={[s.alt, { fontFamily: fonts.mono }]}>{r.altitude}</Text>
              <Text style={s.originTitle}>{r.name} · {r.department}</Text>
              <Text style={s.originText}>{r.text}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  pad: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 },
  eyebrow: { fontSize: 11, letterSpacing: 1.4, fontFamily: fonts.mono },
  h1: { fontSize: 46, fontWeight: '800', lineHeight: 48, letterSpacing: -1.5, marginTop: 12 },
  lead: { fontSize: 16, lineHeight: 23, marginTop: 14 },
  row: { flexDirection: 'row', gap: 10, marginTop: 20, flexWrap: 'wrap' },
  hero: { height: 360, width: '100%', marginTop: 12 },
  note: { textAlign: 'center', marginTop: 12, fontSize: 13 },
  h2: { fontSize: 26, fontWeight: '800', marginTop: 28, marginBottom: 8, letterSpacing: -0.5 },
  h3: { fontSize: 18, fontWeight: '700', marginTop: 2, marginBottom: 2 },
  mono: { fontFamily: fonts.mono, fontSize: 11, marginTop: 10, letterSpacing: 1 },
  step: { width: 190, height: 238, borderRadius: 16 },
  origin: { height: 280, borderRadius: 20, overflow: 'hidden', backgroundColor: '#000' },
  shade: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(5,10,7,0.45)' },
  originIn: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, gap: 4 },
  alt: { color: '#fff', fontSize: 30 },
  originTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  originText: { color: 'rgba(255,255,255,0.9)', fontSize: 13, lineHeight: 18 },
});
