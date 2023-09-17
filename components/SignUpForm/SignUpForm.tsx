'use client';

import { AuthForm } from 'components/AuthForm';
import { supabase } from 'database/client';

export const SignUpForm = () => {
  const handleSubmit = async (form) => {
    return supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleValidate = ({
    addError,
    form,
  }) => {
    if (form.password !== form.confirmPassword) {
      addError('Passwords do not match.');
      return false;
    }

    return true;
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
        },
        {
          placeholder: 'Confirm Password',
          name: 'confirmPassword',
          required: true,
          type: 'password',
        },
      ]}
      linkText='Or Sign In'
      linkHref='/auth/signin'
      onSubmit={handleSubmit}
      onValidate={handleValidate}
      pushTo='/'
      submitText='Sign Up'
    />
  );
};

export default SignUpForm;
