import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import DataAccordion from '../../common/DataAccordion';
import { useDispatch, useSelector } from 'react-redux';
import { controlData } from '../../redux/Assessments/AssessmentAction';
import { useMsal } from '@azure/msal-react';
import { getControlSelector } from '../../redux/Assessments/AssessmentSelectors';

//variables from global controls and local control descriptions.
var Global_data = [];
var Global_Data = [];
var L1_desc = {};
var L2_desc = {};

const SpinningLoader = [
  <div
    className="spinner-loader"
    style={{
      color: 'gold',
      margin: '10px',
      padding: '15px',
    }}
  >
    <strong>Please wait while the details are loaded...</strong>
  </div>,
];

var control_name_fromDB = '';
var control_oversight_fromDB = '';

const Details = ({ control_id }) => {
  const [data_loaded, setData_loaded] = useState(false);
  console.log('data_loaded', data_loaded);
  const controlDataResponse = useSelector(getControlSelector);

  var local_control_description_fromDB = controlDataResponse?.lcd;

  const { accounts } = useMsal();
  console.log(control_id, 'Control_ID');

  // const control_id = 'ATR_ACCR_01a';
  const dispatch = useDispatch();
  const [scope, setscope] = useState({});
  const getScope = () => {
    Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/get_control_scope?ControlID=${
        control_id || `ATR_MJE_01a-K`
      }&coOwner=${accounts[0].username}`,
    )
      .then(async (res) => {
        console.log(res.data.data.priod_of_assessment);
        setscope(res.data.data);
        console.log(scope.frequency);
        // localStorage.setItem('frequency', scope.frequency);
        // localStorage.setItem('provider_org', scope.provider_org);
        //console.log(scope.period_of_assessment);
        //  scope[ priod_of_assessment]=res.data.data.period_of_assessment
        dispatch(controlData(res.data.data));
        await localStorage.setItem('frequency', scope.frequency);
        await localStorage.setItem('provider_org', scope.provider_org);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getControlData = async () => {
    //for LCD and other details
    setData_loaded(true);
    await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/get_control_instances?ControlID=` +
        control_id +
        `&coOwner=${accounts[0].username}`,
    ).then(function (response) {
      console.log(response);
      var status_code = response.status;
      var status_text = response.statusText;
      var api_data = response?.data.data;

      console.log(api_data, 'LCD API TEST Kuldeep');

      var lcd_desc = '';
      var control_oversight = '';
      var control_name = '';

      if (api_data.length !== 0) {
        api_data = api_data[0];
        lcd_desc = api_data.local_control_description;
        control_oversight = api_data.coversight;
        control_name = api_data.control_id_provider_entity;
      } else {
        control_oversight = 'No Data Available';
        control_name = 'No Data Available';
      }

      if (status_code === 200 && status_text === 'OK') {
        if (lcd_desc) {
          local_control_description_fromDB = lcd_desc;
        } else {
          local_control_description_fromDB = 'No local description available for this control';
        }
        control_oversight_fromDB = control_oversight ? control_oversight.split('@')[0] : '';
        control_name_fromDB = control_name;
        setData_loaded(false);
      } else {
        console.log(response.error.message);
      }
    });
  };

  //load GCD data from backend
  const getGCDDesc = () => {
    //for GCD
    Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/get_mics_framework_details?ControlID=` + control_id,
    ).then(function (response) {
      var status_code = response.status;
      var status_text = response.statusText;
      var api_data = response?.data.data[0];

      if (api_data) {
        var L1Data = '';
        var L2Data = '';
        if (api_data.mics_L1desc.length === 0) {
          L1Data = 'Not Specified';
        } else {
          L1Data = api_data.mics_L1desc;
        }
        if (api_data.mics_L2desc.length === 0) {
          L2Data = 'Not Specified';
        } else {
          L2Data = api_data.mics_L2desc;
        }
        L1_desc['key'] = '1';
        L1_desc['header'] =
          'MICS L1 - Minimal Requirements To Protect Financial Statement From Material Mistakes (External Compliance)';
        L1_desc['text'] = L1Data;
        L2_desc['key'] = '2';
        L2_desc['header'] =
          'MICS L2 - Minimal Requirements To Avoid Surprises (Internal Compliance)';
        L2_desc['text'] = L2Data;
      } else {
        L1_desc['key'] = '1';
        L1_desc['header'] =
          'MICS L1 - Minimal Requirements To Protect Financial Statement From Material Mistakes (External Compliance)';
        L1_desc['text'] = 'Not Specified';
        L2_desc['key'] = '2';
        L2_desc['header'] =
          'MICS L2 - Minimal Requirements To Avoid Surprises (Internal Compliance)';
        L2_desc['text'] = 'Not Specified';
      }
      Global_Data[0] = L1_desc;
      Global_Data[1] = L2_desc;

      if (status_code === 200 && status_text === 'OK') {
        Global_data = Global_Data;
      } else {
        console.log(response.error.message);
      }
    });
  };

  useEffect(() => {
    getControlData();
    getGCDDesc();
    getScope();
  }, [scope.frequency, scope.provider_org]);

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 1) : text}
        <strong>
          <span onClick={toggleReadMore} className="golden-text read-or-hide">
            {isReadMore ? '...Show more' : ' Show less'}
          </span>
        </strong>
      </p>
    );
  };

  return (
    <>
      <div className="container mt-3">
        <div className="">
          <div className="card mb-1">
            <div className="card-header">
              <h2
                className="card-title golden-text"
                style={{
                  fontSize: '1.3rem',
                }}
              >
                <strong>
                  {control_id} <span className="black-text"> - Manual Journal Entries - ERP </span>
                </strong>
              </h2>
            </div>
            <DataAccordion
              acc_key="0"
              acc_header="Global Control Description (GCD)"
              acc_body={
                <ReadMore>
                  <div style={{ textAlign: 'left' }}>
                    <p className="black-text">
                      <strong>{`2021 MICS L1 - Minimal Requirements To Protect Financial Statement From Material Mistakes (External Compliance)`}</strong>
                    </p>
                    <p>
                      {`A process should be put in place to ensure all manual journal entries are pre-approved by the authorized people. The evidence of those approvals should be archived and the completeness of pre-approvals should be verified as part of the detective control over manual journal entries.`}
                      <br /> <br />
                      {`All MJEs in ERP systems (any manual transaction whereby a person determines both Debit & Credit account and the amount to be posted) are reviewed for accuracy and validity at the moment of request by capable and independent senior employees.`}
                      <br /> <br />
                      {`The approver should ensure that the person requesting the manual journal entry is authorized to do so, the entry is in line with the Accounting & Reporting Manual or other management reporting guidelines, the supporting material and calculation behind the entry is available and accurate, necessary DAG approvals are in place (if applicable). `}
                      <br /> <br />
                      {`Exception procedure for journal entries where system does technically not allow park & post (as validated by Global Internal Control) :`}
                      <br />
                      {`- the reviewer in the detective control will perform the  tasks assigned to approver above post-factum.`}
                      <br />
                      {`- the detective control is executed before or on WD10.`}
                      <br />
                      {`- on top, quarterly, the list of people with direct access to post (without park) is reviewed and confirmed.`}
                    </p>
                  </div>

                  <div style={{ textAlign: 'left' }}>
                    <p className="black-text">
                      <strong>{`2021 MICS L2 - Minimal Requirements To Avoid Surprises (Internal Compliance)`}</strong>
                    </p>
                    <p>
                      {`Manual journal entries are managed in a workflow tool which is configured to ensure:`}
                      <br />
                      {`- mandatory attachments are included in the request to enable validation of the entries `}
                      <br />
                      {`- critical mandatory fields are defined to ensure the proper identification of manual journal entries `}
                      <br />
                      {`- auto posting of manual journal entries following the necessary approvals provided in the system`}
                      <br />
                      <br />
                      <br />
                      {`As a note, following types of MJE are to be reviewed per description of the following controls and in compliance with the global journal voucher policy: `}
                      <br />
                      {`- Discount accruals: ATR_ACCR_01a `}
                      <br />
                      {`- Other accruals: ATR_ACCR_02 `}
                      <br />
                      {`- Off balance sheet accruals: ATR_REP_01 `}
                      <br />
                      {`- Provisions for doubtful debtors: ATR_PROV_02-K `}
                      <br />
                      {`- Manual adjustments on VIC, VLC, inventory: INV_REP_01 `}
                      <br />
                      {`- Manual Invoices (Direct FI invoices): STP_PO_03 `}
                      <br />
                      {`- CAPEX to OPEX Reclasses: FA_CAP_04`}
                      <br />
                      {`- Manual journal entries for the Institutional packages reclassifications and journal entries related to Gifts & Donations must be approved by the legal compliance team `}
                      <br />
                      {`- Manual journal entries are to be above the threshold defined in the global and manual journal entries  with an accumulated  debit  side  lower  than  500  USD are avoided (with exception of journal entries related to Gifts & Donations).`}
                      <br />
                      {`For any other type of manual journal entries (e.g. reclassification, corrections) a common and standardized zone template is in place to justify the underlying data of the amounts defined in the journal entry. Different templates exist for the different types of manual journal entries.`}
                      <br /> <br /> <br />
                      {`Further reference on how Manual Journal Entries should be processed in ERP is available in the Journal Voucher Policy.`}
                      <br></br>
                      {`Any changes in the workflow configuration should be approved by Zone Internal Control before the changes are made.`}
                      <br></br>
                      {`Result KPI's to be achieved to reach L2:`}
                      <br />
                      {`- [KPI_ATR_MJE_09] % of manual journal entries not passed via  parked & posted <1%. `}
                      <br />
                      {`- [KPI_ATR_MJE_02] % of manual journal entries parked & posted by the same person <0%.`}
                      <br />
                      {`- [KPI_ATR_MJE_06] Number of manual journal entries for which releaser changed the amount = 0.`}
                      <br />
                      {`- [KPI_ATR_MJE_03] Number of manual journal entries (24 to 12 months ago)  < Number of manual journal entries last 12 months`}
                    </p>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p className="black-text">
                      <strong>{`2021 MICS L3`}</strong>
                    </p>
                    <p>
                      {`In addition to the L2 requirements:`}
                      <br />
                      {`1. Any MJE performed is managed through a workflow tool which guarantees four eye review on every transaction (employees can park & post journal entries, but can never do this on the same journal entry). `}
                      <br />
                      {`2. All documentation supporting MJEs is stored together with the journal entry in the system of record (ERP or sub conso system) and no other system.`}
                      <br /> <br /> <br />
                      {`Standardization to be achieved to reach L3:`}
                      <br />
                      {`Booking of manual journal entries is only performed by the NoCC.`}
                      <br />
                      <br /> <br />
                      {`Result KPI's to be achieved to reach L3:`}
                      <br />
                      {`- [KPI_ATR_MJE_04] Number of manual journal entries not passed via  parked & posted = 0. `}
                      <br />
                      {`- [KPI_ATR_MJE_05] Number of manual journal entries parked & posted by the same person = 0.`}
                      <br />
                      {`- [KPI_ATR_MJE_06] Number of manual journal entries for which releaser changed the amount = 0.`}
                      <br />
                      {`- [KPI_ATR_MJE_07] % of MJE line items over total of journal entry line items < 1%`}
                      <br />
                      {`- [KPI_ATR_MJE_08] % of MJE value over total absolute value of journal entries in the month is smaller < 1%`}
                      <br />
                      {`- [KPI_ATR_MJE_09] % of manual journal entries not passed via  parked & posted <0%.`}
                      <br />
                    </p>
                  </div>
                </ReadMore>
              }
              // acc_body={Global_data.map((comp) => {
              //   return (
              //     <div>
              //       <p className="black-text">
              //         <strong>{comp.header}</strong>
              //       </p>
              //       <ReadMore>
              //         {comp.text.split('. ').map((str, index) => (
              //           <p key={index}>{str}<br/></p>
              //         ))}
              //       </ReadMore>
              //     </div>
              //   );
              // })}
            />
            <DataAccordion
              acc_key="1"
              acc_header="Local Control Description (LCD)"
              acc_body={local_control_description_fromDB}
            />
            <DataAccordion
              acc_key="1"
              acc_header="SCOPE"
              acc_body={
                <div>
                  <p>
                    <strong>Receving entity :</strong> {scope.receiving_entity}{' '}
                  </p>
                  <p>
                    <strong>Provider org: </strong> {scope.provider_org}{' '}
                  </p>
                  <p>
                    {' '}
                    <strong>Period of assessment :</strong> {scope.priod_of_assessment}
                  </p>
                  <p>
                    <strong>Frequency of control :</strong> {scope.frequency}{' '}
                  </p>
                </div>
              }
            />
            {data_loaded ? (
              <div className="card-body p-4">
                <p>
                  {' '}
                  <span style={{ fontWeight: 'bold' }}>Control Name: </span>
                  {control_name_fromDB}
                </p>
                <p>
                  {' '}
                  <span style={{ fontWeight: 'bold' }}>Control Oversight:</span>{' '}
                  {control_oversight_fromDB}
                </p>
                <p>
                  {' '}
                  <span style={{ fontWeight: 'bold' }}>Assessment Period:</span>{' '}
                  {Math.floor(new Date().getMonth() / 3 + 1)}
                  {`Q`} {new Date().getFullYear()}{' '}
                </p>
              </div>
            ) : (
              SpinningLoader
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
