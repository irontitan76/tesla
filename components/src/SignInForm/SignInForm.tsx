'use client';

import { supabase } from '@nexus/utils/supabase';
import { useRouter } from 'next/navigation';
import { AuthField, AuthForm, AuthFormType } from '../AuthForm';
import { TextFieldProps } from '@mui/material';


export const SignInForm = () => {
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
  ];

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
    <AuthForm<TextFieldProps>
      fields={fields}
      linkText='Or Sign Up'
      linkHref='/auth/signup'
      onSuccess={handleSuccess}
      onSubmit={handleSubmit}
      pushTo='/'
      submitText='Sign In'
    />
  );
};

export default SignInForm;
