import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  FREE_SHIPPING_FROM, IMAGE_ALT, discount, formatCOP, getProduct, isValid, remainingForFreeShipping,
  shipping, subtotal, total, validateCheckout, type Cart, type CheckoutErrors, type CheckoutForm,
} from '@cumbre/core';
import { img } from '../lib';

interface Props {
  open: boolean;
  cart: Cart;
  onClose: () => void;
  set: (id: string, qty: number) => void;
  remove: (id: string) => void;
  coupon: (code: string) => boolean;
  clear: () => void;
}

const EMPTY: CheckoutForm = { name: '', email: '', phone: '', city: '', address: '' };
const FIELDS: { key: keyof CheckoutForm; label: string; type?: string; auto: string }[] = [
  { key: 'name', label: 'Nombre completo', auto: 'name' },
  { key: 'email', label: 'Correo electrónico', type: 'email', auto: 'email' },
  { key: 'phone', label: 'Celular', type: 'tel', auto: 'tel' },
  { key: 'city', label: 'Ciudad', auto: 'address-level2' },
  { key: 'address', label: 'Dirección de entrega', auto: 'street-address' },
];

export function CartDrawer({ open, cart, onClose, set, remove, coupon, clear }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<'cart' | 'checkout' | 'done'>('cart');
  const [form, setForm] = useState<CheckoutForm>(EMPTY);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [code, setCode] = useState('');
  const [codeMsg, setCodeMsg] = useState('');
  const [order, setOrder] = useState('');
  const [paid, setPaid] = useState(0);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    if (open && step === 'done') return;
    if (!open) setStep((s) => (s === 'done' ? 'cart' : s));
  }, [open, step]);

  const lines = cart.lines.flatMap((l) => {
    const p = getProduct(l.productId);
    return p ? [{ p, qty: l.qty }] : [];
  });
  const missing = remainingForFreeShipping(cart);
  const progress = Math.min(100, Math.round(((FREE_SHIPPING_FROM - missing) / FREE_SHIPPING_FROM) * 100));

  const applyCode = () => {
    const ok = coupon(code);
    setCodeMsg(ok ? 'Cupón aplicado: 10 % de descuento.' : 'Ese cupón no existe. Prueba con CUMBRE10.');
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateCheckout(form);
    setErrors(found);
    if (!isValid(found)) return;
    setPaid(total(cart));
    setOrder(`CUM-${Math.floor(10000 + Math.random() * 90000)}`);
    clear();
    setForm(EMPTY);
    setStep('done');
  };

  return (
    <dialog ref={ref} className="cart-dialog" aria-label="Carrito de compras" onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}>
      <div className="cart-head">
        <h3>{step === 'cart' ? 'Tu carrito' : step === 'checkout' ? 'Datos de entrega' : 'Pedido recibido'}</h3>
        <button className="icon-btn" onClick={onClose} aria-label="Cerrar carrito">✕</button>
      </div>

      {step === 'done' ? (
        <div className="cart-body">
          <div className="done">
            <div className="check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></div>
            <h3>¡Gracias por tu pedido!</h3>
            <p>Número de pedido <b className="mono">{order}</b></p>
            <p className="hint">Pagarás {formatCOP(paid)} contra entrega. Esto es una demostración: no se envió ningún pedido real.</p>
            <button className="btn primary" onClick={() => { setStep('cart'); onClose(); }}>Seguir comprando</button>
          </div>
        </div>
      ) : step === 'checkout' ? (
        <form className="form cart-body" onSubmit={submit} noValidate id="checkout-form">
          {FIELDS.map((f) => (
            <div className="field" key={f.key}>
              <label htmlFor={`co-${f.key}`}>{f.label}</label>
              <input id={`co-${f.key}`} type={f.type ?? 'text'} autoComplete={f.auto} value={form[f.key]}
                aria-invalid={Boolean(errors[f.key])} aria-describedby={errors[f.key] ? `er-${f.key}` : undefined}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
              {errors[f.key] && <span className="err" id={`er-${f.key}`} role="alert">{errors[f.key]}</span>}
            </div>
          ))}
          <p className="hint">Pago contra entrega. Demostración: no se procesa ningún pago real.</p>
        </form>
      ) : (
        <div className="cart-body">
          {lines.length === 0 ? (
            <div className="empty-cart">
              <p>Tu carrito está vacío.</p>
              <button className="btn" onClick={() => { onClose(); location.hash = '#tienda'; }}>Ir a la tienda</button>
            </div>
          ) : (
            lines.map(({ p, qty }) => (
              <div className="line" key={p.id}>
                <img src={img(p.image)} alt={IMAGE_ALT[p.image]} />
                <div>
                  <div className="nm">{p.name}</div>
                  <div className="un">{p.unit}</div>
                  <div className="stepper">
                    <button onClick={() => set(p.id, qty - 1)} aria-label={`Quitar una unidad de ${p.name}`}>−</button>
                    <span aria-live="polite">{qty}</span>
                    <button onClick={() => set(p.id, qty + 1)} aria-label={`Agregar una unidad de ${p.name}`}>+</button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="price">{formatCOP(p.price * qty)}</div>
                  <button className="link-btn" onClick={() => remove(p.id)}>Quitar</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {step !== 'done' && lines.length > 0 && (
        <div className="cart-foot">
          {step === 'cart' && (
            <>
              <div className="meter" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Progreso hacia envío gratis"><i style={{ width: `${progress}%` }} /></div>
              <p className="hint">{missing > 0 ? `Te faltan ${formatCOP(missing)} para envío gratis.` : 'Tienes envío gratis.'}</p>
              <div className="coupon">
                <label className="sr-only" htmlFor="cupon">Cupón</label>
                <input id="cupon" placeholder="Cupón (CUMBRE10)" value={code} onChange={(e) => setCode(e.target.value)} />
                <button className="btn small" onClick={applyCode}>Aplicar</button>
              </div>
              {codeMsg && <p className="hint" role="status">{codeMsg}</p>}
            </>
          )}
          <div className="sum"><span>Subtotal</span><span className="mono">{formatCOP(subtotal(cart))}</span></div>
          {discount(cart) > 0 && <div className="sum"><span>Descuento</span><span className="mono">−{formatCOP(discount(cart))}</span></div>}
          <div className="sum"><span>Envío</span><span className="mono">{shipping(cart) === 0 ? 'Gratis' : formatCOP(shipping(cart))}</span></div>
          <div className="sum total"><span>Total</span><span className="mono">{formatCOP(total(cart))}</span></div>
          {step === 'cart' ? (
            <button className="btn primary" onClick={() => setStep('checkout')}>Finalizar compra</button>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10 }}>
              <button className="btn" onClick={() => setStep('cart')}>Volver</button>
              <button className="btn primary" type="submit" form="checkout-form">Confirmar pedido</button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
