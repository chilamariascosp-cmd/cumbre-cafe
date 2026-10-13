import type { ImageKey } from '@cumbre/core';
import type { ImageSourcePropType } from 'react-native';

// React Native exige rutas estáticas en require(); este mapa se genera a partir de assets/img.
export const IMAGES: Record<ImageKey, ImageSourcePropType> = {
  atardecer: require('../assets/img/atardecer.jpg'),
  bascula: require('../assets/img/bascula.jpg'),
  cafetal: require('../assets/img/cafetal.jpg'),
  cali: require('../assets/img/cali.jpg'),
  'canasta-amarilla': require('../assets/img/canasta-amarilla.jpg'),
  canasto: require('../assets/img/canasto.jpg'),
  capsulas: require('../assets/img/capsulas.jpg'),
  ceramica: require('../assets/img/ceramica.jpg'),
  'cerezas-maduras': require('../assets/img/cerezas-maduras.jpg'),
  'cerezas-rojas': require('../assets/img/cerezas-rojas.jpg'),
  espresso: require('../assets/img/espresso.jpg'),
  'grano-tostado': require('../assets/img/grano-tostado.jpg'),
  granos: require('../assets/img/granos.jpg'),
  guatape: require('../assets/img/guatape.jpg'),
  'las-lajas': require('../assets/img/las-lajas.jpg'),
  molino: require('../assets/img/molino.jpg'),
  prensa: require('../assets/img/prensa.jpg'),
  rio: require('../assets/img/rio.jpg'),
  'taza-vidrio': require('../assets/img/taza-vidrio.jpg'),
  v60: require('../assets/img/v60.jpg'),
};
