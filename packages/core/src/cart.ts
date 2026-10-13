import { getProduct } from './catalog';
import type { Cart } from './types';

export const FREE_SHIPPING_FROM = 150_000;
export const SHIPPING_FEE = 12_000;
export const MAX_QTY = 20;

/** Cupones disponibles: código -> porcentaje de descuento. */
export const COUPONS: Record<string, number> = { CUMBRE10: 10 };

export const emptyCart = (): Cart => ({ lines: [] });

const clampQty = (qty: number) => Math.max(0, Math.min(MAX_QTY, Math.floor(qty)));

export function addItem(cart: Cart, productId: string, qty = 1): Cart {
  if (!getProduct(productId) || qty <= 0) return cart;
  const existing = cart.lines.find((l) => l.productId === productId);
  if (!existing) {
    return { ...cart, lines: [...cart.lines, { productId, qty: clampQty(qty) }] };
  }
  return setQty(cart, productId, existing.qty + qty);
}

export function setQty(cart: Cart, productId: string, qty: number): Cart {
  const next = clampQty(qty);
  if (next === 0) return removeItem(cart, productId);
  return {
    ...cart,
    lines: cart.lines.map((l) => (l.productId === productId ? { ...l, qty: next } : l)),
  };
}

export function removeItem(cart: Cart, productId: string): Cart {
  return { ...cart, lines: cart.lines.filter((l) => l.productId !== productId) };
}

export function applyCoupon(cart: Cart, code: string): { cart: Cart; ok: boolean } {
  const normalized = code.trim().toUpperCase();
  if (normalized in COUPONS) return { cart: { ...cart, coupon: normalized }, ok: true };
  return { cart, ok: false };
}

export const itemCount = (cart: Cart) => cart.lines.reduce((n, l) => n + l.qty, 0);

export function subtotal(cart: Cart): number {
  return cart.lines.reduce((sum, l) => sum + (getProduct(l.productId)?.price ?? 0) * l.qty, 0);
}

export function discount(cart: Cart): number {
  const pct = cart.coupon ? COUPONS[cart.coupon] ?? 0 : 0;
  return Math.round((subtotal(cart) * pct) / 100);
}

export function shipping(cart: Cart): number {
  const net = subtotal(cart) - discount(cart);
  if (cart.lines.length === 0 || net >= FREE_SHIPPING_FROM) return 0;
  return SHIPPING_FEE;
}

export function total(cart: Cart): number {
  return subtotal(cart) - discount(cart) + shipping(cart);
}

/** Cuánto falta para envío gratis (0 si ya aplica o el carrito está vacío). */
export function remainingForFreeShipping(cart: Cart): number {
  if (cart.lines.length === 0) return 0;
  return Math.max(0, FREE_SHIPPING_FROM - (subtotal(cart) - discount(cart)));
}

/** Valida datos leídos de almacenamiento: descarta productos que ya no existen. */
export function sanitizeCart(raw: unknown): Cart {
  if (!raw || typeof raw !== 'object') return emptyCart();
  const r = raw as { lines?: unknown; coupon?: unknown };
  const lines = Array.isArray(r.lines) ? r.lines : [];
  let cart = emptyCart();
  for (const l of lines) {
    if (l && typeof l === 'object') {
      const { productId, qty } = l as { productId?: unknown; qty?: unknown };
      if (typeof productId === 'string' && typeof qty === 'number') cart = addItem(cart, productId, qty);
    }
  }
  if (typeof r.coupon === 'string') cart = applyCoupon(cart, r.coupon).cart;
  return cart;
}
