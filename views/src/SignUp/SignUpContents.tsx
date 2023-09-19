'use client';

import { Box, Grid } from '@mui/material';
import { SignUpForm, ThemeSelector } from '@nexus/components';
import { useCallback, useEffect } from 'react';

export const SignUpContents = () => {
  const startVanta = useCallback(() => {
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
  }, []);

  useEffect(() => startVanta(), [startVanta]);

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
        <SignUpForm />
      </Grid>
      <Grid item>
        <Box
          bgcolor='background.paper'
          component='div'
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

export default SignUpContents;
