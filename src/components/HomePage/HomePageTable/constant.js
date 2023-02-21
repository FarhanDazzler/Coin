import * as React from 'react';

export const class_to_apply = (item) => {
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

export const QuestionBank_Landing_page_data = [
  {
    id: 1,
    Mega_Process: 'AB Inbev India',
    Sub_Process: 'AB Inbev India',
    Control_ID: 'ATR_ACCR_01b-K',
    Control_Name: 'AB Inbev India',
    Status: 'Completed',
  },
  {
    id: 2,
    Mega_Process: 'AB Inbev US',
    Sub_Process: 'AB Inbev US',
    Control_ID: 'ATR_ACCR_01b-K',
    Control_Name: 'AB Inbev US',
    Status: 'Pending',
  },
  {
    id: 3,
    Mega_Process: 'AB Inbev Belgium',
    Sub_Process: 'AB Inbev Belgium',
    Control_ID: 'ATR_ACCR_01b-K',
    Control_Name: 'AB Inbev Belgium',
    Status: 'Completed',
  },
  {
    id: 4,
    Mega_Process: 'AB Inbev India',
    Sub_Process: 'AB Inbev India',
    Control_ID: 'ATR_ACCR_01b-K',
    Control_Name: 'AB Inbev India',
    Status: 'Not Confirmed',
  },
  {
    id: 5,
    Mega_Process: 'AB Inbev US',
    Sub_Process: 'AB Inbev US',
    Control_ID: 'ATR_ACCR_01b-K',
    Control_Name: 'AB Inbev US',
    Status: 'Completed',
  },
];
