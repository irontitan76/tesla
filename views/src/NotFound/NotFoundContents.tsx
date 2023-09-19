'use client';

import { Button, Grid, Link, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';

export const NotFoundContents = () => {
  const startVanta = useCallback(() => {
    if (window.VANTA) {
      window.VANTA.TRUNK({
        backgroundColor: '#000',
        chaos: 8,
        color: '#666666',
        el: '#vanta-container',
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        mouseControls: true,
        touchControls: true,
        scale: 1.0,
        scaleMobile: 1.0,
      });
    }
  }, []);

  useEffect(() => {
    startVanta();
  }, [startVanta]);

  return (
    <Grid
      alignItems='center'
      container
      direction='column'
      height='100vh'
      justifyContent='center'
      id='vanta-container'
      width='100vw'
    >
      <Grid item>
        <Typography
          color='common.white'
          fontWeight='bold'
          mb={2}
          variant='h1'
        >
          Not Found
        </Typography>
      </Grid>
      <Grid item>
        <Link href='/'>
          <Button
            fullWidth
            sx={{
              bgcolor: 'grey.700',
              '&:hover': {
                bgcolor: 'grey.900',
              },
            }}
          >
            Go Home
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default NotFoundContents;
