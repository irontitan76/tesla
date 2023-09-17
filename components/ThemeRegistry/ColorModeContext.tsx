"use client";
import { createContext } from 'react';
import { ColorModeValues, teslaDark } from './types';

export const ColorModeContext = createContext({
  mode: teslaDark,
  // eslint-disable-next-line
  selectColorMode: (mode: ColorModeValues) => { },
  // eslint-disable-next-line
  toggleColorMode: () => { },
});
