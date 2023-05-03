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
import FilterButtons from '../../../../components/FilterButtons';
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
  });

  const getNumberOfItem = (array=[], itemName) => {
    return array?.filter((val) => val === itemName)?.length;
  };

  useEffect(() => {
    const allstatus = getControlOwnerData?.data?.map((d) => {
      return d.Status;
    });
    setStatusInfo({
      notStarted: getNumberOfItem(allstatus, 'Not started'),
      completed: getNumberOfItem(allstatus, 'Completed'),
      draft: getNumberOfItem(allstatus, 'Draft'),
      reAssessed: getNumberOfItem(allstatus, 'Re-assessed'),
    });
    console.log('TABLE_ROES', allstatus);
  }, [getControlOwnerData]);
  const { accounts } = useMsal();
  return (
    <div>
      <PageWrapper>
        <div className="container">
          <div className="row pt-5 align-items-center">
            <div className="col-lg-4">
              <h4 className="welcome-text">Welcome</h4>
              <h2 className="user-name-home yellow-gradient-text mb-2">
                {accounts.length > 0 ? accounts[0].name.split('(').join(' (') : 'User Name'}
              </h2>
              {(loginRole || userRole) && <h3 className="user-role">{loginRole ?? userRole}</h3>}
            </div>
            <div className="col-lg-8">
              <div className="home-right-overview">
                <div className="wrapper-info-grid">
                  <div>
                    <div className="d-flex align-items-center mt-4">
                      <ProgressBar />
                      {/* <div className="ml-2">
                        <p className="text-white">1st Assessment Cycle</p>
                      <h2 className="yellow-gradient-text graph-value">60 %</h2>
                      </div> */}
                    </div>
                  </div>
                  <div>
                    <div className="right-number">
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
                            <span className="yellow-text"> Re-assessed : </span>
                            <span>if owner has reassessed the already submitted assessment.</span>
                          </div>
                        }
                        subTitle="Re-assessed"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InternalControlTable />
        {Control_ID && <HomeTableModal />}
      </PageWrapper>
    </div>
  );
};

export default InternalControlHomePage;
