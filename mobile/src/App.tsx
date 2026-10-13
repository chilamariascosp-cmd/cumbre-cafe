import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { itemCount } from '@cumbre/core';
import { CartProvider, useCart } from './store';
import { useTheme } from './theme';
import { Home } from './screens/Home';
import { Shop } from './screens/Shop';
import { Brew } from './screens/Brew';
import { Cart } from './screens/Cart';

type Tab = 'home' | 'shop' | 'brew' | 'cart';
const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Inicio', icon: '⌂' },
  { id: 'shop', label: 'Tienda', icon: '☕' },
  { id: 'brew', label: 'Preparar', icon: '⚖' },
  { id: 'cart', label: 'Carrito', icon: '🛒' },
];

function Shell() {
  const t = useTheme();
  const { cart } = useCart();
  const [tab, setTab] = useState<Tab>('home');
  const [toast, setToast] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const notify = useCallback((name: string) => {
    setToast(`${name} agregado al carrito`);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 2000);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);

  const count = itemCount(cart);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[s.top, { borderColor: t.line }]}>
        <Text style={[s.brand, { color: t.fg }]}>▲ Cumbre</Text>
      </View>
      <View style={{ flex: 1 }}>
        {tab === 'home' && <Home go={setTab} />}
        {tab === 'shop' && <Shop onAdded={notify} />}
        {tab === 'brew' && <Brew />}
        {tab === 'cart' && <Cart goShop={() => setTab('shop')} />}
        {toast !== '' && <View style={[s.toast, { backgroundColor: t.fg }]}><Text style={{ color: t.bg, fontWeight: '600' }}>{toast}</Text></View>}
      </View>
      <View style={[s.tabs, { backgroundColor: t.surface, borderColor: t.line }]} accessibilityRole="tablist">
        {TABS.map((x) => {
          const on = x.id === tab;
          return (
            <Pressable key={x.id} accessibilityRole="tab" accessibilityState={{ selected: on }} accessibilityLabel={x.id === 'cart' ? `Carrito, ${count} productos` : x.label}
              onPress={() => setTab(x.id)} style={s.tab}>
              <Text style={{ fontSize: 20, color: on ? t.accent : t.muted }}>{x.icon}</Text>
              <Text style={{ fontSize: 11, fontWeight: '700', color: on ? t.accent : t.muted }}>{x.label}</Text>
              {x.id === 'cart' && count > 0 && <View style={[s.badge, { backgroundColor: t.accent }]}><Text style={{ color: t.accentFg, fontSize: 10, fontWeight: '800' }}>{count}</Text></View>}
            </Pressable>
          );
        })}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <Shell />
      </CartProvider>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  top: { paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1 },
  brand: { fontSize: 22, fontWeight: '800', letterSpacing: -0.8 },
  tabs: { flexDirection: 'row', borderTopWidth: 1 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8, gap: 2 },
  badge: { position: 'absolute', top: 4, right: '24%', minWidth: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  toast: { position: 'absolute', bottom: 16, alignSelf: 'center', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 999 },
});
