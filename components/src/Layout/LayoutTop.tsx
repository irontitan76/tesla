'use client';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  AppBar,
  AppBarProps,
  Grid,
  IconButton,
  Stack,
  StackProps,
  Toolbar,
  ToolbarProps,
  Typography,
} from '@mui/material';
import { Avatar, AvatarProps } from '../Avatar';
import { Icon } from '../Icon';
import { Logo } from '../Logo';

export interface LayoutTopProps<T> extends AppBarProps {
  onSignOut?: AvatarProps['onSignOut'];
  LogoProps?: SVGElement;
  StackProps?: StackProps;
  ToolbarProps?: ToolbarProps;
  user?: AvatarProps<T>['user'];
}

export const LayoutTop = <T,>({
  onSignOut,
  LogoProps,
  StackProps,
  ToolbarProps,
  sx,
  user,
  ...rest
}: LayoutTopProps<T>) => {
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
          <Grid
            item
            mt={1}
          >
            <Logo />
            <Typography
              bottom={5}
              display={{
                md: 'inline-flex',
                xs: 'none',
              }}
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
            <Stack
              alignItems='center'
              direction='row'
              spacing={2}
            >
              <IconButton
                href='https://github.com/irontitan76/tesla'
                rel='noopener'
                target='_blank'
              >
                <Icon icon={faGithub} />
              </IconButton>
              <Avatar
                onSignOut={onSignOut}
                user={user}
              />
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default LayoutTop;
