import { useCallback, useEffect, useState } from 'react';
import { addItem, applyCoupon, emptyCart, removeItem, sanitizeCart, setQty, type Cart } from '@cumbre/core';

const KEY = 'cumbre.cart.v1';

function load(): Cart {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? sanitizeCart(JSON.parse(raw)) : emptyCart();
  } catch {
    return emptyCart();
  }
}

/** Estado del carrito: lógica pura en @cumbre/core, persistencia en localStorage (con tolerancia a fallos). */
export function useCart() {
  const [cart, setCart] = useState<Cart>(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch { /* almacenamiento no disponible */ }
  }, [cart]);

  const add = useCallback((id: string, qty = 1) => setCart((c) => addItem(c, id, qty)), []);
  const set = useCallback((id: string, qty: number) => setCart((c) => setQty(c, id, qty)), []);
  const remove = useCallback((id: string) => setCart((c) => removeItem(c, id)), []);
  const coupon = useCallback(
    (code: string) => {
      const r = applyCoupon(cart, code);
      if (r.ok) setCart(r.cart);
      return r.ok;
    },
    [cart],
  );
  const clear = useCallback(() => setCart(emptyCart()), []);

  return { cart, add, set, remove, coupon, clear };
}
