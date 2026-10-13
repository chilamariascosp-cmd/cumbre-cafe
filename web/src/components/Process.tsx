import { IMAGE_ALT, PROCESS_STEPS } from '@cumbre/core';
import { img } from '../lib';

export function Process() {
  return (
    <section className="section" id="proceso">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Proceso</p>
          <h2>Cuatro pasos entre la finca y tu mesa</h2>
          <p>Conocemos a quienes cultivan cada lote. Esto es lo que pasa desde que la cereza se pone roja.</p>
        </div>
        <ol className="steps">
          {PROCESS_STEPS.map((s, i) => (
            <li className="step" key={s.title}>
              <div className="ph"><img src={img(s.image)} alt={IMAGE_ALT[s.image]} width={420} height={525} loading="lazy" /></div>
              <span className="n">PASO {i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
