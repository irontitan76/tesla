'use client';

import {
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  capitalize,
} from '@mui/material';
import { Configuration, Device, supabase, Transformer } from '@nexus/utils/supabase';
import { useEffect, useState } from 'react';
import { ConfiguratorLayout } from './ConfiguratorLayout';
import { ConfiguratorSelector } from './ConfiguratorSelector';
import { ConfiguratorSummary } from './ConfiguratorSummary';
import { calculateTotal } from './utils';

export type ConfiguratorOrientation = 'horizontal' | 'vertical';

export const ConfiguratorContent = () => {
  const defaultConfiguration = {
    created_at: String(new Date(Date.now())),
    id: 0,
    items: [],
    totalBatteries: 0,
    totalCost: 0,
    totalDepth: 0,
    totalEnergy: 0,
    totalTransformers: 0,
    totalWidth: 0,
  };

  const [orientation, setOrientation] = useState<ConfiguratorOrientation>('vertical');
  const [batteries, setBatteries] = useState<Device[]>([]);
  const [transformers, setTransformers] = useState<Transformer[]>([]);
  const [configurationId, setConfigurationId] = useState<string>('new');
  const [configurations, setConfigurations] = useState<Configuration[]>();

  const isVertical = orientation === 'vertical';

  const fetchConfiguratorInformation = async () => {
    const { data: batteries } = await supabase.from('batteries').select();
    const { data: configurations } = await supabase.from('configurations').select();
    const { data: transformers } = await supabase.from('transformers').select().eq('id', 1);

    setBatteries(batteries || []);
    setConfigurations(configurations || []);
    setTransformers(transformers || []);
  };

  const foundConfiguration = configurations?.find(
    (config) => config.id === parseInt(configurationId ?? '')
  );

  const configuration =
    !!configurations?.length && foundConfiguration ? foundConfiguration : defaultConfiguration;

  useEffect(() => {
    fetchConfiguratorInformation();
  }, [configurationId]);

  const handleAddBattery = (battery: Device) => async () => {
    const items = configuration?.items ?? [];
    const newItems = [...(items ?? []), battery.id];
    const newTotal = calculateTotal(newItems, batteries);

    const newConfiguration = {
      items: newItems,
      ...newTotal,
    };

    if (configurationId === 'new') {
      const { data } = await supabase.from('configurations').insert(newConfiguration).select();

      setConfigurationId(data?.[0].id.toString() ?? 'new');
      setConfigurations([...(configurations ?? []), ...(data ?? [])]);
    } else {
      await supabase
        .from('configurations')
        .update(newConfiguration)
        .match({ id: configurationId })
        .select();

      const { data } = await supabase.from('configurations').select();

      setConfigurations(data ?? []);
    }
  };

  const handleRemoveBattery = (battery: Device) => async () => {
    const items = configuration?.items ?? [];
    const indexToRemove = items.lastIndexOf(battery.id);
    const updatedItems = items.filter((_, index) => index !== indexToRemove);
    const updatedTotal = calculateTotal(updatedItems, batteries);

    const udpatedConfiguration = {
      items: updatedItems,
      ...updatedTotal,
    };

    const { data } = await supabase
      .from('configurations')
      .update(udpatedConfiguration)
      .match({ id: configurationId })
      .select();

    setConfigurations(data ?? []);
  };

  const handleConfigurationChange: TextFieldProps['onChange'] = (event) => {
    setConfigurationId(event.target.value);
  };

  const handleOrientationChange: TextFieldProps['onChange'] = (event) => {
    setOrientation(event.target.value as ConfiguratorOrientation);
  };

  return (
    <Grid
      container
      justifyContent='space-between'
      spacing={4}
    >
      <Grid
        item
        xs={12}
      >
        <Stack
          alignItems='center'
          borderBottom='1px solid'
          borderColor='divider'
          direction='row'
          justifyContent='space-between'
          pb={2}
        >
          <Typography
            component='h1'
            fontWeight='bold'
            variant='h4'
          >
            Configurator
          </Typography>
          <Stack
            direction='row'
            spacing={2}
          >
            <TextField
              label='Orientation'
              onChange={handleOrientationChange}
              select
              size='small'
              sx={{
                display: {
                  md: 'block',
                  xs: 'none',
                },
                '& .MuiInput-root': {
                  minWidth: 200,
                },
              }}
              value={orientation}
            >
              {['horizontal', 'vertical'].map((orient) => (
                <MenuItem
                  key={orient}
                  value={orient}
                >
                  {capitalize(orient)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              InputProps={{
                sx: {
                  minWidth: 120,
                },
              }}
              label='Configuration ID'
              onChange={handleConfigurationChange}
              select
              size='small'
              value={configurationId ?? 'new'}
            >
              <MenuItem value='new'>New</MenuItem>
              {configurations
                ?.sort((a, b) => a.id - b.id)
                .map((config) => (
                  <MenuItem
                    key={config.id}
                    value={config.id}
                  >
                    {config.id}
                  </MenuItem>
                ))}
            </TextField>
          </Stack>
        </Stack>
      </Grid>
      <Grid
        item
        md={isVertical ? 6 : 12}
        lg={isVertical ? 8 : 12}
        xs={12}
      >
        <ConfiguratorLayout
          batteries={batteries}
          configuration={configuration}
          orientation={orientation}
          transformer={transformers[0]}
        />
      </Grid>
      <Grid
        item
        py={2}
        {...(isVertical
          ? {
              height: 'calc(100vh - 190px)',
              md: 6,
              sx: { overflowY: { lg: 'scroll' } },
              lg: 4,
              xs: 12,
            }
          : {
              md: 6,
              lg: 6,
              xs: 12,
            })}
      >
        <ConfiguratorSelector
          batteries={batteries}
          onAdd={handleAddBattery}
          onRemove={handleRemoveBattery}
          configuration={configuration}
          transformer={transformers[0]}
        />
        {isVertical && (
          <>
            <Divider />
            <ConfiguratorSummary configuration={configuration} />
          </>
        )}
      </Grid>
      {!isVertical && (
        <Grid
          item
          lg={6}
          xl={6}
          xs={12}
        >
          <ConfiguratorSummary configuration={configuration} />
        </Grid>
      )}
    </Grid>
  );
};

export default ConfiguratorContent;
