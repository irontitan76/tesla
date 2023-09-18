'use client';

import { AuthForm, AuthFormType } from 'components/AuthForm';
import { supabase } from 'database/client';

export const SignInForm = () => {
  const handleSubmit = async (form: AuthFormType) => {
    return supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
  };

  return (
    <AuthForm
      fields={[
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
        }
      ]}
      linkText='Or Sign Up'
      linkHref='/auth/signup'
      onSubmit={handleSubmit}
      pushTo='/'
      submitText='Sign In'
    />
  );
};

export default SignInForm;
