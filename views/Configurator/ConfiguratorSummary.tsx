import { faInfoCircle } from '@fortawesome/sharp-light-svg-icons';
import { List, ListItem, Stack, Tooltip, Typography } from '@mui/material';
import { Icon } from 'components/Icon';
import { Heading } from 'components/Heading';
import React from 'react';
import { Configuration } from 'database/objects';

export interface ConfiguratorSummaryProps {
  configuration?: Configuration;
}

export const ConfiguratorSummary = ({
  configuration,
}: ConfiguratorSummaryProps) => {
  if (!configuration) {
    return null;
  }

  const listItemStyles = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const {
    totalBatteries,
    totalCost,
    totalDepth,
    totalEnergy,
    totalTransformers,
    totalWidth,
  } = configuration;

  return (
    <Stack
      borderRadius={2}
      p={2}
    >
      <Heading>Overview</Heading>
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
        <ListItem sx={listItemStyles}>
          <Typography>
            Transformers
            <Tooltip
              title='One transformer is needed for every two industrial batteries you order.'
            >
              <Icon
                icon={faInfoCircle}
                sx={{
                  color: 'grey.500',
                  fontSize: 14,
                  ml: 1,
                }}
              />
            </Tooltip>
          </Typography>
          <Typography>{totalTransformers}</Typography>
        </ListItem>
        <ListItem sx={listItemStyles}>
          <Typography>Batteries</Typography>
          <Typography>{totalBatteries}</Typography>
        </ListItem>
      </List>
    </Stack>
  );
};
