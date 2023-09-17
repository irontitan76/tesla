'use client';

import { Button, Grid, Link, Typography } from '@mui/material';
import React, { useEffect } from 'react';

export const NotFoundContents = () => {
  const setVanta = () => {
    if (window.VANTA) {
      window.VANTA.TRUNK({
        backgroundColor: '#000',
        chaos: 8,
        color: '#666666',
        el: '#vanta-container',
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        mouseControls: true,
        touchControls: true,
        scale: 1.00,
        scaleMobile: 1.00,
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
      justifyContent='center'
      id='vanta-container'
      width='100vw'
    >
      <Grid item>
        <Typography
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
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'background.default',
              }
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
