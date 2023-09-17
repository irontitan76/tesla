'use client';

import { Grid, MenuItem, Stack, TextField, TextFieldProps, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Configuration, Device } from 'database/objects';
import { supabase } from 'database/client';
import { ConfiguratorLayout } from './ConfiguratorLayout';
import { ConfiguratorSelector } from './ConfiguratorSelector';
import { ConfiguratorSummary } from './ConfiguratorSummary';
import { calculateTotal } from './utils';

export interface ConfiguratorContentProps {}

export const ConfiguratorContent = ({}: ConfiguratorContentProps) => {
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

  const [batteries, setBatteries] = useState<Device[]>([]);
  const [configurationId, setConfigurationId] = useState<string>('new');
  const [configurations, setConfigurations] = useState<Configuration[]>();

  const fetchConfiguratorInformation = async () => {
    const { data: batteries } = await supabase
      .from('batteries')
      .select();

    const { data: configurations } = await supabase
      .from('configurations')
      .select();

    setBatteries(batteries || []);
    setConfigurations(configurations || []);
  };

  const foundConfiguration = configurations?.find((config) => (
    config.id === parseInt(configurationId ?? '')
  ));

  const configuration = !!configurations?.length && foundConfiguration
    ? foundConfiguration
    : defaultConfiguration;

  useEffect(() => {
    fetchConfiguratorInformation();
  }, [configurationId]);

  const handleAddBattery = (battery: Device) => async () => {
    const items = configuration?.items ?? [];
    const newItems = [...items ?? [], battery.id];
    const newTotal = calculateTotal(newItems, batteries);

    const newConfiguration = {
      items: newItems,
      ...newTotal,
    };

    if (configurationId === 'new') {
      const { data } = await supabase
        .from('configurations')
        .insert(newConfiguration)
        .select();

      setConfigurationId(data?.[0].id.toString() ?? 'new');
      setConfigurations([...configurations ?? [], ...data ?? []]);
    } else {
      await supabase
        .from('configurations')
        .update(newConfiguration)
        .match({ id: configurationId })
        .select();

      const { data } = await supabase
        .from('configurations')
        .select();

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
    }

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

  return (
    <Grid
      container
      justifyContent='space-between'
      spacing={4}
    >
      <Grid item xs={12}>
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='space-between'
        >
          <Typography
            component='h1'
            fontWeight='bold'
            variant='h4'
          >
            Configurator
          </Typography>
          <TextField
            InputProps={{
              sx: {
                minWidth: 200,
              },
            }}
            label='Configuration ID'
            onChange={handleConfigurationChange}
            select
            size='small'
            value={configurationId ?? 'new'}
          >
            <MenuItem
              value='new'
            >
              New
            </MenuItem>
            {configurations?.sort((a, b) => a.id - b.id).map((config) => (
              <MenuItem
                key={config.id}
                value={config.id}
              >
                {config.id}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Grid>
      <Grid
        item
        md={5}
        pr={4}
      >
        <ConfiguratorSelector
          batteries={batteries}
          onAdd={handleAddBattery}
          onRemove={handleRemoveBattery}
          configuration={configuration}
        />
      </Grid>
      <Grid
        container
        flexDirection='column'
        item
        md={7}
        spacing={4}
      >
        <Grid item>
          <ConfiguratorSummary
            configuration={configuration}
          />
        </Grid>
        <Grid item>
          <ConfiguratorLayout
            batteries={batteries}
            configuration={configuration}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ConfiguratorContent;
