import { createServerSupabaseClient } from 'database/serverClient';
import { redirect } from 'next/navigation';
import { SignUpContents } from './SignUpContents';

export const metadata = {
  title: 'SignUp',
};

export const SignUp = async () => {
  const supabase = createServerSupabaseClient();
  const { data: { session }} = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <SignUpContents />
  );
};

export default SignUp;
