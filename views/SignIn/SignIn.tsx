import { redirect } from 'next/navigation';
import { SignInContents } from './SignInContents';
import { createServerSupabaseClient } from 'database/serverClient';

export const metadata = {
  title: 'Sign In',
};

export const SignIn = async () => {

  return (
    <SignInContents />
  );
};

export default SignIn;
