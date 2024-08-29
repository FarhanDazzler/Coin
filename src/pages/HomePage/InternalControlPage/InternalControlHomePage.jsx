import React, { useEffect, useMemo, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import ProgressBar from './ProgressBar/ProgressBar';
import './homeStyles.scss';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import InternalControlTable from './InternalControlTable';
import { getInternalControlDataSelector } from '../../../redux/DashBoard/DashBoardSelectors';
import { ReactComponent as InfoIcon } from '../../../assets/images/InfoCircle.svg';

// TODO: import HomeTableModal model from refectored code
import AssessmentFormView from '../../AssessmentForm/AssessmentFormView';
import { stringToArray, useQuery } from '../../../hooks/useQuery';

const NumberWithText = ({ number, tooltip, subTitle }) => {
  return (
    <div className="d-flex justify-content-between bg-black mb-2 p-1 px-4 rounded-3">
      <div className="d-flex align-items-center">
        <Tooltip title={tooltip} arrow>
          <InfoIcon />
        </Tooltip>
        {subTitle}
      </div>
      <h3 className="largeNumber yellow-gradient-text mb-0">{number}</h3>
    </div>
  );
};

const InternalControlHomePage = () => {
  const history = useHistory();
  const { state } = useLocation();
  const query = new URLSearchParams(history.location.search);
  const Control_ID = query.get('Control_ID');
  const selectedUserRole = localStorage.getItem('selected_Role');
  const params = useQuery();

  const initValue = {
    zoneValue: params?.filterZone ? stringToArray(params?.filterZone) : [],
    buValue: params?.filterBU ? stringToArray(params?.filterBU) : [],
    providerValue: params?.filterProvider ? stringToArray(params?.filterProvider) : [],
    receiverValue: params?.filterReceiverOrg ? stringToArray(params?.filterReceiverOrg) : [],
    controlIdValue: params?.filterControlId ? stringToArray(params?.filterControlId) : [],
    statusOfAssessmentValue: params?.filterStatusOfAssessment
      ? stringToArray(params?.filterStatusOfAssessment)
      : [],
  };

  const [zoneValue, setZoneValue] = useState(initValue.zoneValue);
  const [buValue, setBUValue] = useState(initValue.buValue);
  const [receiverValue, setReceiverValue] = useState(initValue.receiverValue);
  const [providerValue, setProviderValue] = useState(initValue.providerValue);
  const [controlIdValue, setControlIdValue] = useState(initValue.controlIdValue);
  const [statusOfAssessmentValue, setStatusOfAssessmentValue] = useState(
    initValue.statusOfAssessmentValue,
  );

  const userRole = localStorage.getItem('Roles');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const getControlOwnerData = useSelector(getInternalControlDataSelector);

  const handleResetState = () => {
    setZoneValue([]);
    setBUValue([]);
    setReceiverValue([]);
    setProviderValue([]);
    setControlIdValue([]);
    setStatusOfAssessmentValue([]);
  };

  const getNumberOfItem = (array = [], itemName) => {
    return array?.filter((val) => val === itemName)?.length;
  };

  const statusInfo = useMemo(() => {
    if (!zoneValue.length && !buValue.length && !receiverValue.length && !providerValue.length) {
      const allstatus = getControlOwnerData?.data?.map((d) => {
        return d.Status;
      });
      const completedAssessment = getNumberOfItem(allstatus, 'Completed');
      return {
        notStarted: getNumberOfItem(allstatus, 'Not started'),
        completed: completedAssessment,
        draft: getNumberOfItem(allstatus, 'Drafted'),
        reAssessed: getNumberOfItem(allstatus, 'Incorrect Owner'),
        completedRatio: ((completedAssessment / allstatus.length) * 100)?.toFixed(0),
        total: allstatus?.length,
      };
      return;
    }
    const updateData = getControlOwnerData?.data?.filter((i) => {
      return (
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
        (buValue?.length ? buValue.includes(i.BU) : true) &&
        (receiverValue?.length ? receiverValue.includes(i.Receiver) : true) &&
        (providerValue?.length ? providerValue.includes(i.Provider) : true)
      );
    });
    const allstatusUpdateData = updateData?.map((d) => {
      return d.Status;
    });

    const completedAssessment = getNumberOfItem(allstatusUpdateData, 'Completed');
    return {
      notStarted: getNumberOfItem(allstatusUpdateData, 'Not started'),
      completed: completedAssessment,
      draft: getNumberOfItem(allstatusUpdateData, 'Drafted'),
      reAssessed: getNumberOfItem(allstatusUpdateData, 'Incorrect Owner'),
      completedRatio: ((completedAssessment / allstatusUpdateData.length) * 100)?.toFixed(0),
      total: allstatusUpdateData?.length,
    };
  }, [getControlOwnerData, userRole, zoneValue, buValue, receiverValue, providerValue]);

  useEffect(() => {
    // if (!userRole?.length || userRole === 'undefined') history.push('/not-authorized');
  }, [getControlOwnerData, userRole, zoneValue, buValue, receiverValue, providerValue]);
  const { accounts } = useMsal();
  return (
    <div>
      <PageWrapper>
        <div className="container-fluid">
          <div className="row pt-5 align-items-center">
            <div className="col-lg-4">
              <h4 className="welcome-text">Welcome</h4>
              <h2 className="user-name-home yellow-gradient-text mb-2 text-capitalize">
                {accounts.length > 0 ? accounts[0].name.split('(').join(' (') : 'User Name'}
              </h2>
              {(loginRole || selectedUserRole) && (
                <h3 className="user-role">{loginRole ?? selectedUserRole}</h3>
              )}
            </div>
            <div className="col-lg-8">
              <div className="wrapper-info-grid">
                <div className="home-right-overviews h-100 d-flex align-items-center justify-content-center">
                  <ProgressBar value={statusInfo.completedRatio} />
                </div>

                <div className="right-number home-right-overviews">
                  <NumberWithText
                    number={statusInfo.notStarted}
                    tooltip={
                      <div>
                        <span className="yellow-text"> Not Started : </span>
                        <span>
                          Contact Control Owners to complete assessments, and check fallbacks on
                          GRC.
                        </span>
                      </div>
                    }
                    subTitle="Not Started"
                  />

                  <NumberWithText
                    number={statusInfo.completed}
                    tooltip={
                      <div>
                        <span className="yellow-text"> Completed : </span>
                        <span>
                          Check if the control results are reflected correctly in scoring.
                        </span>
                      </div>
                    }
                    subTitle="Completed"
                  />

                  <NumberWithText
                    number={statusInfo.draft}
                    tooltip={
                      <div>
                        <span className="yellow-text"> Drafted : </span>
                        <span>
                          Owner has started & saved the assessment as draft, however not submitted.
                        </span>
                      </div>
                    }
                    subTitle="Draft"
                  />

                  <NumberWithText
                    number={statusInfo.reAssessed}
                    tooltip={
                      <div>
                        <span className="yellow-text"> Incorrect Owner : </span>
                        <span>Control owner indicated that (s)he is no longer the owner.</span>
                      </div>
                    }
                    subTitle="Incorrect Owner"
                  />
                  <NumberWithText
                    number={statusInfo.total}
                    tooltip={
                      <div>
                        <span className="yellow-text"> Total : </span>
                        <span>Total number of assessment.</span>
                      </div>
                    }
                    subTitle="Total"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <InternalControlTable
          zoneValue={zoneValue}
          setZoneValue={setZoneValue}
          buValue={buValue}
          setBUValue={setBUValue}
          receiverValue={receiverValue}
          setReceiverValue={setReceiverValue}
          providerValue={providerValue}
          setProviderValue={setProviderValue}
          statusOfAssessmentValue={statusOfAssessmentValue}
          setStatusOfAssessmentValue={setStatusOfAssessmentValue}
          controlIdValue={controlIdValue}
          setControlIdValue={setControlIdValue}
          handleResetState={handleResetState}
        />
        {Control_ID && <AssessmentFormView isModal={true} activeData={state} />}
        {/*<SummaryView />*/}
      </PageWrapper>
    </div>
  );
};

export default InternalControlHomePage;
