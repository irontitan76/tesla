import { PaletteOptions } from '@mui/material';
import { common } from '../common/palette';

export const background = {
  card: '#222222',
  default: '#111111',
  paper: '#000000',
};

export const mode = 'dark';

export const text = {
  primary: common.white,
  secondary: `${common.white}80`,
};

export const palette: PaletteOptions = {
  background,
  mode,
  text,
};
