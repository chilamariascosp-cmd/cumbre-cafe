import { useEffect, useState } from 'react';

interface Props { count: number; onCart: () => void }

const THEME_KEY = 'cumbre.theme';

function effectiveTheme(): 'light' | 'dark' {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function Header({ count, onCart }: Props) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') document.documentElement.setAttribute('data-theme', saved);
    } catch { /* sin almacenamiento */ }
    setTheme(effectiveTheme());
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* sin almacenamiento */ }
    setTheme(next);
  };

  return (
    <header className="site-header">
      <div className="wrap">
        <a className="brand" href="#inicio" aria-label="Cumbre Café, inicio">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M2 27 12 8l6 11 4-7 8 15z" fill="currentColor" />
            <circle cx="24" cy="7" r="3.2" fill="var(--accent)" />
          </svg>
          Cumbre
        </a>
        <nav className="nav" aria-label="Principal">
          <a href="#tienda">Tienda</a>
          <a href="#origen">Origen</a>
          <a href="#preparar">Preparar</a>
          <a href="#historia">Historia</a>
          <a href="#visitanos">Visítanos</a>
        </nav>
        <button className="icon-btn" onClick={toggle} aria-label={theme === 'dark' ? 'Usar tema claro' : 'Usar tema oscuro'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            {theme === 'dark' ? (
              <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>
            ) : (
              <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
            )}
          </svg>
        </button>
        <button className="icon-btn" onClick={onCart} aria-label={`Abrir carrito, ${count} productos`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 8h14l-1.2 11H6.2L5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>
          {count > 0 && <span className="badge" aria-hidden="true">{count}</span>}
        </button>
      </div>
    </header>
  );
}
