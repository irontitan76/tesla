import 'assets/fonts/gotham_ssa/stylesheet.css';

import { ReactNode } from 'react';
import { ThemeRegistry } from 'components/ThemeRegistry';
import Script from 'next/script';

export interface LayoutSplashProps {
  children?: ReactNode;
}

export const LayoutRoot = ({
  children,
}: LayoutSplashProps) => {
  return (
    <html lang='en'>
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js" />
        <Script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js' />
        <Script src='https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.cells.min.js' />
        <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.trunk.min.js" />
      </body>
    </html>
  );
};

export default LayoutRoot;
