import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useSelector } from 'react-redux';
import DisclosureProcessorTable from './DisclosureProcessorTable';
import '../../styles.scss';
import {
  addBUSubmitResponseSelector,
  get_BU_Disclosure_ProcessorHomePageDataSelector,
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

const DisclosureProcessorHomePage = () => {
  const history = useHistory();
  const { state } = useLocation();
  const { accounts } = useMsal();
  const selectedUserRole = localStorage.getItem('selected_Role');
  const getDisclosureProcessorHomePageData = useSelector(
    get_BU_Disclosure_ProcessorHomePageDataSelector,
  );
  const addBUSubmitResponseState = useSelector(addBUSubmitResponseSelector);
  const [openNPS, setOpenNPS] = useState(false);
  const [zoneValue, setZoneValue] = useState([]);
  const [buValue, setBUValue] = useState([]);

  const getNumberOfItem = useMemo(() => {
    return (array, itemName) => array?.filter((val) => val === itemName)?.length;
  }, []);

  const statusInfo = useMemo(() => {
    const tableData = getDisclosureProcessorHomePageData?.data[0]?.dpData || [];
    if (!zoneValue.length && !buValue.length) {
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
        (buValue?.length ? buValue.includes(i.BU) : true)
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
  }, [getDisclosureProcessorHomePageData?.data[0], zoneValue, buValue, getNumberOfItem]);

  // to open NPS feedback modal
  useEffect(() => {
    if (addBUSubmitResponseState.success) {
      // Delay by 1 second (1000 milliseconds)
      const timeoutId = setTimeout(() => {
        setOpenNPS(true);
      }, 2500);

      // Clean up the timeout when the component unmounts or when the effect re-runs
      return () => clearTimeout(timeoutId);
    }
  }, [addBUSubmitResponseState]);

  return (
    <div>
      {openNPS && (
        <ProductFeedback
          env={process.env.REACT_APP_STAGE}
          apiKey={''}
          token={localStorage.getItem('nps-auth-token')}
          feedbackMetadata={{
            Activity: 'Control owner/Control oversigth has submitted the assessment',
            Created_By: {
              Email: accounts[0]?.username,
              name: accounts[0]?.name ? accounts[0].name : '',
            },
          }}
          productId={process.env.REACT_APP_NPS_PRODUCT_ID}
          productActivityId="nps_score_provided_controlOwner_and_controlOversight"
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
              {/* <AmountInfo amount={statusInfo.notStarted} infoText="NOT STARTED" /> */}
              <AmountInfo amount={statusInfo.Prepared} infoText="PREPARED" />
              <AmountInfo amount={statusInfo.signed} infoText="SIGNED" />
              <AmountInfo amount={statusInfo.rbaApproved} infoText="RBA APPROVED" />
              <AmountInfo amount={statusInfo.completed} infoText="COMPLETED" />
              {/* <AmountInfo amount={statusInfo.total} infoText="TOTAL" /> */}
            </div>
          </div>
        </div>
      </div>

      <DisclosureProcessorTable
        zoneValue={zoneValue}
        setZoneValue={setZoneValue}
        buValue={buValue}
        setBUValue={setBUValue}
      />
    </div>
  );
};

export default DisclosureProcessorHomePage;
