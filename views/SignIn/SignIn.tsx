import { createServerSupabaseClient } from 'database/serverClient';
import { redirect } from 'next/navigation';
import { SignInContents } from './SignInContents';

export const metadata = {
  title: 'Sign In',
};

export const SignIn = async () => {
  const supabase = createServerSupabaseClient();
  const { data: { session }} = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <SignInContents />
  );
};

export default SignIn;
