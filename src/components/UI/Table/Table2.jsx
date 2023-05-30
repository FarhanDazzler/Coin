import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FloatRight } from 'tabler-icons-react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here
import { Box, Button } from '@mui/material';

import cs from 'classnames';
import './tableStyles.scss';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e3af32',
    },
  },
});

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
    setEditTableIndex && setEditTableIndex(Object.keys(rowSelection));
  }, [rowSelection]);

  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(tableData);
  };

  // logic for export data in diffrerent formats

  // <Button
  //   color="primary"
  //   //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
  //   onClick={handleExportData}
  //   startIcon={<FileDownloadIcon />}
  //   variant="contained"
  // >
  //   Export All Data
  // </Button>;

  // <Button
  //   disabled={table.getRowModel().rows.length === 0}
  //   //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
  //   onClick={() => handleExportRows(table.getRowModel().rows)}
  //   startIcon={<FileDownloadIcon />}
  //   variant="contained"
  // >
  //   Export Page Rows
  // </Button>;

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="materialReactTableWrapper">
        <MaterialReactTable
          columns={tableColumns}
          data={tableData}
          initialState={{ showColumnFilters: true }}
          enableRowSelection
          enableStickyHeader
          getRowId={(row) => row.id} //give each row a more useful id
          onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
          state={{ rowSelection, isLoading: loading }} //pass our managed row selection state to the table to use
          renderTopToolbarCustomActions={({ table }) => (
            <div className="new-table-button" style={{ padding: '4px 10px' }}>
              {/*<FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />*/}
              {/*<span style={{ paddingLeft: '16px' }}>Table Name</span>*/}
              <>
                <Box
                  sx={{
                    display: 'flex',
                    //  gap: '1rem', flexWrap: 'wrap'
                  }}
                >
                  <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                    <div>
                      <Button
                        disabled={table.getPrePaginationRowModel().rows.length === 0}
                        //export all rows, including from the next page, (still respects filtering and sorting)
                        onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                      >
                        Export All Rows
                      </Button>
                    </div>
                    <div>
                      <Button
                        disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                        //only export selected rows
                        onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                      >
                        Export Selected Rows
                      </Button>
                    </div>
                  </div>
                </Box>
              </>
            </div>
          )}
        />
      </div>
    </ThemeProvider>
  );
};

export default Table2;
