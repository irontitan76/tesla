import { LayoutRoot } from 'components/Layout';
import { ReactNode } from 'react';

export const metadata = {
  title: {
    default: 'Tesla',
    template: '%s — Tesla',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <LayoutRoot>{children}</LayoutRoot>;
}
