'use client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';

import { ColorModeContext } from './ColorModeContext';
import { ColorModeValues, defaultDark } from './types';
import { colorModeStorageKey, useGetColorMode, useGetTheme } from './utils';

export interface ColorModeProviderProps {
  children: ReactNode;
}

export const ColorModeProvider = ({ children }: ColorModeProviderProps) => {
  const [mode, setMode] = useState<ColorModeValues>(defaultDark);

  useEffect(() => {
    const cookies = new Cookies();
    setMode(cookies.get(colorModeStorageKey) ?? defaultDark);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={useGetColorMode(mode, setMode)}>
      <ThemeProvider
        key={mode}
        theme={useGetTheme(mode)}
      >
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
