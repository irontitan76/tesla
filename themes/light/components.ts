import { Components } from "@mui/material";
import { background, text } from "./palette";

export const MuiCard: Components['MuiCard'] = {
  styleOverrides: {
    root: {
      backgroundColor: background.card,
    },
  },
};

export const MuiTextField: Components['MuiTextField'] = {
  styleOverrides: {
    root: {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'unset',
      },
    },
  },
};

export const MuiTooltip: Components['MuiTooltip'] = {
  styleOverrides: {
    tooltip: {
      backgroundColor: background.paper,
      color: text.primary,
    }
  },
};

export const components = {
  MuiCard,
  MuiTextField,
  MuiTooltip,
};
