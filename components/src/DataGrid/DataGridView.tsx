'use client';

import { Box } from '@mui/material';
import { DataGrid } from './DataGrid';
import { DataGridToolbar, DataGridToolbarProps } from './DataGridToolbar';
import { DataGridPremiumProps } from '@mui/x-data-grid-premium';

export interface DataGridViewProps extends DataGridPremiumProps {
  DataGridToolbarProps?: DataGridToolbarProps;
  title?: DataGridToolbarProps['title'];
}

export const DataGridView = ({
  columns,
  initialState,
  loading,
  rows,
  title,
  ...rest
}: DataGridViewProps) => {
  return (
    <Box
      component='div'
      width='100%'
    >
      <DataGrid
        columns={columns}
        initialState={initialState}
        rows={rows}
        loading={loading}
        slots={{
          toolbar: () => <DataGridToolbar title={title} />,
        }}
        {...rest}
      />
    </Box>
  );
};
