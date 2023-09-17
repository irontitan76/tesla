import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'database/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { SignUpContents } from './SignUpContents';

export const metadata = {
  title: 'SignUp',
};

export const SignUp = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session }} = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <SignUpContents />
  );
};

export default SignUp;
