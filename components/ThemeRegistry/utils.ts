'use client';

import { Dispatch, SetStateAction, useMemo } from 'react';
import { Cookies } from 'react-cookie';
import { themeDark } from 'themes/dark';
import { themeLight } from 'themes/light';

import { ColorModeValues, teslaDark, teslaLight } from './types';

export const colorModeStorageKey = 'FUSION_COLOR_MODE';

export const useGetColorMode = (
  mode: ColorModeValues,
  setMode: Dispatch<SetStateAction<ColorModeValues>>
) =>
  useMemo(() => {
    const cookies = new Cookies();

    return {
      mode,
      selectColorMode: (mode: ColorModeValues) => {
        if (typeof window !== 'undefined') {
          cookies.set(colorModeStorageKey, mode);
        }

        setMode(mode);
      },
      toggleColorMode: () => {
        setMode((prev) => {
          const nextMode = {
            [teslaDark]: teslaLight,
            [teslaLight]: teslaDark,
          }[prev];

          if (typeof window !== 'undefined') {
            cookies.set(colorModeStorageKey, nextMode);
          }

          return nextMode;
        });
      },
    };
  }, [mode, setMode]);

export const useGetTheme = (mode: ColorModeValues) =>
  useMemo(() => {
    const cookies = new Cookies();

    const themes = {
      [teslaDark]: themeDark,
      [teslaLight]: themeLight,
    };

    const storedMode = typeof window !== 'undefined' && cookies.get(colorModeStorageKey);

    return !!storedMode && Object.keys(themes).includes(storedMode)
      ? themes[storedMode]
      : themes[mode];
  }, [mode]);
