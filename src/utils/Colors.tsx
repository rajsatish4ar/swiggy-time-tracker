import {DefaultTheme} from '@react-navigation/native';
export enum Colors {
  color_primary = '#1A7BF5',
  color_transparent80 = 'rgba(1,1,1,0.2)',
}

export const LIGHT_COLORS = {
  primary: '#1A7BF5',
  background: '#eeeeee',
  card: '#ffffff',
  text: '#212121',
  border: '#e1e2e3',
  notification: '#1A7BF5',
};

export const DARK_COLORS = {
  primary: '#1A7BF5',
  background: '#202124',
  card: '#393a40',
  text: '#ffffff',
  border: '#222223',
  notification: '#1A7BF5',
};

export const LIGHT_THEME = {
  dark: false,
  ...DefaultTheme,
  colors: LIGHT_COLORS,
};
export const DARK_THEME = {
  dark: true,
  ...DefaultTheme,
  colors: DARK_COLORS,
};

export const randomColors: string[] = [
  '#F15156',
  '#58D68D',
  '#5DADE2',
  '#AF7AC5',
  '#EC7063',
  '#F4D03F',
  '#45B39D',
];
