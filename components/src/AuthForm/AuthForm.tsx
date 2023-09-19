'use client';

import { faArrowRightFromArc } from '@fortawesome/sharp-light-svg-icons';
import {
  Alert,
  Button,
  Link,
  LinkProps,
  Paper,
  Snackbar,
  Stack,
  StackProps,
  TextField,
  TextFieldProps,
  Theme,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import {
  AuthAlert,
  AuthField,
  AuthFormType,
  AuthOnSubmit,
  AuthOnSuccess,
  AuthOnValidate,
} from './types';

export interface AuthFormProps<Field = TextFieldProps> {
  fields: AuthField<Field>[];
  linkHref?: string;
  linkText?: LinkProps['children'];
  onError?: (error: Error) => void;
  onSubmit: AuthOnSubmit;
  onSuccess?: AuthOnSuccess;
  onValidate?: AuthOnValidate;
  pushTo?: string;
  submitText?: string;
}

export const AuthForm = <Field,>({
  fields,
  linkHref,
  linkText,
  onError,
  onSubmit,
  onSuccess,
  onValidate,
  submitText = 'Login',
}: AuthFormProps<Field>) => {
  const [message, setMessage] = useState<AuthAlert>({ text: '', severity: 'info' });

  const [form, setForm] = useState<AuthFormType>(
    fields.reduce((prev, curr) => {
      prev[curr.name] = curr.value ?? '';
      return prev;
    }, {} as AuthFormType)
  );

  const handleChange: TextFieldProps['onChange'] = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessage({ text: '', severity: 'error' });
  };

  const handleValidate = (): boolean => {
    if (!onValidate) {
      return true;
    }

    const result = onValidate?.({
      addError: (text) => setMessage({ text, severity: 'error' }),
      addInfo: (text) => setMessage({ text, severity: 'info' }),
      addSuccess: (text) => setMessage({ text, severity: 'success' }),
      addWarning: (text) => setMessage({ text, severity: 'warning' }),
      form,
    });

    return result;
  };

  const handleSubmit: StackProps<'form'>['onSubmit'] = async (event) => {
    event.preventDefault();

    const result = await handleValidate();
    if (!result) {
      return;
    }

    const { data, error } = await onSubmit(form, event);

    if (!error) {
      await onSuccess?.(data);
    } else {
      await onError?.(error);
      setMessage({ text: error.message, severity: 'error' });
    }
  };

  const inputStyles = ({ palette }: Theme) => ({
    textAlign: 'center',
    '&:-webkit-autofill': {
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': palette.text.primary,
      boxShadow: `inset 0 0 20px 20px ${palette.primary.main}29`,
      transition: 'background-color 5000s ease-in-out 0s',
    },
  });

  const renderedFields = fields.map(({ name, placeholder = '', value, ...rest }) => (
    <TextField
      inputProps={{ sx: inputStyles }}
      key={name}
      name={String(name)}
      onChange={handleChange}
      placeholder={placeholder}
      size='small'
      sx={{ pb: 2 }}
      type='password'
      value={value}
      {...rest}
    />
  ));

  return (
    <Stack
      alignItems='center'
      component='form'
      onSubmit={handleSubmit}
    >
      <Stack
        alignItems='center'
        borderRadius={2}
        component={Paper}
        elevation={10}
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
          Industrial Energy
        </Typography>
        {renderedFields}
        <Button
          disabled={!!(fields.filter((field) => (
            field.required !== undefined
            && field.required
            && !form[field.name])).length
          )}
          fullWidth
          startIcon={
            <Icon
              icon={faArrowRightFromArc}
              sx={{ color: 'inherit' }}
            />
          }
          sx={{
            bgcolor: 'transparent',
            color: 'text.primary',
            p: 2,
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
          {submitText}
        </Button>
      </Stack>
      <Link
        align='center'
        href={linkHref}
        underline='none'
        sx={{ p: 2 }}
      >
        {linkText}
      </Link>
      <Snackbar
        autoHideDuration={6000}
        onClose={handleClose}
        open={!!message.text}
      >
        <Alert
          onClose={handleClose}
          severity={message.severity}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
