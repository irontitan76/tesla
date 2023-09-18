'use client';

import { DataGridView } from 'components/DataGrid';
import { Configuration, Device } from 'database/objects';
import { supabase } from 'database/client';
import { useEffect, useState } from 'react';
import { Grid, ListItem } from '@mui/material';
import { Icon } from 'components/Icon';
import { faBattery, faBatterySlash } from '@fortawesome/sharp-light-svg-icons';

export interface ConfigurationsContentProps {}

export const ConfigurationsContent = ({}: ConfigurationsContentProps) => {
  const [batteries, setBatteries] = useState<Device[]>([]);
  const [configurations, setConfigurations] = useState<Configuration[]>([]);

  useEffect(() => {
    const fetchConfiguration = async () => {
      const { data: configurations } = await supabase
        .from('configurations')
        .select();


      const { data: batteries } = await supabase
        .from('batteries')
        .select();

        setBatteries(batteries ?? []);
        setConfigurations(configurations ?? []);
    };

    fetchConfiguration();
  }, [])

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
      getDetailPanelContent={({ row }) => {
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
              {row.items.map((item: any) => {
                const battery = batteries.find((battery) => battery.id === item);

                return(
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
