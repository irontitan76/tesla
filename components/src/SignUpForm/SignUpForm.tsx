'use client';

import { TextFieldProps } from '@mui/material';
import { AuthField, AuthForm, AuthFormProps } from '../AuthForm';

export interface SignUpFormProps extends Omit<AuthFormProps, 'fields'> {}

export const SignUpForm = (props: SignUpFormProps) => {
  const fields: AuthField<TextFieldProps>[] = [
    {
      placeholder: 'Email Address',
      required: true,
      name: 'email',
      type: 'email',
    },
    {
      placeholder: 'Password',
      name: 'password',
      required: true,
      type: 'password',
    },
    {
      placeholder: 'Confirm Password',
      name: 'confirmPassword',
      required: true,
      type: 'password',
    },
  ];

  return (
    <AuthForm
      fields={fields}
      linkText='Or Sign In'
      submitText='Sign Up'
      {...props}
    />
  );
};

export default SignUpForm;
