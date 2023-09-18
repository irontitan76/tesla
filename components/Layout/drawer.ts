import { CSSObject, Theme } from '@mui/material';

export interface DrawerMixinOptions {
  isDrawerOpen?: boolean;
  width?: string | number;
}

export interface DrawerMixin {
  (theme: Theme, options: DrawerMixinOptions): CSSObject;
}

export const openedMixin: DrawerMixin = (
  { palette, transitions },
  { isDrawerOpen, width = 240 }
) => ({
  bgcolor: {
    dark: 'background.paper',
    light: 'background.paper',
  }[palette.mode],
  backgroundImage: 'none',
  overflowX: 'hidden',
  overflowY: isDrawerOpen ? 'auto' : 'hidden',
  transition: transitions.create('width', {
    duration: transitions.duration.enteringScreen,
    easing: transitions.easing.sharp,
  }),
  width,
});

export const closedMixin: DrawerMixin = (
  { breakpoints, palette, spacing, transitions },
  { isDrawerOpen }
) => ({
  bgcolor: {
    dark: 'background.paper',
    light: 'background.paper',
  }[palette.mode],
  overflowX: 'hidden',
  overflowY: isDrawerOpen ? 'auto' : 'hidden',
  transition: transitions.create('width', {
    duration: transitions.duration.leavingScreen,
    easing: transitions.easing.sharp,
  }),
  width: `calc(${spacing(6)} + 1px)`,
  [breakpoints.up('sm')]: {
    width: `calc(${spacing(7)} + 1px)`,
  },
});
