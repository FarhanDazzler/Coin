import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useSelector } from 'react-redux';
import RecipientTable from './RecipientTable';
import '../../styles.scss';
import { getFunctionRecipientHomePageDataSelector } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';

const AmountInfo = React.memo(({ amount, infoText }) => {
  return (
    <div className="amountInfoWrapper">
      <div className="yellow-gradient-text amount">{amount}</div>
      <div className="amount-info">{infoText}</div>
    </div>
  );
});

const RecipientHomePage = () => {
  const history = useHistory();
  const { state } = useLocation();
  const { accounts } = useMsal();
  const selectedUserRole = localStorage.getItem('selected_Role');
  const getRecipientHomePageData = useSelector(getFunctionRecipientHomePageDataSelector);

  const [yearValue, setYearValue] = useState([]);
  const [assessmentCycleValue, setAssessmentCycleValue] = useState([]);
  const [zoneValue, setZoneValue] = useState([]);
  const [buValue, setBUValue] = useState([]);
  const [functionValue, setFunctionValue] = useState([]);

  const getNumberOfItem = useMemo(() => {
    return (array, itemName) => array?.filter((val) => val === itemName)?.length;
  }, []);

  const statusInfo = useMemo(() => {
    const tableData = getRecipientHomePageData?.data[0]?.recipientData || [];
    if (
      !yearValue.length &&
      !assessmentCycleValue.length &&
      !zoneValue.length &&
      !buValue.length &&
      !functionValue.length
    ) {
      const allstatus = tableData?.map((d) => d?.Status);
      return {
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
        (buValue?.length ? buValue.includes(i.BU) : true) &&
        (functionValue?.length ? functionValue.includes(i.Function) : true)
      );
    });

    const allUpdatestatus = updatedData?.map((d) => d?.Status);
    return {
      notStarted: getNumberOfItem(allUpdatestatus, 'Not started'),
      completed: getNumberOfItem(allUpdatestatus, 'Completed'),
      draft: getNumberOfItem(allUpdatestatus, 'Drafted'),
    };
  }, [
    getRecipientHomePageData?.data[0],
    yearValue,
    assessmentCycleValue,
    zoneValue,
    buValue,
    functionValue,
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
            </div>
          </div>
        </div>
      </div>

      <RecipientTable
        yearValue={yearValue}
        setYearValue={setYearValue}
        assessmentCycleValue={assessmentCycleValue}
        setAssessmentCycleValue={setAssessmentCycleValue}
        zoneValue={zoneValue}
        setZoneValue={setZoneValue}
        buValue={buValue}
        setBUValue={setBUValue}
        functionValue={functionValue}
        setFunctionValue={setFunctionValue}
      />
    </div>
  );
};

export default RecipientHomePage;
