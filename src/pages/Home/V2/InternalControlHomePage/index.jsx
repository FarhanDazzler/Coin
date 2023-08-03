import React, { useEffect, useMemo, useState } from 'react';
import './homeStyles.scss';
import NumberWithText from './NumberWithText';
import { useMsal } from '@azure/msal-react';
import { useHistory, useLocation } from 'react-router-dom';
import HomeTableModal from './HomeTableModal';
import { useSelector } from 'react-redux';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import ProgressBar from './HomePageTable/ProgressBar/ProgressBar';
import InternalControlTable from '../../Tables/InternalControlTable/InternalControlTable';
import { getInternalControlDataSelector } from '../../../../redux/DashBoard/DashBoardSelectors';

const InternalControlHomePage = () => {
  const history = useHistory();
  const { state } = useLocation();
  const query = new URLSearchParams(history.location.search);
  const Control_ID = query.get('Control_ID');
  const selectedUserRole = localStorage.getItem('selected_Role');

  // multi choice user input State for filters button
  const [yearValue, setYearValue] = useState([]);
  const [assessmentCycleValue, setAssessmentCycleValue] = useState([]);
  const [zoneValue, setZoneValue] = useState([]);
  const [buValue, setBUValue] = useState([]);
  const [receiverValue, setReceiverValue] = useState([]);
  const [providerValue, setProviderValue] = useState([]);

  const userRole = localStorage.getItem('Roles');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const getControlOwnerData = useSelector(getInternalControlDataSelector);

  const getNumberOfItem = (array = [], itemName) => {
    return array?.filter((val) => val === itemName)?.length;
  };

  const statusInfo = useMemo(() => {
    if (
      !yearValue.length &&
      !assessmentCycleValue.length &&
      !zoneValue.length &&
      !buValue.length &&
      !receiverValue.length &&
      !providerValue.length
    ) {
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
        (yearValue?.length ? yearValue.includes(i.Year) : true) &&
        (assessmentCycleValue?.length ? assessmentCycleValue.includes(i.Assessment_Cycle) : true) &&
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
  }, [
    getControlOwnerData,
    userRole,
    yearValue,
    assessmentCycleValue,
    zoneValue,
    buValue,
    receiverValue,
    providerValue,
  ]);

  useEffect(() => {
    if (!userRole?.length || userRole === 'undefined') history.push('/not-authorized');
  }, [
    getControlOwnerData,
    userRole,
    yearValue,
    assessmentCycleValue,
    zoneValue,
    buValue,
    receiverValue,
    providerValue,
  ]);
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
                        <span className="yellow-text"> Not started : </span>
                        <span>
                          Contact Control Owners to complete assessments, and check fallbacks on
                          GRC.
                        </span>
                      </div>
                    }
                    subTitle="Not started"
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
                        <span>if owner has reassessed the already submitted assessment.</span>
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
        {Control_ID && <HomeTableModal isModal={true} activeData={state} />}
      </PageWrapper>
    </div>
  );
};

export default InternalControlHomePage;
