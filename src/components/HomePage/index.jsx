import React from 'react';
import DashboardTable from './HomePageTable/HomePageTableComponent';
import PageWrapper from '../wrappers/PageWrapper';
import './homeStyles.scss';
import NumberWithText from './NumberWithText';
import { useMsal } from '@azure/msal-react';
import { useHistory } from 'react-router-dom';
import HomeTableModal from './HomeTableModal';
import ProgressBar from '../HomePageTable/ProgressBar/ProgressBar';
import FilterButtons from '../FilterButtons';

const HomePage = () => {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const Control_ID = query.get('Control_ID');

  const { accounts } = useMsal();
  return (
    <div>
      <PageWrapper>
        <div className="container">
          <div className="row pt-5 align-items-center">
            <div className="col-lg-4">
              <h4 className="welcome-text">Welcome</h4>
              <h2 className="user-name-home yellow-gradient-text">
                {accounts.length > 0 ? accounts[0].name.split('(').join(' (') : 'User Name'}
              </h2>
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
                        number={61}
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
                        number={12292}
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
                        number={9863}
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
                        number={11}
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
        {/* <div className="container">
          <div className="row mt-5">
            <div className="col-12 mt-5">
              <FilterHomePageTable />
            </div>
          </div>
        </div> */}
        <FilterButtons />
        <DashboardTable />
        {Control_ID && <HomeTableModal />}
      </PageWrapper>
    </div>
  );
};

export default HomePage;
