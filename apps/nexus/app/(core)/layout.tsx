
import {
  faArrowProgress,
  faBatteryBolt,
  faGaugeSimple,
  faIndustry,
} from '@fortawesome/sharp-light-svg-icons';
import { createServerSupabaseClient } from 'database/serverClient';
import { redirect } from 'next/navigation';
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

export default async function RootLayout({ children }: { children: ReactNode}) {
  const supabase = createServerSupabaseClient();
  const { data: { session }} = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <Layout side={{ items: items }}>{children}</Layout>
  );
};
