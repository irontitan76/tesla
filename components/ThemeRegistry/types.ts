export const ColorMode = {
  teslaDark: 'dark',
  teslaLight: 'light',
};

export const { teslaDark, teslaLight } = ColorMode;

export type ColorModeKeys = keyof typeof ColorMode;
export type ColorModeValues = (typeof ColorMode)[ColorModeKeys];
