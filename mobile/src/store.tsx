import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { addItem, applyCoupon, emptyCart, removeItem, sanitizeCart, setQty, type Cart } from '@cumbre/core';

const KEY = 'cumbre.cart.v1';

interface CartApi {
  cart: Cart;
  add: (id: string) => void;
  set: (id: string, qty: number) => void;
  remove: (id: string) => void;
  coupon: (code: string) => boolean;
  clear: () => void;
}

const Ctx = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(emptyCart());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => { if (raw) setCart(sanitizeCart(JSON.parse(raw))); })
      .catch(() => undefined)
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(KEY, JSON.stringify(cart)).catch(() => undefined);
  }, [cart, ready]);

  const add = useCallback((id: string) => setCart((c) => addItem(c, id)), []);
  const set = useCallback((id: string, q: number) => setCart((c) => setQty(c, id, q)), []);
  const remove = useCallback((id: string) => setCart((c) => removeItem(c, id)), []);
  const clear = useCallback(() => setCart(emptyCart()), []);
  const coupon = useCallback((code: string) => {
    const r = applyCoupon(cart, code);
    if (r.ok) setCart(r.cart);
    return r.ok;
  }, [cart]);

  const value = useMemo(() => ({ cart, add, set, remove, coupon, clear }), [cart, add, set, remove, coupon, clear]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartApi {
  const v = useContext(Ctx);
  if (!v) throw new Error('useCart debe usarse dentro de CartProvider');
  return v;
}
