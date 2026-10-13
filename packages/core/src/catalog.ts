import type { Product, Region, Category, ImageKey } from './types';

export const CATEGORIES: { id: Category | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todo' },
  { id: 'granos', label: 'Granos' },
  { id: 'molido', label: 'Molido' },
  { id: 'capsulas', label: 'Cápsulas' },
  { id: 'accesorios', label: 'Accesorios' },
];

// Datos de ejemplo para la demostración académica.
export const PRODUCTS: Product[] = [
  {
    id: 'guatape-honey',
    name: 'Guatapé Honey',
    category: 'granos',
    price: 42000,
    unit: 'Bolsa 340 g',
    image: 'grano-tostado',
    tagline: 'Dulce, redondo, de oriente antioqueño',
    description:
      'Proceso honey en fincas alrededor del embalse de Guatapé. Taza limpia con cuerpo cremoso, ideal para filtrado y espresso suave.',
    region: 'Antioquia',
    altitude: '1.800 m s. n. m.',
    roast: 'Media',
    notes: ['Panela', 'Naranja', 'Cacao'],
  },
  {
    id: 'cali-cumbre',
    name: 'Cumbre del Valle',
    category: 'granos',
    price: 39000,
    unit: 'Bolsa 340 g',
    image: 'granos',
    tagline: 'Tostión media para todos los días',
    description:
      'Mezcla de lotes del Valle del Cauca. Equilibrada, con acidez suave y final largo. La favorita para cafetera de goteo y prensa francesa.',
    region: 'Valle del Cauca',
    altitude: '1.650 m s. n. m.',
    roast: 'Media',
    notes: ['Caramelo', 'Almendra', 'Manzana roja'],
  },
  {
    id: 'las-lajas-reserva',
    name: 'Las Lajas Reserva',
    category: 'granos',
    price: 56000,
    unit: 'Bolsa 250 g',
    image: 'bascula',
    tagline: 'Microlote de altura, tostión clara',
    description:
      'Cultivado en las laderas de Nariño, a más de 2.000 metros. Acidez brillante, aroma floral y una dulzura que se mantiene al enfriarse.',
    region: 'Nariño',
    altitude: '2.050 m s. n. m.',
    roast: 'Clara',
    notes: ['Jazmín', 'Mandarina', 'Miel'],
  },
  {
    id: 'molido-filtrado',
    name: 'Molido para filtrado',
    category: 'molido',
    price: 36000,
    unit: 'Bolsa 340 g',
    image: 'molino',
    tagline: 'Listo para V60, Chemex o goteo',
    description:
      'Molido medio, empacado el mismo día con válvula de desgasificación. Si prefieres moler en casa, elige cualquiera de nuestros granos.',
    region: 'Huila',
    roast: 'Media',
    notes: ['Chocolate con leche', 'Nuez'],
  },
  {
    id: 'capsulas-oro',
    name: 'Cápsulas Oro x10',
    category: 'capsulas',
    price: 28000,
    unit: 'Caja 10 uds',
    image: 'capsulas',
    tagline: 'Espresso intenso en 30 segundos',
    description:
      'Cápsulas de aluminio reciclable, compatibles con las máquinas más comunes. Crema espesa y cuerpo marcado.',
    roast: 'Media-oscura',
    notes: ['Cacao amargo', 'Tostado'],
  },
  {
    id: 'prensa-francesa',
    name: 'Prensa francesa 600 ml',
    category: 'accesorios',
    price: 89000,
    unit: 'Unidad',
    image: 'prensa',
    tagline: 'Vidrio borosilicato y tapa de bambú',
    description:
      'Filtro de acero inoxidable de doble malla. Prepara hasta cuatro tazas con cuerpo completo y poco sedimento.',
  },
  {
    id: 'kit-v60',
    name: 'Kit V60 cerámica',
    category: 'accesorios',
    price: 135000,
    unit: 'Kit 4 piezas',
    image: 'v60',
    tagline: 'Cono, jarra, hervidor de cuello de cisne y filtros',
    description:
      'Todo lo necesario para filtrado manual. Incluye 40 filtros de papel y guía impresa con las recetas de esta tienda.',
  },
  {
    id: 'taza-aves',
    name: 'Taza artesanal Aves',
    category: 'accesorios',
    price: 48000,
    unit: 'Taza + plato',
    image: 'ceramica',
    tagline: 'Gres esmaltado, hecha a mano en Colombia',
    description:
      'Cada pieza es única: esmalte verde sobre gres, con aves pintadas a mano. Apta para microondas y lavavajillas.',
  },
];

export const REGIONS: Region[] = [
  {
    id: 'antioquia',
    name: 'Guatapé',
    department: 'Antioquia',
    image: 'guatape',
    altitude: '1.800 m',
    text: 'Casas de colores, un embalse enorme y fincas familiares en las montañas. Aquí nace nuestro café dulce y cremoso.',
  },
  {
    id: 'valle',
    name: 'Cali',
    department: 'Valle del Cauca',
    image: 'cali',
    altitude: '1.650 m',
    text: 'Desde los Farallones hasta el Cristo Rey, un clima cálido de día y fresco de noche que madura la cereza con calma.',
  },
  {
    id: 'narino',
    name: 'Las Lajas',
    department: 'Nariño',
    image: 'las-lajas',
    altitude: '2.050 m',
    text: 'Cerca de la frontera con Ecuador, el café crece cerca del volcán. La altura da acidez brillante y notas florales.',
  },
];

export const PROCESS_STEPS = [
  { title: 'Cosecha a mano', text: 'Solo se recoge la cereza roja y madura, pasada tras pasada.', image: 'canasto' as const },
  { title: 'Selección', text: 'Las cerezas se revisan por color y tamaño antes del beneficio.', image: 'canasta-amarilla' as const },
  { title: 'Tostión', text: 'Tostamos en lotes pequeños, cada semana.', image: 'grano-tostado' as const },
  { title: 'Tu taza', text: 'Muele al momento, pesa y prepara con agua a 92–96 °C.', image: 'v60' as const },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function filterProducts(category: Category | 'todos', query = ''): Product[] {
  const q = normalize(query);
  return PRODUCTS.filter((p) => {
    if (category !== 'todos' && p.category !== category) return false;
    if (!q) return true;
    const haystack = normalize([p.name, p.tagline, p.region ?? '', ...(p.notes ?? [])].join(' '));
    return haystack.includes(q);
  });
}

function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

export const IMAGE_ALT: Record<ImageKey, string> = {
  guatape: 'Vista aérea de la iglesia blanca y roja de Guatapé rodeada de techos de teja',
  cafetal: 'Rama de cafeto con cerezas rojas y verdes entre hojas brillantes',
  bascula: 'Taza blanca con granos tostados sobre una báscula digital marcando 17,6 gramos',
  capsulas: 'Cápsulas de café doradas apiladas bajo luz cálida',
  cali: 'Cristo Rey sobre una colina verde con la ciudad de Cali al fondo',
  'cerezas-rojas': 'Primer plano de cerezas de café rojas y verdes',
  espresso: 'Espresso en vaso de vidrio con crema y granos sobre papel kraft',
  'cerezas-maduras': 'Racimo de cerezas de café en distintos grados de maduración',
  'grano-tostado': 'Granos de café tostado en primer plano sobre una hoja verde',
  'taza-vidrio': 'Taza de vidrio acanalado con café y dos flores amarillas',
  molino: 'Molino antiguo de café con café molido rojizo',
  'las-lajas': 'Santuario gótico de Las Lajas sobre un puente de piedra en un cañón verde',
  canasto: 'Manos sosteniendo canastos de mimbre con cerezas de café recién cosechadas',
  prensa: 'Prensa francesa con café sobre una mesa de madera',
  rio: 'Río poco profundo entre árboles de bosque tropical',
  granos: 'Montón de granos de café tostado',
  ceramica: 'Tazas de cerámica verde con aves pintadas sobre plato de gres',
  atardecer: 'Atardecer rosado sobre una ciudad de montaña en Colombia',
  'canasta-amarilla': 'Canasta amarilla llena de cerezas de café rojas',
  v60: 'Barista vertiendo agua con hervidor sobre un V60 blanco',
};
