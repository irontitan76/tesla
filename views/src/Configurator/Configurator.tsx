import { createServerSupabaseClient } from '@nexus/utils/supabase/serverClient';
import { redirect } from 'next/navigation';
import { ConfiguratorContent } from './ConfiguratorContent';

export const configuratorMetadata = {
  title: 'Configurator',
};

export const Configurator = async () => {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/signin');
  }

  return <ConfiguratorContent />;
};

export default Configurator;
