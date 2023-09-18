'use client';

import { faArrowProgress, faIndustry } from '@fortawesome/sharp-light-svg-icons';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { Icon } from 'components/Icon';
import { supabase } from 'database/client';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { useEffect, useState } from 'react';

export const metadata = {
  title: 'Dashboard',
};

export interface DashboardPanelsProps {
  markdown: string;
}

export const DashboardPanels = ({
  markdown
}: DashboardPanelsProps) => {
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
      height='calc(100vh - 96px)'
      justifyContent='center'
      spacing={3}
    >
      {metrics.map(({ count, displayName, icon }) => (
        <Grid
          item
          md={4}
          key={displayName}
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
              <Box>
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
      <Grid item md={4}>
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
              borderColor:'divider',
              pb: 2,
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
              <Box>
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
      {markdown && (
        <Grid
          item
          xs={12}
        >
          <Container maxWidth='md'>
            <Box
              bgcolor={({ palette }) => `${palette.background.paper}20`}
              border='1px solid'
              borderColor='divider'
              color='text.primary'
              height={500}
              px={2}
              py={1}
              sx={{
                overflowY: 'auto',
              }}
            >
              <MDXRemote
                options={{
                  mdxOptions: {
                    development: true,
                  },
                }}
                source={markdown}
              />
            </Box>
          </Container>
        </Grid>
      )}
    </Grid>
  );
};

export default DashboardPanels;
