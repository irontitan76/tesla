'use client';

import { faArrowRightFromArc } from '@fortawesome/sharp-light-svg-icons';
import {
  Alert,
  Button,
  Link,
  Snackbar,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { Icon } from 'components/Icon';
import { Logo } from 'components/Logo';
import { supabase } from 'database/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState('')
  const [form, setForm] = useState({ password: '', email: '' });

  const handleChange: TextFieldProps['onChange'] = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event?.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (!error) {
      router.refresh();
    } else {
      setError(error.message);
    }
  };

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setError('');
  };

  return (
    <>
      <Stack
        alignItems='center'
        component='form'
        onSubmit={handleSubmit}
      >
        <Stack
          alignItems='center'
          bgcolor='background.paper'
          borderRadius={2}
          pt={2}
        >
          <Logo
            height={40}
            width={200}
          />
          <Typography
            color='grey.500'
            letterSpacing={3}
            mb={2}
            px={6}
            textTransform='uppercase'
            variant='subtitle2'
          >
            Industrial Design
          </Typography>
          <TextField
            inputProps={{
              sx: {
                textAlign: 'center',
              },
            }}
            name='email'
            onChange={handleChange}
            placeholder='Email'
            size='small'
            sx={{
              pb: 2,
            }}
            value={form.email}
          />
          <TextField
            inputProps={{
              sx: {
                textAlign: 'center',
              },
            }}
            name='password'
            onChange={handleChange}
            placeholder='Password'
            size='small'
            sx={{
              pb: 2,
            }}
            type='password'
            value={form.password}
          />
          <Button
            disabled={!form.email.length}
            fullWidth
            startIcon={<Icon icon={faArrowRightFromArc} sx={{ color: 'inherit' }} />}
            sx={{
              bgcolor: 'transparent',
              color: 'text.primary',
              pb: 2,
              '&.Mui-disabled': {
                color: 'grey.400',
              },
              '&:hover': {
                bgcolor: 'grey.900',
                color: 'common.white',
              },
            }}
            type='submit'
            variant='text'
          >
            Sign Up
          </Button>
        </Stack>
        <Link
          align='center'
          href='/auth/signin'
          underline='none'
          sx={{ p: 2  }}
        >
          Or Sign In
        </Link>
        <Snackbar
          autoHideDuration={6000}
          onClose={handleClose}
          open={!!error}
        >
          <Alert
            onClose={handleClose}
            severity='error'
          >
            {error}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};
