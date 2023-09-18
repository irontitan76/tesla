'use client';

import { Box, Grid, useTheme } from '@mui/material';
import { SignInForm } from 'components/SignInForm';
import { ThemeSelector } from 'components/ThemeSelector';
import { useEffect } from 'react';

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
    try {
      if (window.VANTA) {
        window.VANTA.CELLS({
          el: '#vanta-container',
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          color1: '#333333',
          color2: '#555555',
          size: 5.0,
          speed: 1.5,
        });
      }
    } catch (error) {
      // just render bg if there's issues
      console.log('Are you running FireFox? The visualization is unsupported.');
      console.log(error);
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
          <ThemeSelector IconProps={{ sx: { color: 'text.primary' } }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInContents;
