import * as React from 'react';

const class_to_apply = (item) => {
  let className = '';
  if (item.toUpperCase() === 'PASS') {
    className = 'badge badge-success';
  }
  if (item.toUpperCase() === 'COMPLETE' || item === 'UNDER REVIEW') {
    className = 'badge badge-success';
  }
  if (item.toUpperCase() === 'SUBMITED' || item === 'UNDER REVIEWS') {
    className = 'badge badge-success';
  }
  if (item.toUpperCase() === 'FAIL') {
    className = 'badge badge-red';
  }
  if (item.toUpperCase() === 'IN PROGRESS') {
    className = 'badge badge-amber';
  }
  if (item.toUpperCase() === 'NOT STARTED' || item === 'UNDER REVIEW') {
    className = 'badge badge-grey';
  }
  return className;
};

export const TABLE_COLUMNS = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    cellClassName: 'dashboardCell',
    minWidth: 70,
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
    renderCell: (row) => {
      return <span className={'text-yellow'}>{row.row.Control_ID}</span>;
    },
  },
  {
    field: 'Status',
    headerName: 'Status',
    flex: 1,
    cellClassName: 'dashboardCell',
    minWidth: 120,
    renderCell: (row) => {
      return <span className={'text-yellow-dark'}>{row.row.Status}</span>;
    },
  },
  {
    field: 'KPI_Result',
    headerName: 'KPI Result',
    flex: 1,
    cellClassName: 'dashboardCell',
    minWidth: 100,
    renderCell: (row) => {
      return <span className={class_to_apply(row.row.KPI_Result)}>{row.row.KPI_Result}</span>;
    },
  },
  {
    field: 'Assessment_Result',
    headerName: 'Assessment Result',
    flex: 1,
    cellClassName: 'dashboardCell',
    minWidth: 100,
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
    minWidth: 100,
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
];

export const TABLE_ROES = [
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
  {
    id: 3,
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
    id: 4,
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
  {
    id: 5,
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
    id: 6,
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
  {
    id: 7,
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
  {
    id: 8,
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
    id: 9,
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
