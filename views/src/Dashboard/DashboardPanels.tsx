'use client';

import { faArrowProgress, faIndustry } from '@fortawesome/sharp-light-svg-icons';
import { Box, Card, CardContent, Grid, Link, Stack, Typography } from '@mui/material';
import { Icon } from '@nexus/components';
import { supabase } from '@nexus/utils/supabase';
import { useEffect, useState } from 'react';

export const metadata = {
  title: 'Dashboard',
};

export const DashboardPanels = () => {
  const [configurationCount, setConfigurationCount] = useState(0);

  useEffect(() => {
    const fetchDashboardInformation = async () => {
      const { count } = await supabase
        .from('configurations')
        .select('*', { count: 'exact', head: true });

      setConfigurationCount(count ?? 0);
    };

    fetchDashboardInformation();
  }, [configurationCount]);

  const metrics = [
    {
      count: configurationCount,
      displayName: `Configuration${configurationCount === 1 ? '' : 's'}`,
      icon: faIndustry,
    },
  ];

  return (
    <Grid
      container
      spacing={3}
    >
      {metrics.map(({ count, displayName, icon }) => (
        <Grid
          item
          key={displayName}
          md={6}
          lg={4}
          xs={12}
        >
          <Card elevation={0}>
            <CardContent
              alignItems='center'
              component={Stack}
              direction='row'
              spacing={3}
            >
              <Box
                alignItems='center'
                bgcolor='background.paper'
                borderRadius='50%'
                component='div'
                display='flex'
                justifyContent='center'
                p={3}
                height={64}
                width={64}
              >
                <Icon
                  icon={icon}
                  sx={{
                    height: 32,
                    width: 32,
                  }}
                />
              </Box>
              <Box component='div'>
                <Typography
                  component='p'
                  fontWeight='bold'
                  variant='h2'
                >
                  {count}
                </Typography>
                <Typography
                  component='p'
                  variant='h6'
                >
                  {displayName}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid
        item
        md={6}
        lg={4}
        xs={12}
      >
        <Link
          href='/configurator'
          sx={{
            '& > div:hover': {
              bgcolor: 'background.card',
              transition: 'all 0.3s ease-in-out',
            },
          }}
          underline='none'
        >
          <Card
            elevation={0}
            sx={{
              bgcolor: 'unset',
              border: '1px solid',
              borderColor: 'divider',
              p: 1,
            }}
          >
            <CardContent
              alignItems='center'
              component={Stack}
              direction='row'
              spacing={3}
            >
              <Box
                alignItems='center'
                borderRadius='50%'
                component='div'
                display='flex'
                justifyContent='center'
                p={3}
                height={64}
                width={64}
              >
                <Box
                  alignItems='center'
                  bgcolor='background.paper'
                  borderRadius='50%'
                  component='div'
                  display='flex'
                  justifyContent='center'
                  p={3}
                  height={64}
                  width={64}
                >
                  <Icon
                    icon={faArrowProgress}
                    sx={{
                      height: 32,
                      width: 32,
                    }}
                  />
                </Box>
              </Box>
              <Box component='div'>
                <Typography
                  component='p'
                  variant='h6'
                >
                  Go to Configurator
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    </Grid>
  );
};

export default DashboardPanels;
