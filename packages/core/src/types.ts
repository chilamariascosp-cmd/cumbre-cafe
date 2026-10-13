export type Category = 'granos' | 'molido' | 'capsulas' | 'accesorios';

export type ImageKey =
  | 'guatape' | 'cafetal' | 'bascula' | 'capsulas' | 'cali' | 'cerezas-rojas'
  | 'espresso' | 'cerezas-maduras' | 'grano-tostado' | 'taza-vidrio' | 'molino'
  | 'las-lajas' | 'canasto' | 'prensa' | 'rio' | 'granos' | 'ceramica'
  | 'atardecer' | 'canasta-amarilla' | 'v60';

export interface Product {
  id: string;
  name: string;
  category: Category;
  /** Precio en pesos colombianos (entero). */
  price: number;
  unit: string;
  image: ImageKey;
  tagline: string;
  description: string;
  region?: string;
  altitude?: string;
  roast?: 'Clara' | 'Media' | 'Media-oscura';
  notes?: string[];
}

export interface Region {
  id: string;
  name: string;
  department: string;
  image: ImageKey;
  altitude: string;
  text: string;
}

export interface CartLine {
  productId: string;
  qty: number;
}

export interface Cart {
  lines: CartLine[];
  coupon?: string;
}

export type BrewMethodId = 'v60' | 'prensa' | 'espresso';

export interface BrewMethod {
  id: BrewMethodId;
  name: string;
  image: ImageKey;
  /** Gramos de agua (o bebida, en espresso) por gramo de café. */
  ratio: number;
  /** Rango del control deslizante, en ml de bebida. */
  range: { min: number; max: number; step: number; initial: number };
  tempC: number;
  grind: string;
  time: string;
  steps: string[];
}

export interface BrewRecipe {
  method: BrewMethod;
  coffeeG: number;
  waterMl: number;
}

export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
}

export type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>;
