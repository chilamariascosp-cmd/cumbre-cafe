import { useCallback, useEffect, useRef, useState } from 'react';
import { getProduct, itemCount } from '@cumbre/core';
import { useCart } from './hooks/useCart';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Process } from './components/Process';
import { Shop } from './components/Shop';
import { Origins } from './components/Origins';
import { Brew } from './components/Brew';
import { Story, Newsletter, Visit } from './components/Extras';
import { CartDrawer } from './components/CartDrawer';

export function App() {
  const { cart, add, set, remove, coupon, clear } = useCart();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState('');
  const timer = useRef<number>();

  const onAdd = useCallback((id: string) => {
    add(id);
    setToast(`${getProduct(id)?.name ?? 'Producto'} agregado al carrito`);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(''), 2200);
  }, [add]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <>
      <Header count={itemCount(cart)} onCart={() => setOpen(true)} />
      <main>
        <Hero />
        <Process />
        <Shop onAdd={onAdd} />
        <Origins />
        <Brew />
        <Story />
        <Newsletter />
      </main>
      <Visit />
      <CartDrawer open={open} cart={cart} onClose={() => setOpen(false)} set={set} remove={remove} coupon={coupon} clear={clear} />
      <div role="status" aria-live="polite">{toast && <div className="toast">{toast}</div>}</div>
    </>
  );
}
