'use client';

import { Box, Grid } from '@mui/material';
import { AuthFormType, SignInForm, ThemeSelector } from '@nexus/components';
import { supabase } from '@nexus/utils/supabase';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

type VantaFn = (options: Record<string, string | boolean | number >) => void;

declare global {
  interface Window {
    VANTA: {
      CELLS: VantaFn;
      NET: VantaFn;
      TRUNK: VantaFn;
    };
  }
}

export const SignInContents = () => {
  const router = useRouter();

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

  const handleSubmit = async (form: AuthFormType) => {
    return supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
  };

  const handleSuccess = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.refresh();
    }
  };

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
        <SignInForm
          linkHref='/auth/signup'
          onSubmit={handleSubmit}
          onSuccess={handleSuccess}
          pushTo='/'
        />
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

export default SignInContents;
