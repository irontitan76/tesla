'use client';

import { DataGridView } from '@nexus/components';
import { getSizeString } from '@nexus/utils';
import { Device, supabase } from '@nexus/utils/supabase';
import { useEffect, useState } from 'react';

export const DevicesContent = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const fetchConfiguration = async () => {
      const { data: batteries } = await supabase.from('batteries').select();
      const { data: transformers } = await supabase.from('transformers').select();

      setDevices([...(batteries ?? []), ...(transformers ?? [])]);
    };

    fetchConfiguration();
  }, []);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 120,
    },
    {
      description: 'The amount of energy the battery pack consumes',
      field: 'energy',
      headerName: 'Energy (MWh)',
      minWidth: 200,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      minWidth: 120,
    },
    {
      field: 'depth',
      headerName: 'Depth',
      minWidth: 200,
    },
    {
      field: 'width',
      headerName: 'Width',
      minWidth: 200,
    },
  ];

  return (
    <DataGridView
      disableRowSelectionOnClick
      columns={columns}
      rows={devices.map((device) => ({
        ...device,
        cost: `$${device.cost.toLocaleString()}`,
        energy: device.energy / 1000000,
        floorDimensions: getSizeString(device),
      }))}
      title='Devices'
    />
  );
};

export default DevicesContent;
