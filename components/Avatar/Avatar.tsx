'use client';

import { faArrowRightFromBracket, faMoon, faSun, faUser } from '@fortawesome/sharp-light-svg-icons';
import {
  Box,
  ClickAwayListener,
  Divider,
  Grow,
  Link,
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
import { User } from '@supabase/supabase-js';
import { Icon } from 'components/Icon';
import { useColorMode } from 'components/ThemeRegistry';
import { MouseEvent, useState } from 'react';

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

export interface AvatarProps extends MuiAvatarProps {
  onSignOut?: MenuItemProps['onClick'];
  user?: User;
}

export const Avatar = ({ children, onSignOut, user, ...rest }: AvatarProps) => {
  const { mode, toggleColorMode } = useColorMode();
  const isDark = mode === 'dark';
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const userMenu = [
    {
      displayName: `${isDark ? 'Light' : 'Dark'} mode`,
      href: null,
      icon: isDark ? faSun : faMoon,
      onClick: toggleColorMode,
    },
    {
      displayName: 'Sign out',
      href: '/auth/signin',
      icon: faArrowRightFromBracket,
      onClick: onSignOut,
    },
  ];

  const handleAvatarClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      border='2px solid transparent'
      p={0.9}
      sx={{
        '&:hover': {
          borderColor: 'secondary.main',
          borderRadius: '50%',
        },
      }}
    >
      <MuiAvatar
        onClick={anchorEl ? handleClose : handleAvatarClick}
        sx={{
          cursor: 'pointer',
          height: 21,
          width: 21,
        }}
        {...rest}
      >
        <Icon
          icon={faUser}
          sx={{
            fill: ({ palette }) => palette.background.paper,
            fontSize: 14,
          }}
        />
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
