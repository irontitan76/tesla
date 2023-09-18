 import { redirect } from 'next/navigation';
import { DashboardPanels } from './DashboardPanels';
import { createServerSupabaseClient } from 'database/serverClient';

export const metadata = {
  title: 'Dashboard',
};

export const Dashboard = async () => {
  const supabase = createServerSupabaseClient();
  const { data: { session }} = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/signin');
  }

  return <DashboardPanels />;
};

export default Dashboard;
