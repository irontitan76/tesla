'use client';

import { TextFieldProps } from '@mui/material';
import { supabase } from '@nexus/utils/supabase';
import { useRouter } from 'next/navigation';
import { AuthField, AuthForm, AuthFormType, AuthOnValidate } from '../AuthForm';

export const SignUpForm = () => {
  const router = useRouter();

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

  const handleSubmit = async (form: AuthFormType) => {
    return supabase.auth.signUp({
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

  const handleValidate: AuthOnValidate = ({ addError, form }) => {
    if (form.password !== form.confirmPassword) {
      addError('Passwords do not match.');
      return false;
    }

    return true;
  };

  return (
    <AuthForm
      fields={fields}
      linkText='Or Sign In'
      linkHref='/auth/signin'
      onSubmit={handleSubmit}
      onSuccess={handleSuccess}
      onValidate={handleValidate}
      pushTo='/'
      submitText='Sign Up'
    />
  );
};

export default SignUpForm;
