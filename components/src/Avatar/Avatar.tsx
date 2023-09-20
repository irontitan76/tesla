'use client';

import {
  IconDefinition,
  faArrowRightFromBracket,
  faMoon,
  faSun,
  faUser,
} from '@fortawesome/sharp-light-svg-icons';
import {
  Box,
  ClickAwayListener,
  Divider,
  Grow,
  Link,
  LinkProps,
  List,
  ListItemIcon,
  MenuItem,
  MenuItemProps,
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
  Paper,
  Popper,
  Typography,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { Icon } from '../Icon';
import { useColorMode } from '../ThemeRegistry';

const getGreetingByTimezone = () => {
  const userTimeZoneOffset = new Date().getTimezoneOffset(); // in minutes
  const hour = new Date().getHours();
  let greeting = '';

  if (userTimeZoneOffset >= -720 && userTimeZoneOffset < -240) {
    // Offset between -12 and -4 hours
    if (hour >= 4 && hour < 12) {
      greeting = 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      greeting = 'Good afternoon';
    } else if (hour >= 17 && hour < 21) {
      greeting = 'Good evening';
    } else {
      greeting = 'Good night';
    }
  } else {
    // Offset between -3 and 12 hours
    if (hour >= 3 && hour < 12) {
      greeting = 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      greeting = 'Good afternoon';
    } else if (hour >= 17 && hour < 21) {
      greeting = 'Good evening';
    } else {
      greeting = 'Good night';
    }
  }

  return greeting;
};

export interface AvatarMenuItem {
  displayName: string;
  href: LinkProps['href'] | null;
  icon: IconDefinition;
  onClick: MenuItemProps['onClick'];
}

export interface AvatarProps<T = { email: string }> extends MuiAvatarProps {
  onSignOut?: MenuItemProps['onClick'];
  user?: (T & { email?: string });
}

export const Avatar = <T,>({ children, onSignOut, user, ...rest }: AvatarProps<T>) => {
  const { mode, toggleColorMode } = useColorMode();
  const isDark = mode === 'dark';
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const userMenu: AvatarMenuItem[] = [
    {
      displayName: `${isDark ? 'Light' : 'Dark'} mode`,
      href: null,
      icon: isDark ? faSun : faMoon,
      onClick: toggleColorMode,
    },
  ];

  if (!!onSignOut) {
    userMenu.push({
      displayName: 'Sign out',
      href: '/auth/signin',
      icon: faArrowRightFromBracket,
      onClick: onSignOut,
    });
  }

  const handleAvatarClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      border='2px solid transparent'
      component='div'
      p={0.9}
      sx={{
        '&:hover': {
          borderColor: 'secondary.main',
          borderRadius: '50%',
        },
      }}
    >
      <MuiAvatar
        alt={user?.email}
        onClick={anchorEl ? handleClose : handleAvatarClick}
        sx={{
          cursor: 'pointer',
          height: 21,
          width: 21,
        }}
        {...rest}
      >
        {user?.email?.[0].toUpperCase() || (
          <Icon
            icon={faUser}
            sx={{
              fill: ({ palette }) => palette.background.paper,
              fontSize: 14,
            }}
          />
        )}
      </MuiAvatar>
      <Popper
        anchorEl={anchorEl}
        open={open}
        transition
        sx={{
          zIndex: ({ zIndex }) => zIndex.appBar + 1,
        }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Grow
              {...TransitionProps}
              timeout={350}
            >
              <Paper
                elevation={3}
                sx={{
                  background:
                    'linear-gradient(151deg, rgba(82,196,255) 0%, rgba(56,135,254) 27%, rgba(63,76,118) 100%)',
                  bgcolor: 'secondary.main',
                  display: 'flex',
                  flexDirection: 'column',
                  m: 2,
                  mt: '30px',
                  width: 300,
                }}
              >
                {user?.email && (
                  <Box
                    alignItems='center'
                    component='div'
                    display='flex'
                    height={120}
                    justifyContent='center'
                    p={2}
                    mt={2}
                  >
                    <Typography
                      color='secondary.contrastText'
                      sx={{
                        wordWrap: 'break-word',
                        wordBreak: 'break-word',
                      }}
                    >
                      {getGreetingByTimezone()}, {user.email}!
                    </Typography>
                  </Box>
                )}
                <Divider />
                <List
                  disablePadding
                  sx={{ bgcolor: 'background.paper' }}
                >
                  {userMenu.map(({ displayName, href, icon, onClick }, index) => {
                    const component = (
                      <MenuItem
                        divider
                        key={displayName}
                        onClick={(event) => {
                          onClick?.(event);
                          handleClose();
                        }}
                        sx={{
                          '&:last-of-type': {
                            borderBottom: 'none',
                          },
                        }}
                      >
                        {icon && (
                          <ListItemIcon>
                            <Icon
                              icon={icon}
                              sx={{
                                fontSize: 14,
                              }}
                            />
                          </ListItemIcon>
                        )}
                        {displayName}
                      </MenuItem>
                    );

                    if (href) {
                      return (
                        <Link
                          color='text.primary'
                          href={href}
                          key={displayName}
                          underline='none'
                        >
                          {component}
                        </Link>
                      );
                    }

                    return component;
                  })}
                </List>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </Box>
  );
};

export default Avatar;
