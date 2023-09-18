'use client';

import { AuthForm, AuthFormType, OnValidate } from 'components/AuthForm';
import { supabase } from 'database/client';
import { useRouter } from 'next/navigation';

export const SignUpForm = ({ session }: any) => {
  const router = useRouter();

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

  const handleValidate: OnValidate = ({ addError, form }) => {
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
      onSuccess={handleSuccess}
      onValidate={handleValidate}
      pushTo='/'
      submitText='Sign Up'
    />
  );
};

export default SignUpForm;
