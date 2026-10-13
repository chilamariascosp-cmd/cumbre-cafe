import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import {
  FREE_SHIPPING_FROM, IMAGE_ALT, discount, formatCOP, getProduct, isValid, remainingForFreeShipping,
  shipping, subtotal, total, validateCheckout, type CheckoutErrors, type CheckoutForm,
} from '@cumbre/core';
import { IMAGES } from '../images';
import { useCart } from '../store';
import { useTheme, fonts } from '../theme';
import { Button } from '../ui';

const EMPTY: CheckoutForm = { name: '', email: '', phone: '', city: '', address: '' };
const FIELDS: { key: keyof CheckoutForm; label: string; keyboard?: 'email-address' | 'phone-pad' }[] = [
  { key: 'name', label: 'Nombre completo' },
  { key: 'email', label: 'Correo electrónico', keyboard: 'email-address' },
  { key: 'phone', label: 'Celular', keyboard: 'phone-pad' },
  { key: 'city', label: 'Ciudad' },
  { key: 'address', label: 'Dirección de entrega' },
];

export function Cart({ goShop }: { goShop: () => void }) {
  const t = useTheme();
  const { cart, set, remove, coupon, clear } = useCart();
  const [step, setStep] = useState<'cart' | 'checkout' | 'done'>('cart');
  const [form, setForm] = useState<CheckoutForm>(EMPTY);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const [order, setOrder] = useState({ id: '', paid: 0 });

  const missing = remainingForFreeShipping(cart);
  const progress = Math.min(100, Math.round(((FREE_SHIPPING_FROM - missing) / FREE_SHIPPING_FROM) * 100));

  const confirm = () => {
    const found = validateCheckout(form);
    setErrors(found);
    if (!isValid(found)) return;
    setOrder({ id: `CUM-${Math.floor(10000 + Math.random() * 90000)}`, paid: total(cart) });
    clear(); setForm(EMPTY); setStep('done');
  };

  if (step === 'done') {
    return (
      <View style={s.center}>
        <Text style={{ fontSize: 56, color: t.leaf }}>✓</Text>
        <Text style={[s.h, { color: t.fg }]}>¡Gracias por tu pedido!</Text>
        <Text style={{ color: t.fg }}>Pedido <Text style={{ fontFamily: fonts.mono }}>{order.id}</Text></Text>
        <Text style={{ color: t.muted, textAlign: 'center' }}>Pagarás {formatCOP(order.paid)} contra entrega. Es una demostración: no se envió ningún pedido real.</Text>
        <Button label="Seguir comprando" onPress={() => { setStep('cart'); goShop(); }} />
      </View>
    );
  }

  if (cart.lines.length === 0) {
    return (
      <View style={s.center}>
        <Text style={[s.h, { color: t.fg }]}>Tu carrito está vacío</Text>
        <Button label="Ir a la tienda" onPress={goShop} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 14, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
      {step === 'cart' ? (
        <>
          <Text style={[s.h, { color: t.fg }]}>Tu carrito</Text>
          {cart.lines.map((l) => {
            const p = getProduct(l.productId);
            if (!p) return null;
            return (
              <View key={p.id} style={s.line}>
                <Image source={IMAGES[p.image]} accessibilityLabel={IMAGE_ALT[p.image]} style={s.thumb} />
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={{ color: t.fg, fontWeight: '700' }}>{p.name}</Text>
                  <View style={[s.stepper, { borderColor: t.line }]}>
                    <Pressable accessibilityLabel={`Quitar una unidad de ${p.name}`} onPress={() => set(p.id, l.qty - 1)} style={s.sb}><Text style={{ color: t.fg, fontSize: 18 }}>−</Text></Pressable>
                    <Text style={{ color: t.fg, fontFamily: fonts.mono, minWidth: 22, textAlign: 'center' }}>{l.qty}</Text>
                    <Pressable accessibilityLabel={`Agregar una unidad de ${p.name}`} onPress={() => set(p.id, l.qty + 1)} style={s.sb}><Text style={{ color: t.fg, fontSize: 18 }}>+</Text></Pressable>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ color: t.fg, fontFamily: fonts.mono }}>{formatCOP(p.price * l.qty)}</Text>
                  <Pressable onPress={() => remove(p.id)} accessibilityLabel={`Quitar ${p.name}`}><Text style={{ color: t.muted, textDecorationLine: 'underline', fontSize: 12 }}>Quitar</Text></Pressable>
                </View>
              </View>
            );
          })}
          <View style={[s.meter, { backgroundColor: t.surface2 }]}><View style={{ width: `${progress}%`, height: 8, backgroundColor: t.leaf }} /></View>
          <Text style={{ color: t.muted, fontSize: 13 }}>{missing > 0 ? `Te faltan ${formatCOP(missing)} para envío gratis.` : 'Tienes envío gratis.'}</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TextInput value={code} onChangeText={setCode} placeholder="Cupón (CUMBRE10)" placeholderTextColor={t.muted} autoCapitalize="characters"
              style={[s.input, { flex: 1, borderColor: t.line, backgroundColor: t.surface, color: t.fg }]} />
            <Button label="Aplicar" variant="outline" onPress={() => setMsg(coupon(code) ? 'Cupón aplicado: 10 % de descuento.' : 'Ese cupón no existe. Prueba con CUMBRE10.')} style={{ minHeight: 44 }} />
          </View>
          {msg !== '' && <Text style={{ color: t.muted, fontSize: 13 }}>{msg}</Text>}
        </>
      ) : (
        <>
          <Text style={[s.h, { color: t.fg }]}>Datos de entrega</Text>
          {FIELDS.map((f) => (
            <View key={f.key} style={{ gap: 4 }}>
              <Text style={{ color: t.fg, fontWeight: '600', fontSize: 13 }}>{f.label}</Text>
              <TextInput value={form[f.key]} onChangeText={(v) => setForm({ ...form, [f.key]: v })} keyboardType={f.keyboard} autoCapitalize={f.key === 'email' ? 'none' : 'sentences'}
                accessibilityLabel={f.label} style={[s.input, { borderColor: errors[f.key] ? t.accent : t.line, backgroundColor: t.surface, color: t.fg }]} />
              {errors[f.key] && <Text style={{ color: t.accent, fontSize: 13 }}>{errors[f.key]}</Text>}
            </View>
          ))}
          <Text style={{ color: t.muted, fontSize: 13 }}>Pago contra entrega. Demostración: no se procesa ningún pago real.</Text>
        </>
      )}
      <View style={{ gap: 6, borderTopWidth: 1, borderColor: t.line, paddingTop: 12 }}>
        <Row k="Subtotal" v={formatCOP(subtotal(cart))} />
        {discount(cart) > 0 && <Row k="Descuento" v={`−${formatCOP(discount(cart))}`} />}
        <Row k="Envío" v={shipping(cart) === 0 ? 'Gratis' : formatCOP(shipping(cart))} />
        <Row k="Total" v={formatCOP(total(cart))} bold />
      </View>
      {step === 'cart' ? (
        <Button label="Finalizar compra" onPress={() => setStep('checkout')} />
      ) : (
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button label="Volver" variant="outline" onPress={() => setStep('cart')} style={{ flex: 1 }} />
          <Button label="Confirmar pedido" onPress={confirm} style={{ flex: 2 }} />
        </View>
      )}
    </ScrollView>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ color: t.fg, fontWeight: bold ? '800' : '400', fontSize: bold ? 18 : 15 }}>{k}</Text>
      <Text style={{ color: t.fg, fontFamily: fonts.mono, fontWeight: bold ? '800' : '400', fontSize: bold ? 18 : 15 }}>{v}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  h: { fontSize: 28, fontWeight: '800', letterSpacing: -0.6 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, padding: 28 },
  line: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  thumb: { width: 64, height: 64, borderRadius: 12 },
  stepper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderRadius: 999, alignSelf: 'flex-start' },
  sb: { width: 34, height: 32, alignItems: 'center', justifyContent: 'center' },
  meter: { height: 8, borderRadius: 4, overflow: 'hidden' },
  input: { minHeight: 44, borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 14 },
});
