'use client';

import { faMinus, faPlus } from '@fortawesome/sharp-light-svg-icons';
import { Box, IconButton, IconButtonProps, List, ListItem, Stack, Typography } from '@mui/material';
import { Heading } from 'components/Heading';
import { Icon } from 'components/Icon';
import React from 'react';
import { Device, Configuration } from 'database/objects';
import { getSizeString } from './utils';

export interface ConfiguratorSelectorProps {
  batteries?: Device[];
  configuration?: Configuration;
  onAdd: (battery: Device) => IconButtonProps['onClick'];
  onRemove: (battery: Device) => IconButtonProps['onClick'];
}

export const ConfiguratorSelector = ({
  batteries = [],
  configuration,
  onAdd,
  onRemove,
}: ConfiguratorSelectorProps) => {
  return (
    <Stack
      height='100%'
      py={2}
    >
      <Heading>Batteries</Heading>
      <Typography mb={2} variant='subtitle2'>
        Select the batteries you would like to add to your layout.
      </Typography>
      <List>
        {batteries.map((battery) => battery ? (
          <ListItem disableGutters key={battery.name}>
            <Box
              border='2px solid'
              borderColor='divider'
              borderRadius={2}
              display='flex'
              flexDirection='row'
              justifyContent='space-between'
              mb={1}
              p={2}
              sx={{
                cursor: 'pointer',
              }}
              width='100%'
            >
              <Typography>
                {battery.name}
              </Typography>
              <Stack>
              {!!battery.cost && (
                <Typography>
                  {`$${battery.cost.toLocaleString()}`}
                </Typography>
              )}
              <Typography
                color='text.secondary'
                fontSize={12}
              >
                  {battery.energy / 1000000} MWh
                </Typography>
                <Typography
                  color='text.secondary'
                  fontSize={12}
                >
                {getSizeString(battery)}
                </Typography>
              </Stack>
            </Box>
            <Stack
              direction='row'
              p={2}
              spacing={2}
            >
              <IconButton onClick={onAdd(battery)}>
                <Icon icon={faPlus} />
              </IconButton>
              <IconButton
                disabled={!configuration?.items.some((item) => item === battery.id)}
                onClick={onRemove(battery)}
                sx={{
                  '&.Mui-disabled svg': {
                    color: 'grey.800'
                  },
                }}
              >
                <Icon icon={faMinus} />
              </IconButton>
            </Stack>
          </ListItem>
        ): null)}
      </List>
    </Stack>
  );
};

export default ConfiguratorSelector;
