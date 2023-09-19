'use client';

import { faBattery, faBatterySlash } from '@fortawesome/sharp-light-svg-icons';
import { Grid, ListItem } from '@mui/material';
import { DataGridView, Icon } from '@nexus/components';
import { Configuration, Device, supabase } from '@nexus/utils/supabase';
import { useEffect, useState } from 'react';

export const ConfigurationsContent = () => {
  const [batteries, setBatteries] = useState<Device[]>([]);
  const [configurations, setConfigurations] = useState<Configuration[]>([]);

  useEffect(() => {
    const fetchConfiguration = async () => {
      const { data: configurations } = await supabase.from('configurations').select();
      const { data: batteries } = await supabase.from('batteries').select();

      setBatteries(batteries ?? []);
      setConfigurations(configurations ?? []);
    };

    fetchConfiguration();
  }, []);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 120,
    },
    {
      field: 'totalBatteries',
      headerName: 'Batteries',
      minWidth: 200,
    },
    {
      description: 'The total cost of batteries and transformers in the configuration.',
      field: 'totalCost',
      headerName: 'Cost',
      minWidth: 120,
    },
    {
      description: 'The total depth of batteries and transformers if side by side.',
      field: 'totalDepth',
      headerName: 'Depth',
      minWidth: 200,
    },
    {
      description: 'The number of transformers in the configuration',
      field: 'totalTransformers',
      headerName: 'Transformers',
      minWidth: 200,
    },
    {
      description: 'The total width of batteries and transformers if side by side.',
      field: 'totalWidth',
      headerName: 'Width',
      minWidth: 200,
    },
  ];

  return (
    <DataGridView
      disableRowSelectionOnClick
      columns={columns}
      getDetailPanelContent={({ row }: { row: Configuration }) => {
        return (
          <Grid
            bgcolor='background.paper'
            borderBottom='1px solid'
            borderTop='1px solid'
            container
            height={500}
            p={2}
            sx={{
              borderBottomColor: 'divider',
              borderTopColor: 'divider',
              overflow: 'scroll',
            }}
          >
            <Grid item>
              {row.items.map((item) => {
                const battery = batteries.find((battery) => battery.id === item);

                return (
                  <ListItem
                    key={battery?.name}
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      gap: 2,
                    }}
                  >
                    <Icon icon={faBattery} />
                    {battery?.name}
                  </ListItem>
                );
              })}
              {!row.items.length && (
                <ListItem
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    gap: 2,
                  }}
                >
                  <Icon icon={faBatterySlash} />
                  No devices are in this configuration
                </ListItem>
              )}
            </Grid>
          </Grid>
        );
      }}
      rows={configurations.map((configuration) => ({
        ...configuration,
      }))}
      title='Configurations'
    />
  );
};

export default ConfigurationsContent;
