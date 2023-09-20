import { List, ListItem, Stack, Typography } from '@mui/material';
import { Heading } from '@nexus/components';
import { Configuration } from '@nexus/utils/supabase';

export interface ConfiguratorSummaryProps {
  configuration?: Configuration;
}

export const ConfiguratorSummary = ({ configuration }: ConfiguratorSummaryProps) => {
  if (!configuration) {
    return null;
  }

  const listItemStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    py: 0.5,
  };

  const { totalCost, totalDepth, totalEnergy, totalWidth } = configuration;

  return (
    <Stack py={2}>
      <Heading mb={0}>Summary</Heading>
      <List>
        <ListItem sx={listItemStyles}>
          <Typography>Cost</Typography>
          <Typography>{`$${totalCost.toLocaleString()}`}</Typography>
        </ListItem>
        <ListItem sx={listItemStyles}>
          <Typography>Energy</Typography>
          <Typography>{totalEnergy / 1000000} MWh</Typography>
        </ListItem>
        <ListItem sx={listItemStyles}>
          <Typography>Dimensions</Typography>
          <Typography>{`${totalWidth}ft x ${totalDepth}ft`}</Typography>
        </ListItem>
      </List>
    </Stack>
  );
};
