 import { DashboardPanels } from './DashboardPanels';

export const metadata = {
  title: 'Dashboard',
};

export const Dashboard = async () => {
  const res = await fetch('https://raw.githubusercontent.com/irontitan76/tesla/main/README.md')
  const markdown = await res.text();

  return (
    <DashboardPanels
      markdown={markdown}
    />
  );
};

export default Dashboard;
