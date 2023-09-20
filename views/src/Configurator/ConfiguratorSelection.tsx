import { faMinus, faPlus } from '@fortawesome/sharp-light-svg-icons';
import { Box, IconButton, IconButtonProps, ListItem, Stack, Typography } from '@mui/material';
import { Icon } from '@nexus/components';
import { Configuration, Device } from '@nexus/utils/supabase';
import { getSizeString } from '@nexus/utils';
import { ReactNode } from 'react';

export interface ConfiguratorSelectionProps {
  children?: ReactNode;
  configuration?: Configuration;
  count: number;
  device: Device;
  onAdd?: (device: Device) => IconButtonProps['onClick'];
  onRemove?: (device: Device) => IconButtonProps['onClick'];
  showControls?: boolean;
}

export const ConfiguratorSelection = ({
  children,
  configuration,
  count,
  device,
  onRemove,
  onAdd,
  showControls = true,
}: ConfiguratorSelectionProps) => {
  if (!device) {
    return null;
  }

  return (
    <ListItem
      disableGutters
      key={device.name}
    >
      <Box
        border='2px solid'
        borderColor='divider'
        borderRadius={2}
        component='div'
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        mb={1}
        position='relative'
        px={2}
        py={1}
        sx={{
          cursor: 'pointer',
        }}
        width='100%'
      >
        <Stack
          alignItems='center'
          direction='row'
          spacing={1}
        >
          <Typography>{device.name}</Typography>
          {children}
        </Stack>
        <Stack>
          {!!device.cost && <Typography>{`$${device.cost.toLocaleString()}`}</Typography>}
          <Typography
            color='text.secondary'
            fontSize={12}
          >
            {device.energy / 1000000} MWh
          </Typography>
          <Typography
            color='text.secondary'
            fontSize={12}
          >
            {getSizeString(device)}
          </Typography>
        </Stack>
      </Box>
      <Stack
        alignItems='center'
        direction='row'
        px={2}
        spacing={1.5}
      >
        {showControls && (
          <IconButton
            disabled={!configuration?.items.some((item) => item === device.id)}
            onClick={onRemove?.(device)}
            size='small'
            sx={{
              '&.Mui-disabled svg': {
                color: 'grey.800',
              },
            }}
          >
            <Icon icon={faMinus} />
          </IconButton>
        )}
        <Box
          alignItems='center'
          border='1px solid'
          borderColor='divider'
          borderRadius='25%'
          component='div'
          color='text.primary'
          display='flex'
          height={32}
          justifyContent='center'
          width={32}
        >
          {count ?? 0}
        </Box>
        {showControls && (
          <IconButton
            onClick={onAdd?.(device)}
            size='small'
          >
            <Icon icon={faPlus} />
          </IconButton>
        )}
      </Stack>
    </ListItem>
  );
};
