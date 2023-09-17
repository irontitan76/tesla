import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'database/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { SignInContents } from './SignInContents';

export const metadata = {
  title: 'Sign In',
};

export const SignIn = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session }} = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <SignInContents />
  );
};

export default SignIn;
