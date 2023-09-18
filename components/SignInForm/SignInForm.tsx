'use client';

import { AuthForm, AuthFormType } from 'components/AuthForm';
import { supabase } from 'database/client';
import { useRouter } from 'next/navigation';

export const SignInForm = ({ session }: any) => {
  const router = useRouter();

  const handleSubmit = async (form: AuthFormType) => {
    return supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
  };

  const handleSuccess = async () => {
    const { data: { session }} = await supabase.auth.getSession();

    if (session) {
      router.refresh();
    }
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
      onSuccess={handleSuccess}
      onSubmit={handleSubmit}
      pushTo='/'
      submitText='Sign In'
    />
  );
};

export default SignInForm;
