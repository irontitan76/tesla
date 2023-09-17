import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/sharp-light-svg-icons';
import { Grid, Toolbar, Typography } from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid-premium';
import React, { ReactNode } from 'react';

export interface DataGridToolbarProps {
  title?: ReactNode;
}

export const DataGridToolbar = ({
  title,
  ...rest
}: DataGridToolbarProps) => {
  return (
    <Toolbar
      disableGutters
      {...rest}
    >
      <Grid
        alignItems='center'
        container
        justifyContent='space-between'
        pb={2}
      >
        <Grid item>
          {title && (
            <Typography
              component='h1'
              fontWeight='bold'
              variant='h3'
            >
              {title}
            </Typography>
          )}
        </Grid>
        <Grid item>
          <GridToolbarContainer>
            <GridToolbarQuickFilter
              color='secondary'
              InputProps={{
                startAdornment: (
                  <FontAwesomeIcon
                    icon={faSearch}
                  />
                ),
                sx: {
                  height: 32,
                }
              }}
              size='small'
              sx={{ pb: 0 }}
              variant='outlined'
            />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
          </GridToolbarContainer>
        </Grid>
      </Grid>
    </Toolbar>
  );
};
