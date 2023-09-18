import {
  faArrowProgress,
  faBatteryBolt,
  faGaugeSimple,
  faIndustry,
  faInfoCircle,
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

  {
    children: 'About',
    flag: true,
    href: '/about',
    icon: faInfoCircle,
  },
];

export default async function RootLayout({ children }: { children: ReactNode}) {
  return (
    <Layout side={{ items: items }}>{children}</Layout>
  );
};
