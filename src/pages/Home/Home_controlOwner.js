import React, { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import Axios from 'axios';

import '../../assets/styles/custom.css';

//dummy data for the controls
let owner_assessment_data = [
  {
    id: 1,
    control_instance: 'ATR_MJE_01a-K',
    provider_org: 'SSC_GCC_Bangalore_GHQ',
    stage: 'UNDER REVIEW',
    self_assessment: 'NOT STARTED',
    kpi_assessment: 'FAIL',
    Q1: 'FAIL',
    Q2: 'PASS',
    Q3: 'PASS',
    Q4: 'NOT STARTED',
  },
  {
    id: 2,
    control_instance: 'ATR_ACCR_01a',
    provider_org: 'SSC_GCC_Bangalore_GHQ',
    stage: 'COMPLETE',
    self_assessment: 'NOT STARTED',
    kpi_assessment: 'PASS',
    Q1: 'FAIL',
    Q2: 'FAIL',
    Q3: 'PASS',
    Q4: 'SUBMITED',
  },
];
let oversight_assessment_data = [
  {
    id: 1,
    control_instance: 'ATR_RECON_01a-K',
    provider_org: 'SSC_GCC_Bangalore_GHQ',
    stage: 'UNDER REVIEW',
    self_assessment: 'FAIL',
    kpi_assessment: 'PASS',
    Q1: 'FAIL',
    Q2: 'PASS',
    Q3: 'PASS',
    Q4: 'FAIL',
  },
];

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
  if (item.toUpperCase() === 'NOT STARTED' || item === 'UNDER REVIEW') {
    className = 'badge-grey';
  }

  return className;
};

//populate the headers for past assessment results
const quarter_logic = () => {
  //if in Q1 only show Current Quarter
  //if in Q2 show, current and 1Q ago
  //if in Q3 show, current , 1Q ago and 2Q ago
  //if in Q4 show current, 1Q , 2Q and 3Q ago

  //if in Q2 - Q4 show current and Q(Current-1) ago
  const current_quarter = Math.floor(new Date().getMonth() / 3 + 1);
  // const current_quarter = 2;
  const quarter_list = [];
  for (let index = 1; index <= current_quarter; index++) {
    if (index === current_quarter) {
      quarter_list.push('Current Quarter');
      quarter_list.reverse();
    } else {
      quarter_list.push(current_quarter - index + 'Q Ago');
    }
  }
  // console.log(quarter_list);
  const headers = quarter_list.map((head) => <th>{head}</th>);
  return headers;
};

let stage = '';
let temp_self_assess = '';
let temp_kpi_assess = '';
let temp_Q1 = '';
let temp_Q2 = '';
let temp_Q3 = '';
let temp_Q4 = '';

const Home = ({ getControlId }) => {
  const { accounts } = useMsal();

  const control_name = 'ATR_MJE_01a-K';
  const pending_control = 2;

  useEffect(() => {
    Axios.get('http://localhost:1234/get_assessment_trigger_surveys').then(function (response) {
      // console.log(response?.data);
      console.log(owner_assessment_data);
      var status_code = response.status;
      var status_text = response.statusText;
      var api_data = response?.data.data;
      if (status_code === 200 && status_text === 'OK') {
        console.log(api_data);
      } else {
        console.log(response.error.message);
      }
    });
  }, []);

  const assessment_data_list = (data) =>
    data.map((item) => (
      <tr>
        <td>
          <a href={'/Assessments/' + item.control_instance}>{item.control_instance}</a>
        </td>
        <td>{item.provider_org}</td>
        <td>
          <span className={class_to_apply((stage = item.stage))}>{stage.toUpperCase()}</span>
        </td>
        <td>
          <span className={class_to_apply((temp_self_assess = item.self_assessment))}>
            {temp_self_assess}
          </span>
        </td>
        <td>
          <span className={class_to_apply((temp_kpi_assess = item.kpi_assessment))}>
            {temp_kpi_assess}
          </span>
        </td>
        <td>
          <span className={class_to_apply((temp_Q4 = item.Q4))}>{temp_Q4.toUpperCase()}</span>
        </td>
        <td>
          <span className={class_to_apply((temp_Q3 = item.Q3))}>{temp_Q3.toUpperCase()}</span>
        </td>
        <td>
          <span className={class_to_apply((temp_Q2 = item.Q2))}>{temp_Q2.toUpperCase()}</span>
        </td>
        <td>
          <span className={class_to_apply((temp_Q1 = item.Q1))}>{temp_Q1.toUpperCase()}</span>
        </td>
      </tr>
    ));

  // const summaryCards = (assessNumber, assessText) => {
  //   return (
  //     <div className="col-3">
  //       <div className="badge" style={{ backgroundColor: 'golden' }}>
  //         <div className="card-header">
  //           <div className="card-title black-text">
  //             {assessNumber}
  //             <br></br>
  //             <span className="golden-text ">
  //               <strong>
  //                 {' '}
  //                 {assessText} {`Assessments`}
  //               </strong>
  //             </span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col col-lg-12">
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                {`Hi  `}
                <span className="golden-text">{accounts[0].name ? accounts[0].name : ''}</span>
                {`!  You have one assessment pending`}
              </span>
            </div>
            <div className="card-header">
              <span className="card-title golden-text">
                <strong
                  style={{
                    fontSize: '1.3rem',
                  }}
                >
                  Ownership Span
                </strong>
              </span>
            </div>
            <div className="card-body">
              {owner_assessment_data.length !== 0 ? (
                <div className="table-responsive table-hover">
                  <table className="table table-outline text-wrap table-vcenter card-table">
                    <tr
                      className="text-center"
                      style={{
                        borderBottom: '2px solid black',
                      }}
                    >
                      <th>CONTROL INSTANCE</th>
                      <th>PROVIDER ORG</th>
                      <th>STAGE</th>
                      <th>SELF ASSESSMENT</th>
                      <th>KPI ASSESSMENT</th>
                      {quarter_logic()}
                    </tr>
                    <tbody
                      className="text-center"
                      style={{
                        backgroundColor: '#fff',
                      }}
                    >
                      {owner_assessment_data ? (
                        assessment_data_list(owner_assessment_data)
                      ) : (
                        <p className="card-body">No Assessments available!</p>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No Controls available</p>
              )}
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
                  Oversight Span
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
                      <th>CONTROL INSTANCE</th>
                      <th>PROVIDER ORG</th>
                      <th>STAGE</th>
                      <th>SELF ASSESSMENT</th>
                      <th>KPI ASSESSMENT</th>
                      {quarter_logic()}
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

export default Home;
