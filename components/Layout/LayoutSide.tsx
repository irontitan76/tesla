'use client';

import { faCloudArrowDown } from '@fortawesome/sharp-light-svg-icons';
import { Button, Drawer, Grid, List, Toolbar, useTheme } from '@mui/material';
import { useState } from 'react';
import { LayoutSideItem, LayoutSideItemProps } from './LayoutSideItem';
import { closedMixin, openedMixin } from './drawer';

const drawerWidth = 240;

export interface LayoutSideProps {
  items?: LayoutSideItemProps[];
}

export const LayoutSide = ({ items = [] }: LayoutSideProps) => {
  const theme = useTheme();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleMouseEnter = () => {
    setDrawerOpen(true);
  };

  const handleMouseLeave = () => {
    setDrawerOpen(false);
  };

  const mixinOptions = { isDrawerOpen, width: drawerWidth };

  return (
    <Drawer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      open
      sx={{
        boxSizing: 'border-box',
        flexShrink: 0,
        width: drawerWidth,
        ...(isDrawerOpen && {
          ...openedMixin(theme, mixinOptions),
          '& .MuiDrawer-paper': {
            ...openedMixin(theme, mixinOptions),
          },
        }),
        ...(!isDrawerOpen && {
          ...closedMixin(theme, mixinOptions),
          '& .MuiDrawer-paper': {
            ...closedMixin(theme, mixinOptions),
          },
        }),
      }}
      variant='permanent'
    >
      <Toolbar variant='dense' />
      <Grid
        alignItems='space-between'
        container
        height='100%'
        flexDirection='column'
        flexWrap='nowrap'
        justifyContent='space-between'
      >
        {!!items.length && (
          <Grid item>
            <List>
              {items.map((item) => (
                <LayoutSideItem
                  key={item.href}
                  {...item}
                />
              ))}
            </List>
          </Grid>
        )}
      </Grid>
    </Drawer>
  );
};

export default LayoutSide;
