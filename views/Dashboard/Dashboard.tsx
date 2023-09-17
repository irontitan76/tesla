import React from 'react';
import { DashboardPanels } from './DashboardPanels';

export const metadata = {
  title: 'Dashboard',
};

export const Dashboard = async () => {
  return (
    <DashboardPanels />
  );
};

export default Dashboard;
