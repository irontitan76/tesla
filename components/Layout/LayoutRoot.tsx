import 'assets/fonts/gotham_ssa/stylesheet.css';

import React, { ReactNode } from 'react';
import { ThemeRegistry } from 'components/ThemeRegistry';

export interface LayoutSplashProps {
  children?: ReactNode;
}

export const LayoutRoot = ({
  children,
}: LayoutSplashProps) => {
  return (
    <html lang='en'>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.trunk.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.cells.min.js"></script>
      </head>
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default LayoutRoot;
