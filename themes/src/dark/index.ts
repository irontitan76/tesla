import { createTheme } from '@mui/material';
import { merge } from 'lodash';
import { commonTheme } from '../common';
import { components } from './components';
import { palette } from './palette';
import { shape } from './shape';

export * from './components';
export * from './palette';
export * from './shape';

export const darkTheme = createTheme(
  merge(commonTheme, {
    components,
    palette,
    shape,
  })
);
