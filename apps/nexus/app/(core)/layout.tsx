'use client';

import {
  faArrowProgress,
  faBatteryBolt,
  faGaugeSimple,
  faIndustry,
  faInfoCircle,
} from '@fortawesome/sharp-light-svg-icons';
import { supabase } from '@nexus/utils/supabase';
import { Layout } from '@nexus/components';
import { useRouter } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

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

export interface CoreLayoutProps {
  children: ReactNode;
}

export default function CoreLayout({ children }: CoreLayoutProps) {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const getUser = useCallback(async () => {
    const { data } = await supabase.auth.getUser();

    if (!!data?.user) {
      setUser(data.user);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Layout<User>
      onSignOut={handleSignOut}
      side={{ items: items }}
      user={user}
    >
      {children}
    </Layout>
  );
}
