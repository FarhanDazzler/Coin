import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import '../../../assets/styles/custom.css';
import { TABLE_COLUMNS, TABLE_ROES } from './constant';
import { useEffect, useState } from 'react';
import './tableStyles.scss';

const DashboardTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(TABLE_ROES);
  }, []);
  return (
    <>
      {/*<div className="rounded-4 shadow-4 float-end mb-3">*/}
      {/*  <FilterHomePageTable />*/}
      {/*</div>*/}
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col col-lg-12">
            <DataGrid
              sx={{ width: '100%' }}
              rows={tableData}
              className="remove-search-boarder"
              componentsProps={{
                toolbar: { showQuickFilter: true },
              }}
              // components={{
              //   Toolbar: GridToolbar,
              // }}
              columns={tableColumns}
              autoHeight
              classes={{
                root: 'main-table-wrapper',
                footerContainer: 'main-table-wrapper-footer',
                columnHeaderTitleContainer: 'justify-content-center',
                iconSeparator: 'opacity-0',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTable;
