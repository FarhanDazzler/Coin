import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useSelector } from 'react-redux';
import ZoneVPTable from './ZoneVPTable';
import '../../styles.scss';
import { get_BU_Zone_VPHomePageDataSelector } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import { stringToArray, useQuery } from '../../../../../hooks/useQuery';

const AmountInfo = React.memo(({ amount, infoText }) => {
  return (
    <div className="amountInfoWrapper">
      <div className="yellow-gradient-text amount">{amount}</div>
      <div className="amount-info">{infoText}</div>
    </div>
  );
});

const ZoneVPHomePage = () => {
  const getHomePageData = useSelector(get_BU_Zone_VPHomePageDataSelector);

  const params = useQuery();

  const initValue = {
    zoneValue: params?.filterZone ? stringToArray(params?.filterZone) : [],
    buValue: params?.filterBU ? stringToArray(params?.filterBU) : [],
    overallStatusValue: params?.filterOverallStatus
      ? stringToArray(params?.filterOverallStatus)
      : [],
    rbaStatusValue: params?.filterRbaStatus ? stringToArray(params?.filterRbaStatus) : [],
  };

  const [zoneValue, setZoneValue] = useState(initValue.zoneValue);
  const [buValue, setBUValue] = useState(initValue.buValue);
  const [overallStatusValue, setOverallStatusValue] = useState(initValue.overallStatusValue);
  const [rbaStatusValue, setRbaStatusValue] = useState(initValue.rbaStatusValue);

  const handleResetState = () => {
    setZoneValue([]);
    setBUValue([]);
    setOverallStatusValue([]);
    setRbaStatusValue([]);
  };

  const getNumberOfItem = useMemo(() => {
    return (array, itemName) => array?.filter((val) => val === itemName)?.length;
  }, []);

  const statusInfo = useMemo(() => {
    const tableData = getHomePageData?.data[0]?.zoneVPData || [];
    if (
      !zoneValue.length &&
      !buValue.length &&
      !overallStatusValue.length &&
      !rbaStatusValue.length
    ) {
      const allstatus = tableData?.map((d) => d?.Status);
      const RBAStatus = tableData.map((d) => d?.RBA_Status);
      return {
        rbaApproved: getNumberOfItem(RBAStatus, 'RBA Approved'),
        notStarted: getNumberOfItem(allstatus, 'Not Started'),
        Prepared: getNumberOfItem(allstatus, 'Prepared'),
        signed: getNumberOfItem(allstatus, 'Signed'),
        completed: getNumberOfItem(allstatus, 'Completed'),
        total: allstatus?.length,
      };
    }

    const updatedData = tableData?.filter((i) => {
      return (
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
        (buValue?.length ? buValue.includes(i.BU) : true) &&
        (overallStatusValue?.length ? overallStatusValue.includes(i.Status) : true) &&
        (rbaStatusValue?.length ? rbaStatusValue.includes(i.RBA_Status) : true)
      );
    });

    const allUpdatestatus = updatedData?.map((d) => d?.Status);
    const RBAStatus = updatedData.map((d) => d?.RBA_Status);
    return {
      rbaApproved: getNumberOfItem(RBAStatus, 'RBA Approved'),
      notStarted: getNumberOfItem(allUpdatestatus, 'Not Started'),
      Prepared: getNumberOfItem(allUpdatestatus, 'Prepared'),
      signed: getNumberOfItem(allUpdatestatus, 'Signed'),
      completed: getNumberOfItem(allUpdatestatus, 'Completed'),
      total: allUpdatestatus?.length,
    };
  }, [getHomePageData?.data[0], zoneValue, buValue, getNumberOfItem]);

  return (
    <div>
      <div className="row pt-5 align-items-center"></div>
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
              <AmountInfo amount={statusInfo.Prepared} infoText="Prepared" />
              <AmountInfo amount={statusInfo.signed} infoText="SIGNED" />
              <AmountInfo amount={statusInfo.rbaApproved} infoText="RBA APPROVED" />
              <AmountInfo amount={statusInfo.completed} infoText="COMPLETED" />
            </div>
          </div>
        </div>
      </div> */}

      <ZoneVPTable
        zoneValue={zoneValue}
        setZoneValue={setZoneValue}
        buValue={buValue}
        setBUValue={setBUValue}
        overallStatusValue={overallStatusValue}
        setOverallStatusValue={setOverallStatusValue}
        rbaStatusValue={rbaStatusValue}
        setRbaStatusValue={setRbaStatusValue}
        handleResetState={handleResetState}
      />
    </div>
  );
};

export default ZoneVPHomePage;
