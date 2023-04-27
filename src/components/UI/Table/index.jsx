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
  setEditTableIndex,
  loading,
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
        loading={loading}
        checkboxSelection
        onSelectionModelChange={(selected) => setEditTableIndex(selected)}
        disableSelectionOnClick
      />
    </div>
  );
};

export default Table;
