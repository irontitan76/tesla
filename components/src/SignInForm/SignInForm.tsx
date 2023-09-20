'use client';

import { useRouter } from 'next/navigation';
import { AuthField, AuthForm, AuthFormProps } from '../AuthForm';
import { TextFieldProps } from '@mui/material';

export interface SignInFormProps extends Omit<AuthFormProps, 'fields'> {}

export const SignInForm = (props: SignInFormProps) => {
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
  ];

  return (
    <AuthForm<TextFieldProps>
      fields={fields}
      linkText='Or Sign Up'
      submitText='Sign In'
      {...props}
    />
  );
};

export default SignInForm;
