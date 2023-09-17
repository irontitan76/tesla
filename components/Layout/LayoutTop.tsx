'use client';

import {
  AppBar,
  AppBarProps,
  Grid,
  StackProps,
  Toolbar,
  ToolbarProps,
  Typography,
} from '@mui/material';
import { User } from '@supabase/supabase-js';
import { Avatar } from 'components/Avatar';
import { Logo } from 'components/Logo';
import { supabase } from 'database/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export interface LayoutTopProps extends AppBarProps {
  LogoProps?: SVGElement;
  StackProps?: StackProps;
  ToolbarProps?: ToolbarProps;
}

export const LayoutTop = ({
  LogoProps,
  StackProps,
  ToolbarProps,
  sx,
  ...rest
}: LayoutTopProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();

        if (data?.user) {
          setUser(data.user);
        }
      };

      fetchUser();
    }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <AppBar
      elevation={0}
      position='fixed'
      sx={{
        borderBottom: '1px solid',
        borderBottomColor: 'divider',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ...sx,
      }}
      {...rest}
    >
      <Toolbar
        disableGutters
        variant='dense'
        {...ToolbarProps}
      >
        <Grid
          alignItems='center'
          container
          justifyContent='space-between'
          px={2}
          {...StackProps}
        >
          <Grid item mt={1}>
            <Logo />
            <Typography
                bottom={5}
                display='inline-flex'
                ml={2}
                position='relative'
                sx={{
                  '&:before': {
                    bgcolor: 'text.primary',
                    blockSize: 20,
                    content: '""',
                    inlineSize: 1,
                    mr: 2,
                    position: 'relative',
                    top: 3,
                  },
                }}
              >
                Industrial Energy
              </Typography>
          </Grid>
          <Grid item>
            <Avatar
              onSignOut={handleSignOut}
              user={user}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default LayoutTop;
