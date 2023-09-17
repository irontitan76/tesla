'use client';

import {
  Link,
  LinkProps,
  ListItem,
  ListItemProps,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemIconProps,
  ListItemText,
  ListItemTextProps,
} from '@mui/material';
import { Icon, IconProps } from 'components/Icon';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

export interface LayoutSideItemProps extends ListItemProps {
  children?: ReactNode;
  flag?: boolean;
  href?: LinkProps['href'];
  icon?: IconProps['icon'];
  ListItemButtonProps?: ListItemButtonProps;
  ListItemIconProps?: ListItemIconProps;
  ListItemTextProps?: ListItemTextProps;
}

export const LayoutSideItem = ({
  children,
  flag, // TODO: do something with this
  href,
  icon,
  ListItemButtonProps,
  ListItemIconProps,
  ListItemTextProps,
  ...rest
}: LayoutSideItemProps) => {
  const pathname = usePathname();

  return (
    <ListItem disablePadding {...rest}>
      <ListItemButton
        component={Link}
        href={href}
        sx={{
          '&:hover': {
            bgcolor: 'background.default',
          },
        }}
        {...ListItemButtonProps}
      >
        {icon && (
          <ListItemIcon
            sx={{
              '& svg': {
                fill: ({ palette }) => pathname === href ? palette.secondary.main : palette.text.primary,
                transition: 'all 0.3s ease-in-out',
              },
            }}
            {...ListItemIconProps}
          >
            <Icon icon={icon} />
          </ListItemIcon>
        )}
        <ListItemText
          primary={children}
          primaryTypographyProps={{
            sx: {
              whiteSpace: 'nowrap',
            },
          }}
          {...ListItemTextProps}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default LayoutSideItem;
