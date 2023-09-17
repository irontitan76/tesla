
import {
  faArrowProgress,
  faBatteryBolt,
  faGaugeSimple,
  faIndustry,
} from '@fortawesome/sharp-light-svg-icons';

import { Layout } from 'components/Layout';
import { ReactNode } from 'react';

export const metadata = {
  title: {
    default: 'Tesla',
    template: '%s — Tesla',
  },
};

const items = [
  {
    children: 'Dashboard',
    flag: true,
    href: '/',
    icon: faGaugeSimple,
  },
  {
    children: 'Configurator',
    flag: true,
    href: '/configurator',
    icon: faArrowProgress,
  },
  {
    children: 'Configurations',
    flag: true,
    href: '/configurations',
    icon: faIndustry,
  },
  {
    children: 'Devices',
    flag: true,
    href: '/devices',
    icon: faBatteryBolt,
  },
];

export const RootLayout = ({ children }: { children: ReactNode}) => (
  <Layout side={{ items: items }}>{children}</Layout>
);

export default RootLayout;
