import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Grid } from '@mui/material';

import '../../assets/styles/custom.css';
import FilterHomePageTable from './FilterHomePageTableComponent';

const rows = [
  {
    id: 1,
    Zone: 'AFR',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'UNDER REVIEW',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 2,
    Zone: 'NAZ',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_ACCR_01a',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'UNDER REVIEW',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
];

const class_to_apply = (item) => {
  let className = '';
  if (item.toUpperCase() === 'PASS') {
    className = 'badge-success';
  }
  if (item.toUpperCase() === 'COMPLETE' || item === 'UNDER REVIEW') {
    className = 'badge-success';
  }
  if (item.toUpperCase() === 'SUBMITED' || item === 'UNDER REVIEWS') {
    className = 'badge-success';
  }
  if (item.toUpperCase() === 'FAIL') {
    className = 'badge-red';
  }
  if (item.toUpperCase() === 'IN PROGRESS') {
    className = 'badge-amber';
  }
  if (item.toUpperCase() === 'NOT STARTED' || item === 'UNDER REVIEW') {
    className = 'badge-grey';
  }

  return className;
};

const DashboardTable = () => {
  return (
    <div>
      <div className="rounded-4 shadow-4 float-end mb-3">
        <FilterHomePageTable />
      </div>
      <Grid container item xs={12} sx={{ height: 500, width: '100%', pl: 5, pr: 5 }}>
        <DataGrid
          sx={{ width: '100%' }}
          rows={rows}
          className="remove-search-boarder"
          componentsProps={{
            toolbar: { showQuickFilter: true },
          }}
          components={{
            Toolbar: GridToolbar,
          }}
          columns={[
            {
              field: 'id',
              headerName: 'ID',
              flex: 1,
              cellClassName: 'dashboardCell',
              minWidth: 120,
            },
            {
              field: 'Zone',
              headerName: 'Zone',
              flex: 1,
              cellClassName: 'dashboardCell',
              minWidth: 120,
            },
            {
              field: 'Provider_Org',
              headerName: 'Provider Org',
              flex: 1,
              cellClassName: 'dashboardCell',
              minWidth: 180,
            },
            {
              field: 'Control_ID',
              headerName: 'Control ID',
              flex: 1,
              cellClassName: 'dashboardCell',
              minWidth: 120,
            },
            {
              field: 'Status',
              headerName: 'Status',
              flex: 1,
              cellClassName: 'dashboardCell',
              minWidth: 130,
              renderCell: (row) => {
                return <span className={class_to_apply(row.row.Status)}>{row.row.Status}</span>;
              },
            },
            {
              field: 'KPI_Result',
              headerName: 'KPI Result',
              flex: 1,
              cellClassName: 'dashboardCell',
              minWidth: 130,
              renderCell: (row) => {
                return (
                  <span className={class_to_apply(row.row.KPI_Result)}>{row.row.KPI_Result}</span>
                );
              },
            },
            {
              field: 'Assessment_Result',
              headerName: 'Assessment Result',
              flex: 1,
              cellClassName: 'dashboardCell',
              minWidth: 190,
              renderCell: (row) => {
                return (
                  <span className={class_to_apply(row.row.Assessment_Result)}>
                    {row.row.Assessment_Result}
                  </span>
                );
              },
            },
            {
              field: 'Compliance_Result',
              headerName: 'Compliance Result',
              flex: 1,
              cellClassName: 'dashboardCell',
              minWidth: 190,
              renderCell: (row) => {
                return (
                  <span className={class_to_apply(row.row.Compliance_Result)}>
                    {row.row.Compliance_Result}
                  </span>
                );
              },
            },
            {
              field: 'Co_Owner',
              headerName: 'Co Owner',
              flex: 1,
              cellClassName: 'dashboardCell',
              minWidth: 120,
            },
            {
              field: 'Co_Oversight',
              headerName: 'Co Oversight',
              flex: 1,
              cellClassName: 'dashboardCell',
              minWidth: 100,
            },
          ]}
          pageSize={10}
          rowsPerPageOptions={[10, 50, 100]}
          disableSelectionOnClick
        />
      </Grid>
    </div>
  );
};

export default DashboardTable;
