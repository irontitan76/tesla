'use client';

import { Box, Grid, useTheme } from '@mui/material';
import { SignInForm } from 'components/SignInForm';
import { ThemeSelector } from 'components/ThemeSelector';
import { useCallback, useEffect } from 'react';

declare global {
  interface Window {
    VANTA: {
      CELLS: any;
      NET: any;
      TRUNK: any;
    };
  }
}

export const SignInContents = () => {
  const setVanta = () => {
    if (window.VANTA) {
      window.VANTA.CELLS({
        el: '#vanta-container',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        color1: '#333333',
        color2: '#555555',
        size: 5.00,
        speed: 1.50
      });
    }
  };

  useEffect(() => setVanta(), [setVanta]);

  return (
    <Grid
      alignItems='center'
      container
      direction='column'
      height='100vh'
      id='vanta-container'
      justifyContent='space-between'
      width='100vw'
    >
      <Grid item />
      <Grid item>
        <SignInForm />
      </Grid>
      <Grid item>
        <Box
          bgcolor='background.paper'
          pb={0.5}
          px={2}
          pt={1}
          sx={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <ThemeSelector
            IconProps={{ sx: { color: 'text.primary' }}}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInContents;
