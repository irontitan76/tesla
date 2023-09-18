import { createServerSupabaseClient } from 'database/serverClient';
import { redirect } from 'next/navigation';
import { ConfiguratorContent } from './ConfiguratorContent';

export const metadata = {
  title: 'Configurator',
};

export const Configurator = async () => {  const supabase = createServerSupabaseClient();
  const { data: { session }} = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <ConfiguratorContent />
  );
};

export default Configurator;
