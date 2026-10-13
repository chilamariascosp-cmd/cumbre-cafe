import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BREW_METHODS, IMAGE_ALT, brewRecipe, getMethod, ratioLabel, type BrewMethodId } from '@cumbre/core';
import { IMAGES } from '../images';
import { useTheme, fonts } from '../theme';

export function Brew() {
  const t = useTheme();
  const [id, setId] = useState<BrewMethodId>('v60');
  const method = getMethod(id);
  const [ml, setMl] = useState(method.range.initial);
  const r = brewRecipe(id, ml);
  const { min, max, step } = method.range;
  const change = (d: number) => setMl((v) => Math.min(max, Math.max(min, v + d * step)));

  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 40 }}>
      <Text style={[s.h, { color: t.fg }]}>Pesa, no adivines</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {BREW_METHODS.map((m) => {
          const on = m.id === id;
          return (
            <Pressable key={m.id} accessibilityRole="tab" accessibilityState={{ selected: on }}
              onPress={() => { setId(m.id); setMl(m.range.initial); }}
              style={[s.chip, { borderColor: on ? t.fg : t.line, backgroundColor: on ? t.fg : t.surface }]}>
              <Text style={{ color: on ? t.bg : t.fg, fontWeight: '600' }}>{m.name}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={[s.stepper, { borderColor: t.line, backgroundColor: t.surface }]}>
        <Pressable accessibilityRole="button" accessibilityLabel="Menos bebida" onPress={() => change(-1)} style={s.sbtn}><Text style={[s.sbtnT, { color: t.fg }]}>−</Text></Pressable>
        <View style={{ alignItems: 'center' }}>
          <Text style={[s.big, { color: t.fg, fontFamily: fonts.mono }]}>{ml} ml</Text>
          <Text style={{ color: t.muted, fontSize: 12 }}>{id === 'espresso' ? 'bebida en la taza' : 'cantidad de bebida'}</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Más bebida" onPress={() => change(1)} style={s.sbtn}><Text style={[s.sbtnT, { color: t.fg }]}>+</Text></Pressable>
      </View>
      <View style={s.grid}>
        <View style={[s.box, { backgroundColor: t.accent, borderColor: t.accent }]}>
          <Text style={[s.val, { color: t.accentFg, fontFamily: fonts.mono }]}>{r.coffeeG} g</Text>
          <Text style={{ color: t.accentFg, fontSize: 12 }}>de café molido</Text>
        </View>
        <View style={[s.box, { borderColor: t.line, backgroundColor: t.surface }]}>
          <Text style={[s.val, { color: t.fg, fontFamily: fonts.mono }]}>{r.waterMl} ml</Text>
          <Text style={{ color: t.muted, fontSize: 12 }}>{id === 'espresso' ? 'de extracción' : 'de agua'}</Text>
        </View>
        <View style={[s.box, { borderColor: t.line, backgroundColor: t.surface }]}>
          <Text style={[s.val, { color: t.fg, fontFamily: fonts.mono }]}>{method.tempC} °C</Text>
          <Text style={{ color: t.muted, fontSize: 12 }}>temperatura</Text>
        </View>
        <View style={[s.box, { borderColor: t.line, backgroundColor: t.surface }]}>
          <Text style={[s.val, { color: t.fg, fontFamily: fonts.mono }]}>{ratioLabel(method)}</Text>
          <Text style={{ color: t.muted, fontSize: 12 }}>proporción</Text>
        </View>
      </View>
      <Image source={IMAGES[method.image]} accessibilityLabel={IMAGE_ALT[method.image]} style={s.photo} />
      <Text style={{ color: t.muted, fontFamily: fonts.mono, fontSize: 12 }}>Molienda: {method.grind} · Tiempo: {method.time}</Text>
      {method.steps.map((st, i) => (
        <View key={st} style={{ flexDirection: 'row', gap: 10 }}>
          <Text style={{ color: t.accent, fontFamily: fonts.mono }}>{i + 1}.</Text>
          <Text style={{ color: t.fg, flex: 1, lineHeight: 21 }}>{st}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  h: { fontSize: 30, fontWeight: '800', letterSpacing: -0.8 },
  chip: { minHeight: 40, paddingHorizontal: 16, borderRadius: 999, borderWidth: 1.5, justifyContent: 'center' },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1.5, borderRadius: 20, padding: 8 },
  sbtn: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center' },
  sbtnT: { fontSize: 28 },
  big: { fontSize: 28 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  box: { width: '48%', borderWidth: 1.5, borderRadius: 16, padding: 14, gap: 4 },
  val: { fontSize: 24 },
  photo: { width: '100%', height: 220, borderRadius: 18 },
});
