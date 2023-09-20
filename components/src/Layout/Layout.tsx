import { ReactNode } from 'react';
import { Box, Toolbar } from '@mui/material';
import { LayoutSide, LayoutSideProps } from './LayoutSide';
import { LayoutTop, LayoutTopProps } from './LayoutTop';
import { AvatarProps } from '../Avatar';

export interface LayoutProps<T> {
  children?: ReactNode;
  onSignOut?: LayoutTopProps<T>['onSignOut'];
  side?: LayoutSideProps;
  user?: AvatarProps<T>['user'];
}

export const Layout = <T,>({
  children,
  onSignOut,
  side = { items: [] },
  user,
}: LayoutProps<T>) => {
  return (
    <Box
      component='div'
      display='flex'
    >
      <LayoutTop
        onSignOut={onSignOut}
        user={user}
      />
      <LayoutSide
        {...side}
      />
      <Box
        component='main'
        flexGrow={1}
        p={3}
        sx={{
          overflowX: 'scroll',
        }}
      >
        <Toolbar variant='dense' />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
