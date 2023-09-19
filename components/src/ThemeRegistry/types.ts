export const ColorMode = {
  defaultDark: 'dark',
  defaultLight: 'light',
};

export const { defaultDark, defaultLight } = ColorMode;
export type ColorModeKeys = keyof typeof ColorMode;
export type ColorModeValues = (typeof ColorMode)[ColorModeKeys];
