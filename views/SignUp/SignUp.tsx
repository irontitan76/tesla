import { createServerSupabaseClient } from 'database/serverClient';import { Database } from 'database/types';
import { redirect } from 'next/navigation';
import { SignUpContents } from './SignUpContents';

export const metadata = {
  title: 'SignUp',
};

export const SignUp = async () => {
  return (
    <SignUpContents />
  );
};

export default SignUp;
