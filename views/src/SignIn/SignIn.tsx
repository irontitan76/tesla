import { createServerSupabaseClient } from '@nexus/utils/supabase/serverClient';
import { redirect } from 'next/navigation';
import { SignInContents } from './SignInContents';

export const signInMetadata = {
  title: 'Sign In',
};

export const SignIn = async () => {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return <SignInContents />;
};

export default SignIn;
