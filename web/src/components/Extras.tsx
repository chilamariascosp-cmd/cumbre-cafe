import { useState, type FormEvent } from 'react';
import { IMAGE_ALT } from '@cumbre/core';
import { img } from '../lib';

export function Story() {
  return (
    <section className="section" id="historia">
      <div className="wrap story">
        <div className="text">
          <p className="eyebrow">Historia</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', margin: '14px 0 22px' }}>Café a la sombra, agua de río</h2>
          <p>Cumbre nació con una idea sencilla: pagar bien a quien cultiva y contarte de dónde viene lo que bebes.</p>
          <p>Trabajamos con fincas pequeñas que cultivan bajo sombra, lavan el café con agua de quebrada y devuelven al suelo la pulpa de la cereza.</p>
        </div>
        <div className="pics">
          <img src={img('rio')} alt={IMAGE_ALT.rio} loading="lazy" />
          <img src={img('cerezas-maduras')} alt={IMAGE_ALT['cerezas-maduras']} loading="lazy" />
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'ok'>('idle');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) ? 'ok' : 'error');
  };
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="news">
          <img src={img('taza-vidrio')} alt={IMAGE_ALT['taza-vidrio']} loading="lazy" />
          <div className="in">
            <h2>La receta del mes, en tu correo</h2>
            <p>Un correo al mes con un café nuevo, una receta y nada más.</p>
            {state === 'ok' ? (
              <p className="ok" role="status">Listo. Te escribiremos pronto a {email.trim()}. (Demostración: no se guarda ningún dato.)</p>
            ) : (
              <form className="inline-form" onSubmit={submit} noValidate>
                <label className="sr-only" htmlFor="news-email">Correo electrónico</label>
                <input id="news-email" type="email" placeholder="tu@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={state === 'error'} />
                <button className="btn primary" type="submit">Suscribirme</button>
                {state === 'error' && <span className="err" role="alert" style={{ flexBasis: '100%' }}>Escribe un correo válido, por ejemplo ana@correo.com.</span>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Visit() {
  return (
    <>
      <section className="visit" id="visitanos">
        <img src={img('atardecer')} alt={IMAGE_ALT.atardecer} loading="lazy" />
        <div className="wrap">
          <h2>Pasa por una taza cuando baje el sol</h2>
          <dl>
            <dt>Dirección</dt><dd>Carrera 4 # 12-34, Cali</dd>
            <dt>Horario</dt><dd>Lunes a sábado, 7:00 a. m. – 7:00 p. m.</dd>
          </dl>
          <dl>
            <dt>Escríbenos</dt><dd>hola@cumbrecafe.example</dd>
            <dt>WhatsApp</dt><dd>+57 300 000 0000</dd>
          </dl>
        </div>
      </section>
      <footer className="site-footer">
        <div className="wrap">
          <span>© 2026 Cumbre Café · Proyecto académico con datos de ejemplo.</span>
          <span>Fotografías: Pexels</span>
        </div>
      </footer>
    </>
  );
}
