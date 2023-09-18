'use client';

import { Box, FormControlLabel, Grid, Stack, Switch, Tooltip, Typography } from '@mui/material';
import { Heading } from 'components/Heading';
import { useEffect, useState } from 'react';
import { Device, Configuration, Transformer } from 'database/objects';
import { supabase } from 'database/client';
import { ConfiguratorCanvas, ConfiguratorDevice } from './ConfiguratorDevice';
import { Icon } from 'components/Icon';
import { faBattery, faUtilityPole } from '@fortawesome/sharp-light-svg-icons';

export interface ConfiguratorLayoutProps {
  batteries: Device[];
  configuration: Configuration;
  orientation: 'horizontal' | 'vertical';
  transformer: Transformer;
}

export const ConfiguratorLayout = ({
  batteries,
  configuration,
  orientation,
}: ConfiguratorLayoutProps) => {
  const [enable3D, setEnable3D] = useState(false);
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

  let cumulativeWidths = layoutItems.map((_, index) =>
    layoutItems.slice(0, index).reduce((sum, item) => sum + (item?.width ?? 0), 0)
  );

  return (
    <Grid
      alignItems='center'
      container
      justifyContent='space-between'
    >
      <Grid item xs={6}>
        <Heading mb={3}>Site Layout</Heading>
      </Grid>
      <Grid item xs={6} textAlign='right'>
        <FormControlLabel
          control={(
            <Switch
              onChange={() => setEnable3D(!enable3D)}
            />
          )}
          label='Enable 3D'
          sx={{ mb: 3 }}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack
          alignContent='flex-start'
          bgcolor={({ palette }) => `${palette.background.paper}30`}
          borderBottom='2px solid'
          borderColor='divider'
          direction='row'
          flexWrap='wrap'
          height={orientation ==='vertical' ? 'calc(100vh - 285px)' : 500}
          justifyContent='space-between'
          gap={2}
          p={2}
          sx={{
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
          }}
          width='100%'
        >
          {!configuration.items.length && (
            <Typography variant='subtitle2'>
              Add batteries to your configuration to see a potential layout for your site
            </Typography>
          )}
          {enable3D && (
            <ConfiguratorCanvas>
              {layoutItems.map((item, index) => {
                return item ? (
                  <ConfiguratorDevice
                    args={[item.width / 10, 2, 2]}
                    position={[cumulativeWidths[index] / 10 + index, 0, 0]}
                    type={item.name}
                  />
                ): null;
              })}
            </ConfiguratorCanvas>
          )}
          {!enable3D && layoutItems.map((item, index) => {
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
                  sx={{
                    perspective: 800,
                  }}
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
        <Typography
          align='center'
          color={enable3D ? 'secondary.main' : undefined}
          fontWeight='bold'
          p={2}
          width='100%'
        >
          {enable3D ? '3D visualizations is in beta — not all functionalities will work as intended.' : '100ft'}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ConfiguratorLayout;
