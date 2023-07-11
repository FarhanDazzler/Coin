import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
//dummy data for the controls

import Axios from 'axios';

//dummy data for the controls
let oversight_assessment_data = [
  {
    id: 1,
    Zone: 'NAZ',
    Control_ID: 'ATR_MJE_01a-K',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Status: 'UNDER REVIEW',
    KPI_Result: 'NOT STARTED',
    Assessment_Result: 'FAIL',
    Compliance_Result: '',
  },
  {
    id: 2,
    Zone: 'AFR',
    Control_ID: 'ATR_MJE_01a-K',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Status: 'COMPLETE',
    KPI_Result: 'PASS',
    Assessment_Result: 'PASS',
    Compliance_Result: '',
  },
  {
    id: 3,
    Zone: 'EUR',
    Control_ID: 'ATR_MJE_01a-K',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Status: 'UNDER REVIEW',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: '',
  },
  {
    id: 4,
    Zone: 'GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Status: 'UNDER REVIEW',
    KPI_Result: 'PASS',
    Assessment_Result: 'FAIL',
    Compliance_Result: '',
  },
];

const cal_compliance_result = (element) => {
  if (
    element.KPI_Result.toUpperCase() === 'PASS' &&
    element.Assessment_Result.toUpperCase() === 'PASS'
  ) {
    return 'PASS';
  } else if (
    (element.KPI_Result.toUpperCase() !== 'PASS' && element.KPI_Result.toUpperCase() !== 'FAIL') ||
    (element.Assessment_Result.toUpperCase() !== 'PASS' &&
      element.Assessment_Result.toUpperCase() !== 'FAIL')
  ) {
    return 'N/A';
  } else {
    return 'FAIL';
  }
};

//logic to check which badge class to apply
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
  if (item.toUpperCase() === 'NOT STARTED' || item === 'UNDER REVIEW' || item === 'N/A') {
    className = 'badge-grey';
  }

  return className;
};

let temp_Status = '';
let temp_KPI_Result = '';
let temp_Assessment_Result = '';

const GlobalInternalControl = ({ getControlId }) => {
  const { accounts } = useMsal();

  const assessment_data_list = (data) =>
    data.map((item) => (
      <tr>
        <td>{item.Zone}</td>
        <td>
          {/* <a href={'/Assessments/' + item.Control_ID}>{item.Control_ID}</a>*/}
          <a href={'/'}>{item.Control_ID}</a>
        </td>
        <td>{item.Provider_Org}</td>
        <td>
          <span className={class_to_apply((temp_Status = item.Status))}>
            {temp_Status.toUpperCase()}
          </span>
        </td>
        <td>
          <span className={class_to_apply((temp_KPI_Result = item.KPI_Result))}>
            {temp_KPI_Result}
          </span>
        </td>
        <td>
          <span className={class_to_apply((temp_Assessment_Result = item.Assessment_Result))}>
            {temp_Assessment_Result}
          </span>
        </td>
        <td>
          <span className={class_to_apply(cal_compliance_result(item))}>
            {cal_compliance_result(item)}
          </span>
        </td>
      </tr>
    ));

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                {`Hi `}
                <span className="golden-text">
                  <strong>
                    {accounts.length > 0 ? accounts[0].name : ''} {`!`}
                  </strong>
                </span>
              </div>
            </div>
            <div className="card-title small m-1">
              <h4>{`You are an Internal Controller`}</h4>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <span className="card-title golden-text">
                <strong
                  style={{
                    fontSize: '1.3rem',
                  }}
                >
                  Internal Controller Span
                </strong>
              </span>
            </div>
            <div className="card-body">
              {oversight_assessment_data.length !== 0 ? (
                <div className="table-responsive table-hover">
                  <table className="table table-outline text-wrap table-vcenter card-table">
                    <tr
                      className="text-center"
                      style={{
                        borderBottom: '2px solid black',
                      }}
                    >
                      <th>ZONE</th>
                      <th>CONTROL INSTANCE</th>
                      <th>PROVIDER ORG</th>
                      <th>STATUS</th>
                      <th>KPI RESULT</th>
                      <th>ASSESSMENT RESULT</th>
                      <th>COMPLIANCE RESULT</th>
                    </tr>
                    <tbody
                      className="text-center"
                      style={{
                        backgroundColor: '#fff',
                      }}
                    >
                      {assessment_data_list(oversight_assessment_data)}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="card-body">No Data Available!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalInternalControl;
