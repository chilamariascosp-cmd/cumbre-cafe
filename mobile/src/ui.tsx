import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from './theme';

export function Button({ label, onPress, variant = 'primary', style, disabled }: {
  label: string; onPress: () => void; variant?: 'primary' | 'outline'; style?: StyleProp<ViewStyle>; disabled?: boolean;
}) {
  const t = useTheme();
  const primary = variant === 'primary';
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} disabled={disabled} onPress={onPress}
      style={({ pressed }) => [s.btn, { backgroundColor: primary ? t.accent : 'transparent', borderColor: primary ? t.accent : t.fg, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }, style]}>
      <Text style={[s.btnText, { color: primary ? t.accentFg : t.fg }]}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  btn: { minHeight: 46, paddingHorizontal: 20, borderRadius: 999, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  btnText: { fontWeight: '700', fontSize: 15 },
});
