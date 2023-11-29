import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useSelector } from 'react-redux';
import BUHeadTable from './BUHeadTable';
import '../../styles.scss';
import { get_BU_BU_HeadHomePageDataSelector } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';

const AmountInfo = React.memo(({ amount, infoText }) => {
  return (
    <div className="amountInfoWrapper">
      <div className="yellow-gradient-text amount">{amount}</div>
      <div className="amount-info">{infoText}</div>
    </div>
  );
});

const BUHeadHomePage = () => {
  const history = useHistory();
  const { state } = useLocation();
  const { accounts } = useMsal();
  const selectedUserRole = localStorage.getItem('selected_Role');
  const getHomePageData = useSelector(get_BU_BU_HeadHomePageDataSelector);

  const [yearValue, setYearValue] = useState([]);
  const [assessmentCycleValue, setAssessmentCycleValue] = useState([]);
  const [zoneValue, setZoneValue] = useState([]);
  const [buValue, setBUValue] = useState([]);

  const getNumberOfItem = useMemo(() => {
    return (array, itemName) => array?.filter((val) => val === itemName)?.length;
  }, []);

  const statusInfo = useMemo(() => {
    const tableData = getHomePageData?.data[0]?.buHeadData || [];
    if (!yearValue.length && !assessmentCycleValue.length && !zoneValue.length && !buValue.length) {
      const allstatus = tableData?.map((d) => d?.Status);
      const RBAStatus = tableData.map((d) => d?.RBA_Status);
      return {
        rbaApproved: getNumberOfItem(RBAStatus, 'RBA Approved'),
        notStarted: getNumberOfItem(allstatus, 'Not Started'),
        responded: getNumberOfItem(allstatus, 'Responded'),
        signed: getNumberOfItem(allstatus, 'Signed'),
        completed: getNumberOfItem(allstatus, 'Completed'),
        total: allstatus?.length,
      };
    }

    const updatedData = tableData?.filter((i) => {
      return (
        (yearValue?.length ? yearValue.includes(i.Year) : true) &&
        (assessmentCycleValue?.length ? assessmentCycleValue.includes(i.Assessment_Cycle) : true) &&
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
        (buValue?.length ? buValue.includes(i.BU) : true)
      );
    });

    const allUpdatestatus = updatedData?.map((d) => d?.Status);
    const RBAStatus = updatedData.map((d) => d?.RBA_Status);
    return {
      rbaApproved: getNumberOfItem(RBAStatus, 'RBA Approved'),
      notStarted: getNumberOfItem(allUpdatestatus, 'Not Started'),
      responded: getNumberOfItem(allUpdatestatus, 'Responded'),
      signed: getNumberOfItem(allUpdatestatus, 'Signed'),
      completed: getNumberOfItem(allUpdatestatus, 'Completed'),
      total: allUpdatestatus?.length,
    };
  }, [
    getHomePageData?.data[0],
    yearValue,
    assessmentCycleValue,
    zoneValue,
    buValue,
    getNumberOfItem,
  ]);

  return (
    <div>
      {/* <div className="container-fluid">
        <div className="row pt-5 align-items-center">
          <div className="col-lg-4 pt-5">
            <h4 className="welcome-text">Welcome</h4>
            <h2 className="user-name-home yellow-gradient-text mb-2 text-capitalize">
              {accounts.length > 0 ? accounts[0].name : 'User Name'}
            </h2>
            {selectedUserRole && <h3 className="user-role">{selectedUserRole}</h3>}
          </div>
          <div className="col-lg-8">
            <div className="d-flex align-items-center flex-wrap justify-content-end">
              <AmountInfo amount={statusInfo.responded} infoText="RESPONDED" />
              <AmountInfo amount={statusInfo.signed} infoText="SIGNED" />
              <AmountInfo amount={statusInfo.rbaApproved} infoText="RBA APPROVED" />
              <AmountInfo amount={statusInfo.completed} infoText="COMPLETED" />
            </div>
          </div>
        </div>
      </div> */}

      <BUHeadTable
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

export default BUHeadHomePage;
