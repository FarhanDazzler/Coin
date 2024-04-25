import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FloatRight } from 'tabler-icons-react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Box, Button, Typography } from '@mui/material';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import './tableStyles.scss';
import { useTranslation } from 'react-i18next';

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
  initialState = {},
  Is_Expanding_Detail_Panel = { Is_Expanding: false },
  isSimpleTable = false,
}) => {
  const { t } = useTranslation();
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    //do something when the row selection changes...
    //console.info({ rowSelection }, Object.keys(rowSelection));
    setEditTableIndex && setEditTableIndex(Object.keys(rowSelection));
  }, [rowSelection]);

  const exportToPDF = (rows) => {
    const doc = new jsPDF();

    // For all row data
    const data = rows.map((row) => {
      const rowData = {};
      var count = 0;
      // Looping over the columns to match is column header and row value both are there then insert value
      // If only column header is there and no row value, insert N/A
      // We are doing this bcoz we have more row data(say for 14 columns we have data) but column header
      // is only 12, so to save only 12 columns we need this logic
      tableColumns.forEach((column) => {
        const accessorKey = column.accessorKey;
        if (row.original[accessorKey]) {
          // count variable is there to make the data in the form acceptable to the library
          rowData[count++] = row.original[accessorKey];
        } else {
          rowData[count++] = 'N/A';
        }
      });
      return rowData;
    });
    const tableHeaders = tableColumns.map((c) => c.header);
    autoTable(doc, {
      head: [tableHeaders],
      body: data,
    });
    doc.save('exportedPDF.pdf');
  };

  const exportToExcel = (rows) => {
    // Prepare data for export
    const data = rows.map((row) => {
      const rowData = {};
      tableColumns.forEach((column) => {
        const accessorKey = column.accessorKey;
        rowData[column.header] = row.original[accessorKey];
      });
      return rowData;
    });

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add styling to the worksheet
    const headerStyle = {
      font: { bold: true },
      alignment: { horizontal: 'center' },
      fill: { fgColor: { rgb: 'FFFFAA00' } }, // Yellow background color
      border: {
        top: { style: 'thin', color: { rgb: 'FF000000' } },
        bottom: { style: 'thin', color: { rgb: 'FF000000' } },
        left: { style: 'thin', color: { rgb: 'FF000000' } },
        right: { style: 'thin', color: { rgb: 'FF000000' } },
      },
    };

    const dataStyle = {
      border: {
        top: { style: 'thin', color: { rgb: 'FF000000' } },
        bottom: { style: 'thin', color: { rgb: 'FF000000' } },
        left: { style: 'thin', color: { rgb: 'FF000000' } },
        right: { style: 'thin', color: { rgb: 'FF000000' } },
      },
    };

    // Apply styles to the header row
    const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
    for (let i = headerRange.s.c; i <= headerRange.e.c; i++) {
      const headerCell = XLSX.utils.encode_cell({ r: headerRange.s.r, c: i });
      worksheet[headerCell].s = headerStyle;
    }

    // Apply styles to the data rows
    for (let r = headerRange.s.r + 1; r <= headerRange.e.r; r++) {
      for (let c = headerRange.s.c; c <= headerRange.e.c; c++) {
        const dataCell = XLSX.utils.encode_cell({ r: r, c: c });
        worksheet[dataCell].s = dataStyle;
      }
    }

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Export the workbook to Excel file
    XLSX.writeFile(workbook, 'COIN_Table_Data.xlsx');
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

  // logic for Expanding Detail Panel

  //console.info(Is_Expanding_Detail_Panel, 'Is_Expanding_Detail_Panel');
  const Expanding_Detail_Panel =
    Is_Expanding_Detail_Panel.Is_Expanding === true
      ? ({ row }) => (
          <Box
            sx={{
              display: 'grid',
              margin: 'auto',
              gridTemplateColumns: '1fr 1fr',
            }}
          >
            {Is_Expanding_Detail_Panel.Table_Name === 'Control Owner & Oversight' && (
              <div className="col">
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <span className="grey-text font-weight-bold">Local Control Desc(LCD):</span>
                  </div>
                  <div className="col">
                    <p
                      class="left-aligned-text"
                      dangerouslySetInnerHTML={{
                        __html: row.original.local_control_description,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            {Is_Expanding_Detail_Panel.Table_Name === 'MICS Framework Table' && (
              <div className="row">
                <div className="col">
                  <div className="row mb-4">
                    <Typography>L1 Description:</Typography>
                    <p
                      class="left-aligned-text"
                      dangerouslySetInnerHTML={{
                        __html: row.original.mics_L1desc,
                      }}
                    />
                  </div>
                  <div className="row mb-4">
                    <Typography>L2 Description:</Typography>
                    <p
                      class="left-aligned-text"
                      dangerouslySetInnerHTML={{
                        __html: row.original.mics_L2desc,
                      }}
                    />
                  </div>
                  <div className="row mb-4">
                    <Typography>L3 Description:</Typography>
                    <p
                      class="left-aligned-text"
                      dangerouslySetInnerHTML={{
                        __html: row.original.mics_L3desc,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </Box>
        )
      : null;

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="materialReactTableWrapper">
        <MaterialReactTable
          enableFacetedValues
          selectAllMode="all"
          enableColumnFilterModes
          enableColumnFilters
          columns={tableColumns}
          data={tableData}
          initialState={{ showColumnFilters: false, density: 'compact' }}
          // initialState={{ columnPinning: { left: ['Entity_Id'], right: ['Total'] } }}
          enableRowSelection={isSimpleTable ? false : true}
          enableStickyHeader
          getRowId={(row) => row.id} //give each row a more useful id
          onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
          state={{ rowSelection, isLoading: loading }} //pass our managed row selection state to the table to use
          enableRowPinning={isSimpleTable ? false : true}
          enableColumnPinning={isSimpleTable ? false : true}
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
                        onClick={() => exportToExcel(table.getPrePaginationRowModel().rows)}
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                      >
                        {t('selfAssessment.homePage.controleOwner.Table.export_all_Rows_button')}
                      </Button>
                    </div>
                    <div>
                      <Button
                        disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                        //only export selected rows
                        onClick={() => exportToExcel(table.getSelectedRowModel().rows)}
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                      >
                        {t(
                          'selfAssessment.homePage.controleOwner.Table.export_selected_Rows_button',
                        )}
                      </Button>
                    </div>
                    <div>
                      <Button
                        disabled={table.getPrePaginationRowModel().rows.length === 0}
                        //only export selected rows
                        onClick={() => exportToPDF(table.getPrePaginationRowModel().rows)}
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                      >
                        Export to PDF
                      </Button>
                    </div>
                    <div>
                      <Button
                        disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                        //only export selected rows
                        onClick={() => exportToPDF(table.getSelectedRowModel().rows)}
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                      >
                        Export Selected Rows to PDF
                      </Button>
                    </div>
                  </div>
                </Box>
              </>
            </div>
          )}
          renderDetailPanel={Expanding_Detail_Panel}
        />
      </div>
    </ThemeProvider>
  );
};

export default Table2;
