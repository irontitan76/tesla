'use client';

import { Stack } from '@mui/material';
import { DataGridPremium, DataGridPremiumProps } from '@mui/x-data-grid-premium';
import { Icon } from 'components/Icon';
import DataGridNoRows from './DataGridNoRows';
import {
  faChevronDown,
  faChevronUp,
  faColumns3,
  faCompressWide,
  faDownload,
  faEllipsisV,
  faExpandWide,
  faEyeSlash,
  faFilter,
  faMinus,
  faPlus,
  faRectangle,
  faThumbTack,
} from '@fortawesome/sharp-light-svg-icons';
import { faFilterSlash } from '@fortawesome/sharp-light-svg-icons';
import { faFilters } from '@fortawesome/sharp-light-svg-icons';
import { faTrash } from '@fortawesome/sharp-light-svg-icons';

export interface DataGridProps extends DataGridPremiumProps {}

export const DataGrid = ({
  columns = [],
  initialState = {},
  loading,
  rows = [],
  slots,
  ...rest
}: DataGridProps) => {
  if (!rows || !columns) {
    return null;
  }

  const iconMap = {
    // columnHeaderFilterIconButton: { icon: faFilter },
    columnMenuFilterIcon: { icon: faFilter },
    columnMenuHideIcon: { icon: faEyeSlash },
    columnMenuIcon: { icon: faEllipsisV },
    columnMenuManageColumnsIcon: { icon: faColumns3 },
    columnMenuSortAscendingIcon: { icon: faChevronUp },
    columnMenuSortDescendingIcon: { icon: faChevronDown },
    columnMenuPinLeftIcon: { icon: faThumbTack, sx: { transform: 'rotate(30deg)' } },
    columnMenuPinRightIcon: { icon: faThumbTack, sx: { transform: 'rotate(-30deg)' } },
    columnSortedAscendingIcon: { icon: faChevronUp },
    columnSortedDescendingIcon: { icon: faChevronDown },
    columnUnsortedIcon: { icon: faChevronUp },
    detailPanelExpandIcon: { icon: faPlus },
    detailPanelCollapseIcon: { icon: faMinus },
    densityCompactIcon: { icon: faCompressWide },
    densityStandardIcon: { icon: faRectangle },
    densityComfortableIcon: { icon: faExpandWide },
    exportIcon: { icon: faDownload },
    filterPanelAddIcon: { icon: faFilters },
    filterPanelDeleteIcon: { icon: faFilterSlash },
    filterPanelRemoveAllIcon: { icon: faTrash },
  };

  const icons = Object.entries(iconMap).reduce((acc, [key, value]: [string, any]) => {
    acc[key] = () => (
      <Icon
        icon={value.icon}
        sx={{
          fontSize: 15,
          ...value?.sx,
        }}
      />
    );

    return acc;
  }, {} as any);

  return (
    <Stack
      borderRadius={2}
      display='flex'
      height={{
        lg: 'calc(100vh - 96px)',
      }}
      width='100%'
    >
      <DataGridPremium
        columns={columns}
        initialState={initialState}
        loading={loading}
        rows={rows}
        slots={{
          noResultsOverlay: () => <DataGridNoRows>No results</DataGridNoRows>,
          noRowsOverlay: () => <DataGridNoRows>No rows</DataGridNoRows>,
          ...icons,
          ...slots,
        }}
        slotProps={{
          columnMenu: {
            // @ts-expect-error - TODO: file bug with MUI, sx does not pass through
            sx: {
              '& .MuiTypography-root': {
                fontSize: 12,
              },
            },
          },
          columnsPanel: {
            sx: {
              '& .MuiTypography-root': {
                fontSize: 12,
              },
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: 'secondary.main',
              },
              '& .MuiSwitch-root .Mui-checked+.MuiSwitch-track': {
                bgcolor: 'secondary.main',
              },
              '& .MuiButtonBase-root.MuiButton-containedSecondary': {
                bgcolor: 'secondary.main',
                color: 'secondary.contrastText',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                },
              },
            },
          },
        }}
        sx={{
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
        }}
        {...rest}
      />
    </Stack>
  );
};

export default DataGrid;
