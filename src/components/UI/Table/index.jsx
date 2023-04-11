import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import cs from 'classnames';
import './tableStyles.scss';

const Table = ({
  tableData,
  tableColumns,
  className,
  autoHeight = true,
  components = {},
  componentsProps = {},
  classes,
}) => {
  return (
    <div>
      <DataGrid
        sx={{ width: '100%' }}
        rows={tableData}
        className={cs('remove-search-boarder', { [className]: className })}
        componentsProps={{
          toolbar: { showQuickFilter: true },
          ...componentsProps,
        }}
        components={{
          Toolbar: GridToolbar,
          ...components,
        }}
        columns={tableColumns}
        autoHeight={autoHeight}
        classes={{
          root: 'main-table-wrapper',
          footerContainer: 'main-table-wrapper-footer',
          columnHeaderTitleContainer: 'justify-content-center',
          iconSeparator: 'opacity-0',
          toolbarContainer: 'table-toolbar-wrapper',
          panel: 'table-panel-wrapper',
          ...classes,
        }}
        pageSize={5}
        pagination
        checkboxSelection
        onSelectionModelChange={(selected) =>
          console.log(selected, 'selected fields from table via check')
        }
        disableSelectionOnClick
      />
    </div>
  );
};

export default Table;
