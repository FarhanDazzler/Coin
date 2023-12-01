import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import './BuSchedulingAndTriggeringLandingPage.scss';
import Button from '../../../../components/UI/Button';
import { ArrowNarrowRight } from 'tabler-icons-react';
import { useHistory, useLocation } from 'react-router-dom';

const BuSchedulingAndTriggeringLandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  useEffect(() => {}, []);
  // Code for BU and Zone
  const handleScheduleLetter = (modalType) => {
    if (modalType === 'BU') {
      history.push('/REP-Letters/scheduling-and-triggering/schedule-survey-bu');
    } else if (modalType === 'Zone') {
      history.push('/REP-Letters/scheduling-and-triggering/schedule-survey-zone');
    }
  };

  const handleBuModify = (module) => {
    if (module === 'BU') {
      history.push('/REP-Letters/scheduling-and-triggering/bu-letter-summary-details');
    } else if (module === 'Zone') {
      history.push('/REP-Letters/scheduling-and-triggering/zone-letter-summary-details');
    }
  };
  const handleFunctionalModify = () => {
    history.push('/REP-Letters/questionbank/Function-modify');
  };
  return (
    <div className="container py-5">
      <div className="RlQuestionBankHeader">
        <h3>Scheduling And Triggering</h3>
      </div>
      <div className="row">
        {localStorage.getItem('selected_Role') == 'Global Persona' && (
          <div className="col-lg-5 py-4 mr-2 RlQuestionBankBoxWrapper">
            <div id="admin-panel" className="content">
              <div className="wrapper">
                <div className="RlQuestionBankHeader">
                  <h3>Zone</h3>
                  <p>Choose a sub-category to proceed with the necessary action.</p>
                </div>
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowNarrowRight />}
                  onClick={() => handleScheduleLetter('Zone')}
                >
                  <span className="text-white">Schedule Letter</span>
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowNarrowRight />}
                  onClick={() => handleBuModify('Zone')}
                >
                  <span className="text-white">Scheduled Data</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="col-lg-5 py-4 RlQuestionBankBoxWrapper">
          <div id="admin-panel" className="content">
            <div className="wrapper">
              <div className="RlQuestionBankHeader">
                <h3>BU</h3>
                <p>Choose a sub-category to proceed with the necessary action.</p>
              </div>
              {localStorage.getItem('selected_Role') == 'Global Persona' && (
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowNarrowRight />}
                  onClick={() => handleScheduleLetter('BU')}
                >
                  <span className="text-white">Schedule Letter</span>
                </Button>
              )}
              <Button
                variant="outlined"
                size="large"
                endIcon={<ArrowNarrowRight />}
                onClick={() => handleBuModify('BU')}
              >
                <span className="text-white">Scheduled Data</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuSchedulingAndTriggeringLandingPage;
