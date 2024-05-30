import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useSelector } from 'react-redux';
import RecipientTable from './RecipientTable';
import '../../styles.scss';
import {
  addFunctionSubmitResponseSelector,
  getFunctionRecipientHomePageDataSelector,
} from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import ProductFeedback from '../../../../../components/NPSFeedbackModule/ProductFeedback/ProductFeedback';

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
  const addFunctionSubmitResponseState = useSelector(addFunctionSubmitResponseSelector);
  const [openNPS, setOpenNPS] = useState(false);
  const [zoneValue, setZoneValue] = useState([]);
  const [buValue, setBUValue] = useState([]);
  const [functionValue, setFunctionValue] = useState([]);

  const getNumberOfItem = useMemo(() => {
    return (array, itemName) => array?.filter((val) => val === itemName)?.length;
  }, []);

  const statusInfo = useMemo(() => {
    const tableData = getRecipientHomePageData?.data[0]?.recipientData || [];
    if (!zoneValue.length && !buValue.length && !functionValue.length) {
      const allstatus = tableData?.map((d) => d?.Status);
      return {
        notStarted: getNumberOfItem(allstatus, 'Not started'),
        completed: getNumberOfItem(allstatus, 'Completed'),
        draft: getNumberOfItem(allstatus, 'Drafted'),
      };
    }

    const updatedData = tableData?.filter((i) => {
      return (
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
  }, [getRecipientHomePageData?.data[0], zoneValue, buValue, functionValue, getNumberOfItem]);

  // to open NPS feedback modal
  useEffect(() => {
    if (addFunctionSubmitResponseState.success) {
      // Delay by 1 second (1000 milliseconds)
      const timeoutId = setTimeout(() => {
        setOpenNPS(true);
      }, 2500);

      // Clean up the timeout when the component unmounts or when the effect re-runs
      return () => clearTimeout(timeoutId);
    }
  }, [addFunctionSubmitResponseState]);

  return (
    <div>
      {openNPS && (
        <ProductFeedback
          env={process.env.REACT_APP_STAGE}
          apiKey={''}
          token={localStorage.getItem('nps-auth-token')}
          feedbackMetadata={{
            Activity: 'Recipient has submitted the letter',
            Created_By: {
              Email: accounts[0]?.username,
              name: accounts[0]?.name ? accounts[0].name : '',
            },
          }}
          productId={process.env.REACT_APP_NPS_PRODUCT_ID}
          productActivityId="nps_score_provided_by_recipient"
          modalOpened={openNPS}
          setModalOpened={setOpenNPS}
        />
      )}

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
