import { Components } from '@mui/material';
import NextLink, { LinkProps } from 'next/link';
import React, { forwardRef, Ref } from 'react';
import { palette, secondary } from './palette';

export const LinkBehavior = forwardRef((props: LinkProps, ref: Ref<HTMLAnchorElement> | undefined) => {
  return <NextLink ref={ref} {...props} />;
});

export const MuiAvatar: Components['MuiAvatar'] = {
  styleOverrides: {
    root: {
      backgroundColor: palette.primary.main,
      height: 26,
      width: 26,
    },
  },
};

export const MuiButton: Components['MuiButton'] = {
  defaultProps: {
    color: 'primary',
    variant: 'contained',
  },
  styleOverrides: {
    containedPrimary: {
      '&:hover': {
        backgroundColor: '#999999',
        color: palette.primary.contrastText,
      },
      backgroundColor: '#666666',
      color: palette.primary.contrastText,
    },
  },
};

export const MuiCardHeader: Components['MuiCardHeader'] = {
  defaultProps: {
    titleTypographyProps: {
      fontSize: 20,
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
  },
};

export const MuiIconButton: Components['MuiIconButton'] = {
  defaultProps: {
    disableFocusRipple: true,
  },
  styleOverrides: {
    root: {
      border: '2px solid',
      borderColor: 'transparent',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        border: '2px solid',
        borderColor: secondary.main,
      },
    },
  },
};

export const MuiLink: Components['MuiLink'] = {
  defaultProps: {
    component: LinkBehavior,
  }
};

export const MuiMenuItem: Components['MuiMenuItem'] = {
  styleOverrides: {
    root: {
      fontSize: 14,
    },
  },
};

export const MuiPaper: Components['MuiPaper'] = {
  styleOverrides: {
    root: {
      backgroundImage: 'none',
    },
  },
};

export const components = {
  MuiAvatar,
  MuiButton,
  MuiCardHeader,
  MuiIconButton,
  MuiLink,
  MuiMenuItem,
  MuiPaper,
};
