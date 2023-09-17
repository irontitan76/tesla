import { Box } from '@mui/material';
import React from 'react';
import { DataGrid, DataGridProps } from './DataGrid';
import { DataGridToolbar, DataGridToolbarProps } from './DataGridToolbar';

export interface DataGridViewProps extends DataGridProps {
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
    <Box width='100%'>
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
