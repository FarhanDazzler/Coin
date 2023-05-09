import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';

import cs from 'classnames';
import './tableStyles.scss';

const Table2 = ({
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
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    //do something when the row selection changes...
    //console.info({ rowSelection }, Object.keys(rowSelection));
    console.info('keys', Object.keys(rowSelection));
    setEditTableIndex(Object.keys(rowSelection));
  }, [rowSelection]);

  return (
    <div>
      <MaterialReactTable
        columns={tableColumns}
        data={tableData}
        initialState={{ showColumnFilters: true }}
        enableRowSelection
        getRowId={(row) => row.id} //give each row a more useful id
        onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
        state={{ rowSelection }} //pass our managed row selection state to the table to use
      />
    </div>
  );

  //   return (
  //     <div>
  //       <DataGrid
  //         sx={{ width: '100%' }}
  //         rows={tableData}
  //         className={cs('remove-search-boarder', { [className]: className })}
  //         componentsProps={{
  //           toolbar: { showQuickFilter: true },
  //           ...componentsProps,
  //         }}
  //         components={{
  //           Toolbar: GridToolbar,
  //           ...components,
  //         }}
  //         columns={tableColumns}
  //         autoHeight={autoHeight}
  //         classes={{
  //           root: 'main-table-wrapper',
  //           footerContainer: 'main-table-wrapper-footer',
  //           columnHeaderTitleContainer: 'justify-content-center',
  //           iconSeparator: 'opacity-0',
  //           toolbarContainer: 'table-toolbar-wrapper',
  //           panel: 'table-panel-wrapper',
  //           ...classes,
  //         }}
  //         pageSize={5}
  //         pagination
  //         loading={loading}
  //         checkboxSelection
  //         onSelectionModelChange={(selected) => setEditTableIndex(selected)}
  //         disableSelectionOnClick
  //       />
  //     </div>
  //   );
};

export default Table2;
