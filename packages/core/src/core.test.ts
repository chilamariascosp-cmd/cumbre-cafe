import { describe, expect, it } from 'vitest';
import {
  PRODUCTS, filterProducts, getProduct,
  emptyCart, addItem, setQty, removeItem, applyCoupon, subtotal, discount, shipping, total,
  itemCount, remainingForFreeShipping, sanitizeCart, MAX_QTY, FREE_SHIPPING_FROM, SHIPPING_FEE,
  brewRecipe, BREW_METHODS, formatCOP, validateCheckout, isValid,
} from './index';

describe('catálogo', () => {
  it('tiene ids únicos y precios positivos', () => {
    const ids = PRODUCTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(PRODUCTS.every((p) => p.price > 0 && Number.isInteger(p.price))).toBe(true);
  });
  it('filtra por categoría y texto sin importar tildes', () => {
    expect(filterProducts('granos').every((p) => p.category === 'granos')).toBe(true);
    expect(filterProducts('todos', 'NARIÑO').map((p) => p.id)).toContain('las-lajas-reserva');
    expect(filterProducts('todos', 'narino').length).toBeGreaterThan(0);
    expect(filterProducts('todos', 'zzz')).toHaveLength(0);
  });
});

describe('carrito', () => {
  it('suma cantidades del mismo producto', () => {
    let c = addItem(emptyCart(), 'guatape-honey');
    c = addItem(c, 'guatape-honey', 2);
    expect(c.lines).toEqual([{ productId: 'guatape-honey', qty: 3 }]);
    expect(itemCount(c)).toBe(3);
  });
  it('ignora productos inexistentes y cantidades no válidas', () => {
    expect(addItem(emptyCart(), 'nada').lines).toHaveLength(0);
    expect(addItem(emptyCart(), 'guatape-honey', 0).lines).toHaveLength(0);
  });
  it('limita la cantidad máxima y elimina al llegar a 0', () => {
    let c = setQty(addItem(emptyCart(), 'kit-v60'), 'kit-v60', 999);
    expect(c.lines[0]?.qty).toBe(MAX_QTY);
    c = setQty(c, 'kit-v60', 0);
    expect(c.lines).toHaveLength(0);
  });
  it('no muta el carrito original', () => {
    const base = addItem(emptyCart(), 'guatape-honey');
    addItem(base, 'kit-v60');
    removeItem(base, 'guatape-honey');
    expect(base.lines).toHaveLength(1);
  });
  it('calcula subtotal, descuento, envío y total', () => {
    let c = addItem(emptyCart(), 'guatape-honey', 2); // 84.000
    expect(subtotal(c)).toBe(84_000);
    expect(shipping(c)).toBe(SHIPPING_FEE);
    expect(total(c)).toBe(96_000);
    const r = applyCoupon(c, ' cumbre10 ');
    expect(r.ok).toBe(true);
    expect(discount(r.cart)).toBe(8_400);
    expect(total(r.cart)).toBe(84_000 - 8_400 + SHIPPING_FEE);
  });
  it('envío gratis desde el umbral', () => {
    const c = addItem(emptyCart(), 'kit-v60', 2); // 270.000
    expect(shipping(c)).toBe(0);
    expect(remainingForFreeShipping(c)).toBe(0);
    const small = addItem(emptyCart(), 'capsulas-oro');
    expect(remainingForFreeShipping(small)).toBe(FREE_SHIPPING_FROM - 28_000);
  });
  it('carrito vacío no cobra envío', () => {
    expect(total(emptyCart())).toBe(0);
  });
  it('rechaza cupones inválidos', () => {
    expect(applyCoupon(emptyCart(), 'GRATIS').ok).toBe(false);
  });
  it('sanitiza datos corruptos del almacenamiento', () => {
    expect(sanitizeCart(null)).toEqual(emptyCart());
    const c = sanitizeCart({ lines: [{ productId: 'kit-v60', qty: 2 }, { productId: 'borrado', qty: 1 }, 'x'], coupon: 'CUMBRE10' });
    expect(c.lines).toEqual([{ productId: 'kit-v60', qty: 2 }]);
    expect(c.coupon).toBe('CUMBRE10');
  });
});

describe('calculadora de preparación', () => {
  it('V60: 320 ml usa 20 g de café', () => {
    const r = brewRecipe('v60', 320);
    expect(r.coffeeG).toBe(20);
    expect(r.waterMl).toBe(320);
  });
  it('espresso usa ratio 1:2', () => {
    expect(brewRecipe('espresso', 36).coffeeG).toBe(18);
  });
  it('limita los valores extremos', () => {
    expect(brewRecipe('prensa', 5).waterMl).toBe(20);
    expect(brewRecipe('prensa', 99999).waterMl).toBe(1000);
  });
  it('el valor inicial de cada método está dentro de su rango', () => {
    expect(BREW_METHODS.every((m) => m.range.initial >= m.range.min && m.range.initial <= m.range.max)).toBe(true);
  });
  it('cada método tiene pasos', () => {
    expect(BREW_METHODS.every((m) => m.steps.length >= 4)).toBe(true);
  });
});

describe('formato y validación', () => {
  it('formatea pesos colombianos', () => {
    expect(formatCOP(0)).toBe('$0');
    expect(formatCOP(42000)).toBe('$42.000');
    expect(formatCOP(1234567)).toBe('$1.234.567');
  });
  it('valida el formulario de compra', () => {
    const ok = { name: 'Ana Pérez', email: 'ana@correo.com', phone: '300 123 4567', city: 'Cali', address: 'Calle 5 # 10-20' };
    expect(isValid(validateCheckout(ok))).toBe(true);
    const bad = validateCheckout({ name: 'A', email: 'ana', phone: '12345', city: '', address: '' });
    expect(Object.keys(bad).sort()).toEqual(['address', 'city', 'email', 'name', 'phone']);
  });
  it('getProduct devuelve undefined si no existe', () => {
    expect(getProduct('x')).toBeUndefined();
  });
});
