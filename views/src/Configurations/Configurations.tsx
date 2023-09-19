import { createServerSupabaseClient } from '@nexus/utils/supabase/serverClient';
import { redirect } from 'next/navigation';
import { ConfigurationsContent } from './ConfigurationsContent';

export const configurationsMetadata = {
  title: 'Configurations',
};

export const Configurations = async () => {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/signin');
  }

  return <ConfigurationsContent />;
};

export default Configurations;
