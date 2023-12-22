import React, { useEffect, useMemo, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import '../../styles.scss';
import ProgressBar from '../../../../Home/V2/InternalControlHomePage/HomePageTable/ProgressBar/ProgressBar';
import ZoneICTable from './ZoneICTable';
import { ReactComponent as InfoIcon } from '../../../../../assets/images/InfoCircle.svg';
import { get_BU_ZIC_PersonaHomePageDataSelector } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
const NumberWithText = ({ total, number, tooltip, subTitle }) => (
  <div className="d-flex justify-content-between bg-black mb-2 p-1 px-4 rounded-3">
    <div className="d-flex align-items-center">
      <Tooltip title={tooltip} arrow>
        <InfoIcon />
      </Tooltip>
      {subTitle}
    </div>
    <h5 className="largeNumber yellow-gradient-text mb-0">
      {number} / {total}
    </h5>
  </div>
);

const ZoneICHomePage = () => {
  const history = useHistory();
  const { accounts } = useMsal();
  const selectedUserRole = localStorage.getItem('selected_Role');
  const getZICHomePageData = useSelector(get_BU_ZIC_PersonaHomePageDataSelector);

  const [yearValue, setYearValue] = useState([]);
  const [assessmentCycleValue, setAssessmentCycleValue] = useState([]);
  const [zoneValue, setZoneValue] = useState([]);
  const [buValue, setBUValue] = useState([]);

  const getNumberOfItem = useMemo(() => {
    return (array, itemName) => array?.filter((val) => val === itemName)?.length;
  }, []);

  const statusInfo = useMemo(() => {
    const tableData = getZICHomePageData?.data[0]?.home_page_table_global || [];
    const updatedData = tableData.filter((i) => {
      return (
        (!yearValue.length || yearValue.includes(i.Year)) &&
        (!assessmentCycleValue.length || assessmentCycleValue.includes(i.Assessment_Cycle)) &&
        (!zoneValue.length || zoneValue.includes(i.Zone)) &&
        (!buValue.length || buValue.includes(i.BU))
      );
    });

    const allUpdatestatus = updatedData.map((d) => d?.Status);
    const RBAStatus = updatedData.map((d) => d?.RBA_Status);
    const completedAssessment = getNumberOfItem(allUpdatestatus, 'Completed'); // Signature_status

    return {
      rbaApproved: getNumberOfItem(RBAStatus, 'RBA Approved'),
      notStarted: getNumberOfItem(allUpdatestatus, 'Not Started'),
      Prepared: getNumberOfItem(allUpdatestatus, 'Prepared'),
      signed: getNumberOfItem(allUpdatestatus, 'Signed'),
      completed: completedAssessment,
      completedRatio: ((completedAssessment / allUpdatestatus?.length) * 100)?.toFixed(0),
      total: allUpdatestatus?.length,
    };
  }, [
    getZICHomePageData?.data[0],
    yearValue,
    assessmentCycleValue,
    zoneValue,
    buValue,
    getNumberOfItem,
  ]);

  return (
    <div>
      <div className="container-fluid">
        <div className="row pt-5 align-items-center">
          <div className="col-lg-4">
            <h4 className="welcome-text">Welcome</h4>
            <h2 className="user-name-home yellow-gradient-text mb-2 text-capitalize">
              {accounts.length > 0 ? accounts[0].name.split('(').join(' (') : 'User Name'}
            </h2>
            <h3 className="user-role">{selectedUserRole}</h3>
          </div>
          <div className="col-lg-8">
            <div className="wrapper-info-grid">
              <div className="home-right-overviews h-100 d-flex align-items-center justify-content-center">
                <ProgressBar value={statusInfo.completedRatio} />
              </div>

              <div className="right-number home-right-overviews">
                <NumberWithText
                  total={statusInfo.total}
                  number={statusInfo.notStarted}
                  tooltip={
                    <div>
                      <span className="yellow-text"> Not Started : </span>
                      <span>
                        Contact Local Internal Control to complete Letter, and check fallbacks on
                        GRC.
                      </span>
                    </div>
                  }
                  subTitle="Not Started"
                />

                <NumberWithText
                  total={statusInfo.total}
                  number={statusInfo.Prepared}
                  tooltip={
                    <div>
                      <span className="yellow-text"> Prepared : </span>
                      <span>Local Internal Control has submitted response for section 1.</span>
                    </div>
                  }
                  subTitle="Prepared"
                />
                <NumberWithText
                  total={statusInfo.total}
                  number={statusInfo.signed}
                  tooltip={
                    <div>
                      <span className="yellow-text"> Signed : </span>
                      <span>All approval are submitted for the letter.</span>
                    </div>
                  }
                  subTitle="Signed"
                />
                <NumberWithText
                  total={statusInfo.total}
                  number={statusInfo.rbaApproved}
                  tooltip={
                    <div>
                      <span className="yellow-text"> RBA Approved : </span>
                      <span>Total number of RBA files approved.</span>
                    </div>
                  }
                  subTitle="RBA Approved"
                />
                <NumberWithText
                  total={statusInfo.total}
                  number={statusInfo.completed}
                  tooltip={
                    <div>
                      <span className="yellow-text"> Completed : </span>
                      <span>Total number of Letter completed.</span>
                    </div>
                  }
                  subTitle="Completed"
                />
                {/* <NumberWithText
                  number={statusInfo.total}
                  tooltip={
                    <div>
                      <span className="yellow-text"> Total : </span>
                      <span>Total number of Letter.</span>
                    </div>
                  }
                  subTitle="Total"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ZoneICTable
        yearValue={yearValue}
        setYearValue={setYearValue}
        assessmentCycleValue={assessmentCycleValue}
        setAssessmentCycleValue={setAssessmentCycleValue}
        zoneValue={zoneValue}
        setZoneValue={setZoneValue}
        buValue={buValue}
        setBUValue={setBUValue}
      />
    </div>
  );
};

export default ZoneICHomePage;
