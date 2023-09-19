'use client';

import { IconButtonProps, List, Stack, Tooltip, Typography } from '@mui/material';
import { Heading, Icon } from '@nexus/components';
import { Device, Configuration, Transformer } from '@nexus/utils';
import { ConfiguratorSelection } from './ConfiguratorSelection';
import { faInfoCircle } from '@fortawesome/sharp-light-svg-icons';

export interface ConfiguratorSelectorProps {
  batteries?: Device[];
  configuration?: Configuration;
  onAdd: (battery: Device) => IconButtonProps['onClick'];
  onRemove: (battery: Device) => IconButtonProps['onClick'];
  transformer: Transformer;
}

export const ConfiguratorSelector = ({
  batteries = [],
  configuration,
  onAdd,
  onRemove,
  transformer,
}: ConfiguratorSelectorProps) => {
  const count = configuration?.items.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  return (
    <Stack>
      <Heading>Batteries</Heading>
      <Typography
        mb={2}
        variant='subtitle2'
      >
        Select the batteries you would like to add to your layout.
      </Typography>
      <List>
        {batteries.map((device, index) =>
          device ? (
            <ConfiguratorSelection
              configuration={configuration}
              count={count?.[device.id] ?? 0}
              device={device}
              key={device.name + index}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          ) : null
        )}
        <ConfiguratorSelection
          count={configuration?.totalTransformers ?? 0}
          device={transformer}
          showControls={false}
        >
          <Tooltip title='One transformer is needed for every two industrial batteries you order.'>
            <Icon
              icon={faInfoCircle}
              sx={{
                color: 'grey.500',
                fontSize: 14,
              }}
            />
          </Tooltip>
        </ConfiguratorSelection>
      </List>
    </Stack>
  );
};

export default ConfiguratorSelector;
