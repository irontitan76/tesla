import { createTheme } from '@mui/material';
import { merge } from 'lodash';
import { themeCommon } from 'themes/common';
import { components } from './components';
import { palette } from './palette';
import { shape } from './shape';

export const themeLight = createTheme(
  merge(themeCommon, {
    components,
    palette,
    shape,
  })
);
