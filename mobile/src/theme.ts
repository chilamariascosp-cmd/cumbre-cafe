import { useColorScheme } from 'react-native';

const light = {
  bg: '#F1F3EC', surface: '#FFFFFF', surface2: '#E5EADD', fg: '#14211A', muted: '#53635A',
  line: '#C9D2C1', accent: '#B8203A', accentFg: '#FFFFFF', leaf: '#2E6B45',
};
const dark: typeof light = {
  bg: '#0E1511', surface: '#17211B', surface2: '#1F2C24', fg: '#EDF1E8', muted: '#9BAA9F',
  line: '#2B3A31', accent: '#E8465F', accentFg: '#17070B', leaf: '#6FBD8A',
};

export type Theme = typeof light;
export const useTheme = (): Theme => (useColorScheme() === 'dark' ? dark : light);
export const fonts = { mono: 'monospace' as const };
