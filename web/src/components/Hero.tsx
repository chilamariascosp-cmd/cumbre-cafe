import { IMAGE_ALT, FREE_SHIPPING_FROM, formatCOP } from '@cumbre/core';
import { img } from '../lib';

export function Hero() {
  return (
    <>
      <section className="hero" id="inicio">
        <div className="wrap">
          <div>
            <p className="eyebrow">Café de especialidad · Colombia</p>
            <h1 style={{ marginTop: 18 }}>
              Del cafetal<br />a tu <em>taza.</em>
            </h1>
            <p className="lead">
              Granos de Antioquia, Valle del Cauca y Nariño, recogidos a mano, tostados cada semana en lotes pequeños y enviados a tu puerta.
            </p>
            <div className="cta">
              <a className="btn primary" href="#tienda">Ver la tienda</a>
              <a className="btn" href="#preparar">Calcular mi receta</a>
            </div>
          </div>
          <div className="hero-art">
            <div className="arch"><img src={img('cafetal')} alt={IMAGE_ALT.cafetal} width={700} height={1050} fetchPriority="high" /></div>
            <div className="inset"><img src={img('cerezas-rojas')} alt={IMAGE_ALT['cerezas-rojas']} width={300} height={300} loading="lazy" /></div>
            <div className="altitude-tag"><b>2.050 m</b><span>Nariño · cosecha de octubre</span></div>
          </div>
        </div>
      </section>
      <div className="facts">
        <div className="wrap">
          <ul>
            <li><span className="mono">TOSTIÓN</span> Cada semana, en lotes de 12 kg</li>
            <li><span className="mono">ENVÍO</span> Gratis desde {formatCOP(FREE_SHIPPING_FROM)}</li>
            <li><span className="mono">PAGO</span> Contra entrega en toda Colombia</li>
          </ul>
        </div>
      </div>
    </>
  );
}
