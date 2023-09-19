import { ReactNode } from 'react';
import { Box, Toolbar } from '@mui/material';
import { LayoutSide, LayoutSideProps } from './LayoutSide';
import { LayoutTop } from './LayoutTop';

export interface LayoutProps {
  children?: ReactNode;
  side?: LayoutSideProps;
}

export const Layout = async ({ children, side = { items: [] } }: LayoutProps) => {
  return (
    <Box
      component='div'
      display='flex'
    >
      <LayoutTop />
      <LayoutSide {...side} />
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