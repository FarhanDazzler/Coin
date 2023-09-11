import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useSelector } from 'react-redux';
import ZoneVPTable from './ZoneVPTable';
import '../../styles.scss';
import { get_BU_Zone_VPHomePageDataSelector } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';

const AmountInfo = React.memo(({ amount, infoText }) => {
  return (
    <div className="amountInfoWrapper">
      <div className="yellow-gradient-text amount">{amount}</div>
      <div className="amount-info">{infoText}</div>
    </div>
  );
});

const ZoneVPHomePage = () => {
  const history = useHistory();
  const { state } = useLocation();
  const { accounts } = useMsal();
  const selectedUserRole = localStorage.getItem('selected_Role');
  const getHomePageData = useSelector(get_BU_Zone_VPHomePageDataSelector);

  const [yearValue, setYearValue] = useState([]);
  const [assessmentCycleValue, setAssessmentCycleValue] = useState([]);
  const [zoneValue, setZoneValue] = useState([]);
  const [buValue, setBUValue] = useState([]);

  const getNumberOfItem = useMemo(() => {
    return (array, itemName) => array?.filter((val) => val === itemName)?.length;
  }, []);

  const statusInfo = useMemo(() => {
    const tableData = getHomePageData?.data[0]?.zoneVPData || [];
    if (!yearValue.length && !assessmentCycleValue.length && !zoneValue.length && !buValue.length) {
      const allstatus = tableData?.map((d) => d?.Status);
      const RBAStatus = tableData.map((d) => d?.RBA_status);
      return {
        RBA_completed: getNumberOfItem(RBAStatus, 'Attached'),
        notStarted: getNumberOfItem(allstatus, 'Not started'),
        completed: getNumberOfItem(allstatus, 'Completed'),
        draft: getNumberOfItem(allstatus, 'Drafted'),
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
    const RBAStatus = updatedData.map((d) => d?.RBA_status);
    return {
      RBA_completed: getNumberOfItem(RBAStatus, 'Attached'),
      notStarted: getNumberOfItem(allUpdatestatus, 'Not started'),
      completed: getNumberOfItem(allUpdatestatus, 'Completed'),
      draft: getNumberOfItem(allUpdatestatus, 'Drafted'),
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
      <div className="container-fluid">
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
              <AmountInfo amount={statusInfo.notStarted} infoText="NOT STARTED" />
              <AmountInfo amount={statusInfo.completed} infoText="COMPLETED" />
              <AmountInfo amount={statusInfo.draft} infoText="DRAFTED" />
              <AmountInfo amount={statusInfo.RBA_completed} infoText="RBA ATTACHED" />
            </div>
          </div>
        </div>
      </div>

      <ZoneVPTable
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

export default ZoneVPHomePage;
