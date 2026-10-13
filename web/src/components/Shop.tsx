import { useEffect, useRef, useState } from 'react';
import { CATEGORIES, IMAGE_ALT, filterProducts, formatCOP, type Category, type Product } from '@cumbre/core';
import { img } from '../lib';

interface Props { onAdd: (id: string) => void }

export function Shop({ onAdd }: Props) {
  const [category, setCategory] = useState<Category | 'todos'>('todos');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const items = filterProducts(category, query);

  return (
    <section className="section shop" id="tienda">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Tienda</p>
          <h2>Elige tu café</h2>
          <p>Granos enteros, molido, cápsulas y lo necesario para prepararlo bien en casa.</p>
        </div>
        <div className="toolbar">
          <div className="chips" role="group" aria-label="Filtrar por categoría">
            {CATEGORIES.map((c) => (
              <button key={c.id} className="chip" aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>{c.label}</button>
            ))}
          </div>
          <label>
            <span className="sr-only">Buscar productos</span>
            <input className="search" type="search" id="buscar" placeholder="Buscar: floral, Nariño, chocolate…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
        </div>
        <p className="sr-only" role="status">{items.length} productos</p>
        {items.length === 0 ? (
          <p className="empty">No encontramos productos con “{query}”. Prueba con otra palabra o quita el filtro.</p>
        ) : (
          <div className="grid">
            {items.map((p) => (
              <article className="card" key={p.id}>
                <button className="ph" onClick={() => setSelected(p)} aria-label={`Ver detalle de ${p.name}`}>
                  <img src={img(p.image)} alt={IMAGE_ALT[p.image]} width={400} height={400} loading="lazy" />
                  {p.roast && <span className="tag">Tostión {p.roast.toLowerCase()}</span>}
                </button>
                <div className="body">
                  <h3>{p.name}</h3>
                  <p className="tagline">{p.tagline}</p>
                  {p.notes && <div className="notes">{p.notes.map((n) => <span key={n}>{n}</span>)}</div>}
                  <div className="buy">
                    <div className="price">{formatCOP(p.price)}<small>{p.unit}</small></div>
                    <button className="btn primary small" onClick={() => onAdd(p.id)}>Agregar</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <ProductDialog product={selected} onClose={() => setSelected(null)} onAdd={onAdd} />
    </section>
  );
}

function ProductDialog({ product, onClose, onAdd }: { product: Product | null; onClose: () => void; onAdd: (id: string) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (product && !d.open) d.showModal();
    if (!product && d.open) d.close();
  }, [product]);

  return (
    <dialog ref={ref} className="product-dialog" aria-label={product?.name ?? 'Detalle'} onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}>
      {product && (
        <div className="pd" style={{ position: 'relative' }}>
          <button className="icon-btn close" onClick={onClose} aria-label="Cerrar">✕</button>
          <img src={img(product.image)} alt={IMAGE_ALT[product.image]} />
          <div className="info">
            <p className="eyebrow">{product.region ?? 'Accesorio'}</p>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <dl className="spec">
              {product.altitude && (<><dt>Altitud</dt><dd>{product.altitude}</dd></>)}
              {product.roast && (<><dt>Tostión</dt><dd>{product.roast}</dd></>)}
              {product.notes && (<><dt>Notas</dt><dd>{product.notes.join(' · ')}</dd></>)}
              <dt>Presentación</dt><dd>{product.unit}</dd>
            </dl>
            <div className="buy" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <span className="price">{formatCOP(product.price)}</span>
              <button className="btn primary" onClick={() => { onAdd(product.id); onClose(); }}>Agregar al carrito</button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
