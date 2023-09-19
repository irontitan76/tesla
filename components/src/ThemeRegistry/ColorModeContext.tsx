'use client';
import { createContext } from 'react';
import { ColorModeValues, defaultDark } from './types';

export const ColorModeContext = createContext({
  mode: defaultDark,
  // eslint-disable-next-line
  selectColorMode: (mode: ColorModeValues) => {},
  // eslint-disable-next-line
  toggleColorMode: () => {},
});
