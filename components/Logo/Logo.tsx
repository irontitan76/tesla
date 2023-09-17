'use client';

import {
  Link,
  LinkProps,
  useTheme,
} from '@mui/material';
import { ReactComponent as TeslaLogoDark } from 'assets/logos/tesla_dark.svg';
import { ReactComponent as TeslaLogoLight } from 'assets/logos/tesla_light.svg';
import React from 'react';

export interface LogoProps {
  LinkProps?: LinkProps;
  sx?: LinkProps['sx'];
}

export const Logo = ({
  LinkProps,
  sx,
  ...rest
}: LogoProps) => {
  const { palette } = useTheme();
  const Logo = palette.mode == 'dark' ? TeslaLogoLight : TeslaLogoDark;

  return (
    <Link
      href='/'
      sx={{
        '&:hover svg path:first-of-type': {
          fill: ({ palette }) => palette.grey[500],
        },
        '& svg path:first-of-type': {
          fill: ({ palette }) => palette.text.primary,
        },
      }}
    >
      <Logo
        height={24}
        width={120}
        {...rest}
      />
    </Link>
  );
};

export default Logo;
