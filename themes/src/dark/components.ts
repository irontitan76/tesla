import { Components } from '@mui/material';
import { background, text } from './palette';

export const MuiCard: Components['MuiCard'] = {
  styleOverrides: {
    root: {
      backgroundColor: background.card,
    },
  },
};

export const MuiTooltip: Components['MuiTooltip'] = {
  styleOverrides: {
    tooltip: {
      backgroundColor: background.paper,
      color: text.primary,
    },
  },
};

export const components = {
  MuiCard,
  MuiTooltip,
};
