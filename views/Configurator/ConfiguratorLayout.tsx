'use client';

import { faBattery, faUtilityPole } from '@fortawesome/sharp-light-svg-icons';
import { Box, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { Heading } from 'components/Heading';
import { Icon } from 'components/Icon';
import React, { useEffect, useState } from 'react';
import { Device, Configuration } from 'database/objects';
import { supabase } from 'database/client';

export interface ConfiguratorLayoutProps {
  batteries: Device[];
  configuration: Configuration;
}

export const ConfiguratorLayout = ({
  batteries,
  configuration,
}: ConfiguratorLayoutProps) => {
  const [transformerConfig, setTransformerConfig] = useState<Device | null>();

  useEffect(() => {
    const fetchTransformerConfig = async () => {
      const { data: transformers } = await supabase
        .from('transformers')
        .select()
        .eq('id', 0);

      if (transformers) {
        setTransformerConfig(transformers[0]);
      }
    };

    fetchTransformerConfig();
  }, [transformerConfig]);

  if (!configuration) {
    return null;
  }

  const layoutItems = [
    ...configuration.items.map((item) => batteries.find((battery) => battery.id === item)),
    // Use requested configuration or fallback to client-side default
    ...new Array(configuration?.totalTransformers).fill(null).map(() => transformerConfig ?? {
      cost: 10000,
      depth: 10,
      energy: -500000,
      id: 'transformer-1',
      name: 'Transformer',
      width: 10,
    }),
  ].sort((a, b) => {
    if (a?.depth && b?.depth) {
     return a?.depth - b.depth
    }

    return 0;
  });

  return (
    <Stack px={2}>
      <Grid container>
        <Grid item xs={12}>
          <Heading mb={0}>Site Layout</Heading>
        </Grid>
        {!configuration.items.length && (
          <Grid item xs={12}>
            <Typography variant='subtitle2'>
              Add batteries to your configuration to see a potential layout for your site
            </Typography>
          </Grid>
        )}
        {!!configuration.items.length && (
          <>
            <Grid item xs={11}>
              <Stack
                alignContent='flex-start'
                bgcolor='background.paper'
                borderRadius={2}
                direction='row'
                flexWrap='wrap'
                justifyContent='space-between'
                gap={2}
                maxHeight='calc(100vh - 590px)'
                p={2}
                sx={{
                  overflow: 'scroll',
                }}
                width='100%'
              >
                {layoutItems.map((item, index) => {
                  return item ? (
                    <Tooltip key={`${item.name}${index}`} title={item.name}>
                      <Box
                        alignItems='center'
                        bgcolor='background.card'
                        border='1px solid'
                        borderColor='divider'
                        borderRadius={2}
                        display='flex'
                        flexDirection='column'
                        height={`calc((${item.depth} / 100) * 100%)`}
                        gap={1}
                        justifyContent='center'
                        p={1}
                        width={`calc((${item.width} / 100) * 100%)`}
                      >
                        <Icon
                          icon={item.name === 'Transformer' ? faUtilityPole : faBattery}
                        />
                        <Typography
                          fontSize={9}
                        >
                          {item.name}
                        </Typography>
                      </Box>
                    </Tooltip>
                  ) : null;
                })}
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack
                alignItems='flex-start'
                borderLeft='1px solid'
                borderColor='divider'
                height='100%'
                justifyContent='flex-end'
              >
                <Typography
                  sx={{
                    transform: 'rotate(90deg)',
                  }}
                >
                  {`${configuration.totalDepth}ft`}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={11}>
              <Stack
                borderTop='1px solid'
                borderColor='divider'
                direction='row'
                justifyContent='flex-end'
                pt={2}
                width='100%'
              >
                <Typography>100ft</Typography>
              </Stack>
            </Grid>
            <Grid item xs={1} />
          </>
        )}
      </Grid>
    </Stack>
  );
};

export default ConfiguratorLayout;
