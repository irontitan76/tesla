 import { DashboardPanels } from './DashboardPanels';

export const metadata = {
  title: 'Dashboard',
};

export const Dashboard = async () => {
  const res = await fetch('https://raw.githubusercontent.com/irontitan76/tesla/irontitan76-patch-1/README.md')
  const markdown = await res.text();

  return (
    <DashboardPanels
      markdown={markdown}
    />
  );
};

export default Dashboard;
