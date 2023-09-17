'use client';

import { faCloudArrowDown } from '@fortawesome/sharp-light-svg-icons';
import {
  Button,
  Collapse,
  Drawer,
  Fade,
  Grid,
  Link,
  List,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { LayoutSideItem, LayoutSideItemProps } from './LayoutSideItem';
import { closedMixin, openedMixin } from './drawer';
import { Icon } from 'components/Icon';

const drawerWidth = 240;

export interface LayoutSideProps {
  items?: LayoutSideItemProps[];
}

export const LayoutSide = ({
  items = []
}: LayoutSideProps) => {
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
        display: {
          md: 'block',
          xs: 'none',
        },
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
