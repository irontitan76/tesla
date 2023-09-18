import { createServerSupabaseClient } from 'database/serverClient';
import { redirect } from 'next/navigation';
import { DevicesContent } from './DevicesContent';

export const metadata = {
  title: 'Devices',
};

export const Devices = async () => {  const supabase = createServerSupabaseClient();
  const { data: { session }} = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <DevicesContent />
  );
};

export default Devices;
