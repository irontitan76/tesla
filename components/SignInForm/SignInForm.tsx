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

export const SignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange: TextFieldProps['onChange'] = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event?.preventDefault();

    const { error} = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (!error) {
      router.push('/');
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
            disabled={!form.email.length || !form.password.length}
            fullWidth
            startIcon={<Icon icon={faArrowRightFromArc} sx={{ color: 'inherit' }} />}
            sx={{
              bgcolor: 'transparent',
              color: 'text.primary',
              py: 2,
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
            Sign In
          </Button>
        </Stack>
        <Link
          align='center'
          href='/auth/signup'
          underline='none'
          sx={{ p: 2  }}
        >
          Or Sign up
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
