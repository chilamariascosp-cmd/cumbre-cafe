import type { BrewMethod, BrewMethodId, BrewRecipe } from './types';

export const BREW_METHODS: BrewMethod[] = [
  {
    id: 'v60',
    name: 'V60 (filtrado)',
    image: 'v60',
    ratio: 16,
    range: { min: 150, max: 600, step: 10, initial: 320 },
    tempC: 94,
    grind: 'Media-fina, como sal de mesa',
    time: '2:30 – 3:00',
    steps: [
      'Enjuaga el filtro con agua caliente y descarta el agua.',
      'Agrega el café molido y tara la báscula.',
      'Vierte el 15 % del agua y espera 40 segundos (bloom).',
      'Sirve el resto en espirales lentas hasta completar el peso.',
    ],
  },
  {
    id: 'prensa',
    name: 'Prensa francesa',
    image: 'prensa',
    ratio: 15,
    range: { min: 200, max: 900, step: 50, initial: 500 },
    tempC: 93,
    grind: 'Gruesa, como sal marina',
    time: '4:00',
    steps: [
      'Agrega el café molido y vierte toda el agua de una vez.',
      'Mezcla suavemente y coloca la tapa sin presionar.',
      'Espera 4 minutos.',
      'Presiona despacio y sirve de inmediato.',
    ],
  },
  {
    id: 'espresso',
    name: 'Espresso',
    image: 'espresso',
    ratio: 2,
    range: { min: 20, max: 80, step: 2, initial: 36 },
    tempC: 93,
    grind: 'Fina, como azúcar glass',
    time: '25 – 30 s',
    steps: [
      'Dosifica el café en la canasta y nivela.',
      'Compacta con presión pareja.',
      'Extrae hasta obtener el doble del peso del café en la taza.',
      'Sirve y prueba antes de agregar leche.',
    ],
  },
];

export const MIN_ML = 20;
export const MAX_ML = 1000;

export function getMethod(id: BrewMethodId): BrewMethod {
  const found = BREW_METHODS.find((m) => m.id === id);
  if (!found) throw new Error(`Método desconocido: ${id}`);
  return found;
}

/**
 * Calcula dosis de café y agua para una cantidad de bebida.
 * En espresso, `targetMl` es el peso de la bebida (1 ml ≈ 1 g) y el agua es la que se extrae.
 */
export function brewRecipe(methodId: BrewMethodId, targetMl: number): BrewRecipe {
  const method = getMethod(methodId);
  const water = Math.min(MAX_ML, Math.max(MIN_ML, Math.round(targetMl)));
  const coffee = Math.round((water / method.ratio) * 10) / 10;
  return { method, coffeeG: coffee, waterMl: water };
}

/** Ratio en texto: 16 -> "1:16". */
export const ratioLabel = (m: BrewMethod) => `1:${m.ratio}`;
