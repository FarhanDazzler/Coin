import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FloatRight } from 'tabler-icons-react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Box, Button, Typography } from '@mui/material';
import * as XLSX from 'xlsx';
import './tableStyles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownWideShort,
  faBars,
  faBarsStaggered,
  faColumns,
  faCompress,
  faEllipsisH,
  faEllipsisVertical,
  faExpand,
  faEyeSlash,
  faFilter,
  faFilterCircleXmark,
  faGripLines,
  faSearch,
  faSearchMinus,
  faSortDown,
  faThumbTack,
} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

/**
 * These are just some of the icons visible in this table's feature set.
 * If you skip customizing some icons, those particular icons will fallback the the default Material UI icons.
 */
const fontAwesomeIcons = {
  ArrowDownwardIcon: (props) => <FontAwesomeIcon icon={faSortDown} {...props} />,
  ClearAllIcon: () => <FontAwesomeIcon icon={faBarsStaggered} />,
  DensityLargeIcon: () => <FontAwesomeIcon icon={faGripLines} />,
  DensityMediumIcon: () => <FontAwesomeIcon icon={faBars} />,
  DensitySmallIcon: () => <FontAwesomeIcon icon={faBars} />,
  DragHandleIcon: () => <FontAwesomeIcon icon={faGripLines} />,
  FilterListIcon: (props) => <FontAwesomeIcon icon={faFilter} {...props} />,
  FilterListOffIcon: () => <FontAwesomeIcon icon={faFilterCircleXmark} />,
  FullscreenExitIcon: () => <FontAwesomeIcon icon={faCompress} />,
  FullscreenIcon: () => <FontAwesomeIcon icon={faExpand} />,
  SearchIcon: (props) => <FontAwesomeIcon icon={faSearch} {...props} />,
  SearchOffIcon: () => <FontAwesomeIcon icon={faSearchMinus} />,
  ViewColumnIcon: () => <FontAwesomeIcon icon={faColumns} />,
  MoreVertIcon: () => <FontAwesomeIcon icon={faEllipsisVertical} />,
  MoreHorizIcon: () => <FontAwesomeIcon icon={faEllipsisH} />,
  SortIcon: (props) => (
    <FontAwesomeIcon icon={faArrowDownWideShort} {...props} /> //props so that style rotation transforms are applied
  ),
  PushPinIcon: (props) => (
    <FontAwesomeIcon icon={faThumbTack} {...props} /> //props so that style rotation transforms are applied
  ),
  VisibilityOffIcon: () => <FontAwesomeIcon icon={faEyeSlash} />,
};

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
  Is_Expanding_Detail_Panel = { Is_Expanding: false },
}) => {
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    //do something when the row selection changes...
    //console.info({ rowSelection }, Object.keys(rowSelection));
    setEditTableIndex && setEditTableIndex(Object.keys(rowSelection));
  }, [rowSelection]);

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

                <div className="col">
                  <div className="row mb-4">
                    <Typography>Recommended Standardization:</Typography>
                    <p
                      class="left-aligned-text"
                      dangerouslySetInnerHTML={{
                        __html: row.original.Recommended_Standardization,
                      }}
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="row mb-4">
                    <Typography>ABI DAG:</Typography>
                    <p
                      class="left-aligned-text"
                      dangerouslySetInnerHTML={{
                        __html: row.original.ABI_DAG,
                      }}
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="row mb-4">
                    <Typography>AmBev DAG:</Typography>
                    <p
                      class="left-aligned-text"
                      dangerouslySetInnerHTML={{
                        __html: row.original.AmBev_DAG,
                      }}
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="row mb-4">
                    <Typography>Risk:</Typography>
                    <p
                      class="left-aligned-text"
                      dangerouslySetInnerHTML={{
                        __html: row.original.Risk,
                      }}
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="row mb-4">
                    <Typography>Balance Sheet Impact:</Typography>
                    <p
                      class="left-aligned-text"
                      dangerouslySetInnerHTML={{
                        __html: row.original.BS_impact,
                      }}
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="row mb-4">
                    <Typography>P&L Impact:</Typography>
                    <p
                      class="left-aligned-text"
                      dangerouslySetInnerHTML={{
                        __html: row.original.PnL_impact,
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
          enableRowSelection
          enableStickyHeader
          getRowId={(row) => row.id} //give each row a more useful id
          onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
          state={{ rowSelection, isLoading: loading }} //pass our managed row selection state to the table to use
          icons={fontAwesomeIcons}
          enablePinning
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
                        Export All Rows
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
                        Export Selected Rows
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
