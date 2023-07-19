import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import ControlOwnerTable from './ControlOwnerTable/ControlOwnerTable';
import { useSelector } from 'react-redux';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import HomeTableModal from '../V2/InternalControlHomePage/HomeTableModal';
import './styles.scss';
import { getControlOwnerDataSelector } from '../../../redux/DashBoard/DashBoardSelectors';
import { useTranslation } from 'react-i18next';

const ControlHomePage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { state } = useLocation();
  const selectedUserRole = localStorage.getItem('selected_Role');
  const userRole = localStorage.getItem('Roles');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const loginUserRole = loginRole ?? selectedUserRole;
  const query = new URLSearchParams(history.location.search);
  const Control_ID = query.get('Control_ID');
  const { accounts } = useMsal();
  const getControlOwnerData = useSelector(getControlOwnerDataSelector);
  const [statusInfo, setStatusInfo] = useState({
    notStarted: 0,
    completed: 0,
    draft: 0,
    reAssessed: 0,
  });

  // multi choice user input State for filters button
  const [yearValue, setYearValue] = useState([]);
  const [assessmentCycleValue, setAssessmentCycleValue] = useState([]);
  const [zoneValue, setZoneValue] = useState([]);
  const [buValue, setBUValue] = useState([]);
  const [receiverValue, setReceiverValue] = useState([]);
  const [providerValue, setProviderValue] = useState([]);

  useEffect(() => {
    setYearValue([]);
    setAssessmentCycleValue([]);
    setZoneValue([]);
    setBUValue([]);
    setReceiverValue([]);
    setProviderValue([]);
  }, [loginUserRole]);

  const getNumberOfItem = (array, itemName) => {
    return array.filter((val) => val === itemName)?.length;
  };

  useEffect(() => {
    if (!userRole?.length || userRole === 'undefined') history.push('/not-authorized');
    const tableData =
      loginUserRole === 'Control owner'
        ? getControlOwnerData.data[0]?.cOwnerData || []
        : getControlOwnerData.data[1]?.cOverSightData || [];
    if (
      !yearValue.length &&
      !assessmentCycleValue.length &&
      !zoneValue.length &&
      !buValue.length &&
      !receiverValue.length &&
      !providerValue.length
    ) {
      const allstatus = tableData.map((d) => {
        return d.Status;
      });
      setStatusInfo({
        notStarted: getNumberOfItem(allstatus, 'Not started'),
        completed: getNumberOfItem(allstatus, 'Completed'),
        draft: getNumberOfItem(allstatus, 'Drafted'),
        reAssessed: getNumberOfItem(allstatus, 'Re-Triggered'),
      });
    } else {
      const updatedData = tableData.filter((i) => {
        return (
          (yearValue?.length ? yearValue.includes(i.Year) : true) &&
          (assessmentCycleValue?.length
            ? assessmentCycleValue.includes(i.Assessment_Cycle)
            : true) &&
          (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
          (buValue?.length ? buValue.includes(i.BU) : true) &&
          (receiverValue?.length ? receiverValue.includes(i.Receiver) : true) &&
          (providerValue?.length ? providerValue.includes(i.Provider) : true)
        );
      });

      const allUpdatestatus = updatedData.map((d) => {
        return d.Status;
      });
      setStatusInfo({
        notStarted: getNumberOfItem(allUpdatestatus, 'Not started'),
        completed: getNumberOfItem(allUpdatestatus, 'Completed'),
        draft: getNumberOfItem(allUpdatestatus, 'Drafted'),
        reAssessed: getNumberOfItem(allUpdatestatus, 'Re-Triggered'),
      });
    }
  }, [
    getControlOwnerData.data,
    loginUserRole,
    yearValue,
    assessmentCycleValue,
    zoneValue,
    buValue,
    receiverValue,
    providerValue,
    loginUserRole,
  ]);

  return (
    <div>
      <PageWrapper>
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
            yearValue={yearValue}
            setYearValue={setYearValue}
            assessmentCycleValue={assessmentCycleValue}
            setAssessmentCycleValue={setAssessmentCycleValue}
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
            yearValue={yearValue}
            setYearValue={setYearValue}
            assessmentCycleValue={assessmentCycleValue}
            setAssessmentCycleValue={setAssessmentCycleValue}
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
