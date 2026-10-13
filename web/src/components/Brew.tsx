import { useId, useState } from 'react';
import { BREW_METHODS, IMAGE_ALT, brewRecipe, getMethod, ratioLabel, type BrewMethodId } from '@cumbre/core';
import { img } from '../lib';

export function Brew() {
  const [methodId, setMethodId] = useState<BrewMethodId>('v60');
  const method = getMethod(methodId);
  const [ml, setMl] = useState(method.range.initial);
  const sliderId = useId();
  const recipe = brewRecipe(methodId, ml);

  const pick = (id: BrewMethodId) => {
    setMethodId(id);
    setMl(getMethod(id).range.initial);
  };

  return (
    <section className="section brew" id="preparar">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Preparar</p>
          <h2>Pesa, no adivines</h2>
          <p>Elige un método y la cantidad que quieres beber. Te decimos cuántos gramos de café necesitas.</p>
        </div>
        <div className="brew-grid">
          <div>
            <div className="tabs" role="tablist" aria-label="Método de preparación">
              {BREW_METHODS.map((m) => (
                <button key={m.id} role="tab" className="tab" aria-selected={m.id === methodId} onClick={() => pick(m.id)}>{m.name}</button>
              ))}
            </div>
            <div className="slider-row">
              <label htmlFor={sliderId}>
                <span>{methodId === 'espresso' ? 'Bebida en la taza' : 'Cantidad de bebida'}</span>
                <span className="mono">{ml} ml</span>
              </label>
              <input id={sliderId} type="range" min={method.range.min} max={method.range.max} step={method.range.step} value={ml} onChange={(e) => setMl(Number(e.target.value))} />
            </div>
            <div className="readout" aria-live="polite">
              <div className="box big"><span className="v">{recipe.coffeeG} g</span><span className="k">de café molido</span></div>
              <div className="box"><span className="v">{recipe.waterMl} ml</span><span className="k">{methodId === 'espresso' ? 'de bebida (extracción)' : 'de agua'}</span></div>
              <div className="box"><span className="v">{method.tempC} °C</span><span className="k">temperatura del agua</span></div>
              <div className="box"><span className="v">{ratioLabel(method)}</span><span className="k">proporción café : agua</span></div>
            </div>
          </div>
          <div className="brew-detail">
            <div className="brew-photo"><img src={img(method.image)} alt={IMAGE_ALT[method.image]} loading="lazy" style={{ objectPosition: '50% 40%' }} /></div>
            <div className="meta mono"><span>Molienda: {method.grind}</span><span>Tiempo: {method.time}</span></div>
            <ol>{method.steps.map((s) => <li key={s}>{s}</li>)}</ol>
          </div>
        </div>
      </div>
    </section>
  );
}
