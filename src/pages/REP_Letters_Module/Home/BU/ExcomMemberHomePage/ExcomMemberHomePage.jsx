import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useSelector } from 'react-redux';
import ExcomMemberTable from './ExcomMemberTable';
import '../../styles.scss';
import { get_BUZone_ExcomMemberHomePageDataSelector } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import { stringToArray, useQuery } from '../../../../../hooks/useQuery';

const AmountInfo = React.memo(({ amount, infoText }) => {
  return (
    <div className="amountInfoWrapper">
      <div className="yellow-gradient-text amount">{amount}</div>
      <div className="amount-info">{infoText}</div>
    </div>
  );
});

const ExcomMemberHomePage = () => {
  const getHomePageData = useSelector(get_BUZone_ExcomMemberHomePageDataSelector);
  const params = useQuery();
  const initValue = {
    zoneValue: params?.filterZone ? stringToArray(params?.filterZone) : [],
  };

  const [zoneValue, setZoneValue] = useState(initValue.zoneValue);

  const getNumberOfItem = useMemo(() => {
    return (array, itemName) => array?.filter((val) => val === itemName)?.length;
  }, []);

  const statusInfo = useMemo(() => {
    const tableData = getHomePageData?.data[0]?.excomMemberData || [];
    if (!zoneValue.length) {
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
      return zoneValue?.length ? zoneValue.includes(i.Zone) : true;
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
  }, [getHomePageData?.data[0], zoneValue, getNumberOfItem]);

  const handleResetState = () => {
    setZoneValue([]);
  };
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

      <ExcomMemberTable
        zoneValue={zoneValue}
        setZoneValue={setZoneValue}
        handleResetState={handleResetState}
      />
    </div>
  );
};

export default ExcomMemberHomePage;
