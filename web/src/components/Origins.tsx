import { IMAGE_ALT, REGIONS } from '@cumbre/core';
import { img } from '../lib';

export function Origins() {
  return (
    <section className="section" id="origen">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Origen</p>
          <h2>Cada altura cambia la taza</h2>
          <p>Mientras más arriba crece el café, más lento madura y más dulce y aromático se vuelve. Estas son nuestras tres regiones.</p>
        </div>
        <div className="origins">
          {REGIONS.map((r) => (
            <article className="origin" key={r.id}>
              <img src={img(r.image)} alt={IMAGE_ALT[r.image]} loading="lazy" style={r.id === 'valle' ? { objectPosition: '62% 50%' } : undefined} />
              <div className="in">
                <span className="alt">{r.altitude}</span>
                <span className="dep">{r.department}</span>
                <h3>{r.name}</h3>
                <p>{r.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
