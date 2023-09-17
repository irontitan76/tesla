'use client';

import { faArrowRightFromArc } from '@fortawesome/sharp-light-svg-icons';
import { Button, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import { Icon } from 'components/Icon';
import { Logo } from 'components/Logo';
import { ThemeSelector } from 'components/ThemeSelector';
import React, { useEffect } from 'react';

declare global {
  interface Window {
    VANTA: {
      CELLS: any;
      TRUNK: any;
    };
  }
}

export const EnterContents = () => {
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

  useEffect(() => {
    setVanta();
  }, []);

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
        <Stack
          alignItems='center'
          component={Paper}
          sx={{
            cursor: 'pointer',
            pt: 2,
          }}
        >
          <Logo />
          <Typography
            color='grey.500'
            letterSpacing={3}
            mb={2}
            px={2}
            textTransform='uppercase'
            variant='subtitle2'
          >
            Industrial Design
          </Typography>
          <Link href='/' sx={{ width: '100%' }}>
            <Button
              fullWidth
              startIcon={<Icon icon={faArrowRightFromArc} />}
              sx={{
                bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: 'grey.900',
                  color: 'common.white',
                },
              }}
              variant='text'
            >
              Enter
            </Button>
          </Link>
        </Stack>
      </Grid>
      <Grid item>
        <ThemeSelector
          IconProps={{ sx: { color: 'common.white' }}}
        />
      </Grid>
    </Grid>
  );
};

export default EnterContents;
