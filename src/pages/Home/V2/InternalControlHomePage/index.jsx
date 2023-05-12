import React, { useEffect, useState } from 'react';
import DashboardTable from './HomePageTable/HomePageTableComponent';
import './homeStyles.scss';
import NumberWithText from './NumberWithText';
import { useMsal } from '@azure/msal-react';
import { useHistory } from 'react-router-dom';
import HomeTableModal from './HomeTableModal';
import { useSelector } from 'react-redux';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import ProgressBar from './HomePageTable/ProgressBar/ProgressBar';
import { TABLE_ROES } from './HomePageTable/constant';
import InternalControlTable from '../../Tables/InternalControlTable/InternalControlTable';
import { getInternalControlDataSelector } from '../../../../redux/DashBoard/DashBoardSelectors';

const InternalControlHomePage = () => {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const Control_ID = query.get('Control_ID');
  const userRole = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const getControlOwnerData = useSelector(getInternalControlDataSelector);
  const [statusInfo, setStatusInfo] = useState({
    notStarted: 0,
    completed: 0,
    draft: 0,
    reAssessed: 0,
    completedRatio:0
  });

  const getNumberOfItem = (array = [], itemName) => {
    return array?.filter((val) => val === itemName)?.length;
  };

  useEffect(() => {
    if(!userRole) history.push("/not-authorized")
    const allstatus = getControlOwnerData?.data?.map((d) => {
      return d.Status;
    });
    const completedAssessment=getNumberOfItem(allstatus, 'Completed')
    setStatusInfo({
      notStarted: getNumberOfItem(allstatus, 'Not started'),
      completed:completedAssessment ,
      draft: getNumberOfItem(allstatus, 'Draft'),
      reAssessed: getNumberOfItem(allstatus, 'Incorrect Owner'),
      completedRatio:((completedAssessment/allstatus.length)*100)?.toFixed(0),
      total:allstatus?.length
    });
  }, [getControlOwnerData]);
  const { accounts } = useMsal();
  return (
    <div>
      <PageWrapper>
        <div className="container">
          <div className="row pt-5 align-items-center">
            <div className="col-lg-4">
              <h4 className="welcome-text">Welcome</h4>
              <h2 className="user-name-home yellow-gradient-text mb-2 text-capitalize">
                {accounts.length > 0 ? accounts[0].name.split('(').join(' (') : 'User Name'}
              </h2>
              {(loginRole || userRole) && <h3 className="user-role">{loginRole ?? userRole}</h3>}
            </div>
            <div className="col-lg-8">
                <div className="wrapper-info-grid">
              <div className="home-right-overviews h-100 d-flex align-items-center justify-content-center">
                  <ProgressBar value={statusInfo.completedRatio}/>
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
                          <span className="yellow-text"> Draft : </span>
                          <span>
                            Owner has started & saved the assessment as draft, however not
                            submitted.
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
        <InternalControlTable />
        {Control_ID && <HomeTableModal isModal={true} />}
      </PageWrapper>
    </div>
  );
};

export default InternalControlHomePage;
