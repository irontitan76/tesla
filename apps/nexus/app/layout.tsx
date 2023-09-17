import { LayoutRoot } from 'components/Layout';
import { ReactNode } from 'react';

export const metadata = {
  title: {
    default: 'Tesla',
    template: '%s — Tesla',
  },
};

export const RootLayout = ({ children }: { children: ReactNode}) => (
  <LayoutRoot>{children}</LayoutRoot>
);

export default RootLayout;
