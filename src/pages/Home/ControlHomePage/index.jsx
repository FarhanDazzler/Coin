import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import ControlOwnerTable from './ControlOwnerTable/ControlOwnerTable';
import { useSelector } from 'react-redux';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import HomeTableModal from '../V2/InternalControlHomePage/HomeTableModal';
import './styles.scss';
import { getControlOwnerDataSelector } from '../../../redux/DashBoard/DashBoardSelectors';
import { submitAssessmentResponseSelector } from '../../../redux/Assessments/AssessmentSelectors.js';
import { useTranslation } from 'react-i18next';
import ProductFeedback from '../../../components/NPSFeedbackModule/ProductFeedback/ProductFeedback.js';

const ControlHomePage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { state } = useLocation();
  const selectedUserRole = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const loginUserRole = loginRole ?? selectedUserRole;
  const query = new URLSearchParams(history.location.search);
  const Control_ID = query.get('Control_ID');
  const { accounts } = useMsal();
  const getControlOwnerData = useSelector(getControlOwnerDataSelector);
  const [openNPS, setOpenNPS] = useState(false);
  const submitAssessmentResponseState = useSelector(submitAssessmentResponseSelector);

  const [zoneValue, setZoneValue] = useState([]);
  const [buValue, setBUValue] = useState([]);
  const [receiverValue, setReceiverValue] = useState([]);
  const [providerValue, setProviderValue] = useState([]);

  useEffect(() => {
    setZoneValue([]);
    setBUValue([]);
    setReceiverValue([]);
    setProviderValue([]);
  }, [loginUserRole]);

  const getNumberOfItem = (array, itemName) => {
    return array.filter((val) => val === itemName)?.length;
  };

  useEffect(() => {
    // if (!userRole?.length || userRole === 'undefined') history.push('/not-authorized');
  }, [
    getControlOwnerData.data,
    loginUserRole,
    zoneValue,
    buValue,
    receiverValue,
    providerValue,
    loginUserRole,
  ]);

  const statusInfo = useMemo(() => {
    const tableData =
      loginUserRole === 'Control owner'
        ? getControlOwnerData.data[0]?.cOwnerData || []
        : getControlOwnerData.data[1]?.cOverSightData || [];
    if (!zoneValue.length && !buValue.length && !receiverValue.length && !providerValue.length) {
      const allstatus = tableData.map((d) => {
        return d.Status;
      });
      return {
        notStarted: getNumberOfItem(allstatus, 'Not started'),
        completed: getNumberOfItem(allstatus, 'Completed'),
        draft: getNumberOfItem(allstatus, 'Drafted'),
        reAssessed: getNumberOfItem(allstatus, 'Re-Triggered'),
      };
    }

    const updatedData = tableData.filter((i) => {
      return (
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
        (buValue?.length ? buValue.includes(i.BU) : true) &&
        (receiverValue?.length ? receiverValue.includes(i.Receiver) : true) &&
        (providerValue?.length ? providerValue.includes(i.Provider) : true)
      );
    });

    const allUpdatestatus = updatedData.map((d) => {
      return d.Status;
    });
    return {
      notStarted: getNumberOfItem(allUpdatestatus, 'Not started'),
      completed: getNumberOfItem(allUpdatestatus, 'Completed'),
      draft: getNumberOfItem(allUpdatestatus, 'Drafted'),
      reAssessed: getNumberOfItem(allUpdatestatus, 'Re-Triggered'),
    };
  }, [
    getControlOwnerData.data,
    loginUserRole,
    zoneValue,
    buValue,
    receiverValue,
    providerValue,
    loginUserRole,
  ]);

  // to open NPS feedback modal
  useEffect(() => {
    if (submitAssessmentResponseState.success) {
      // Delay by 1 second (1000 milliseconds)
      const timeoutId = setTimeout(() => {
        setOpenNPS(true);
      }, 2500);

      // Clean up the timeout when the component unmounts or when the effect re-runs
      return () => clearTimeout(timeoutId);
    }
  }, [submitAssessmentResponseState]);

  return (
    <div>
      <PageWrapper>
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
        <div className="container-fluid">
          <div className="row pt-5 align-items-center">
            <div className="col-lg-4 pt-5">
              <h4 className="welcome-text">
                {t('selfAssessment.homePage.controleOwner.greeting')}
              </h4>
              <h2 className="user-name-home yellow-gradient-text mb-2 text-capitalize">
                {accounts.length > 0 ? accounts[0].name.split('(').join(' (') : 'User Name'}
              </h2>
              {loginUserRole && <h3 className="user-role">{loginUserRole}</h3>}
            </div>
            <div className="col-lg-8">
              <div className="d-flex align-items-center flex-wrap justify-content-end">
                {/* <AmountInfo amount={12292} infoText={'BU'} />
                <AmountInfo amount={19} infoText="functional" /> */}
                <AmountInfo
                  amount={statusInfo.notStarted}
                  infoText={<>{t('selfAssessment.homePage.controleOwner.statsCard_NOT_STARTED')}</>}
                />
                <AmountInfo
                  amount={statusInfo.completed}
                  infoText={<>{t('selfAssessment.homePage.controleOwner.statsCard_COMPLETED')}</>}
                />
                <AmountInfo
                  amount={statusInfo.draft}
                  infoText={<>{t('selfAssessment.homePage.controleOwner.statsCard_DRAFTED')}</>}
                />
              </div>
            </div>
          </div>
        </div>

        {loginUserRole === 'Control owner' ? (
          <ControlOwnerTable
            tableName="Control Owner"
            zoneValue={zoneValue}
            setZoneValue={setZoneValue}
            buValue={buValue}
            setBUValue={setBUValue}
            receiverValue={receiverValue}
            setReceiverValue={setReceiverValue}
            providerValue={providerValue}
            setProviderValue={setProviderValue}
          />
        ) : (
          <ControlOwnerTable
            tableName="Control Oversight"
            zoneValue={zoneValue}
            setZoneValue={setZoneValue}
            buValue={buValue}
            setBUValue={setBUValue}
            receiverValue={receiverValue}
            setReceiverValue={setReceiverValue}
            providerValue={providerValue}
            setProviderValue={setProviderValue}
          />
        )}

        {Control_ID && <HomeTableModal isModal={true} activeData={state} />}
      </PageWrapper>
    </div>
  );
};

const AmountInfo = ({ amount, infoText }) => {
  return (
    <div className="amountInfoWrapper">
      <div className="yellow-gradient-text amount">{amount}</div>
      <div className="amount-info">{infoText}</div>
    </div>
  );
};
export default ControlHomePage;
