import React, { useEffect } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Group } from '@mantine/core';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import Button from '../../../components/UI/Button';
import FunctionalLetterSummaryTable from './Functional/Table/FunctionalLetterSummaryTable';
import BULetterSummaryTable from './BU/Table/BULetterSummaryTable';
import { DotSpinner } from '@uiball/loaders';
import './SchedulingAndTriggeringLandingPage.scss';
import { rlAddFunctionalAssessmentDataSelector } from '../../../redux/REP_Letters/RL_SchedulingAndTriggering/RL_SchedulingAndTriggeringSelectors';

const SchedulingAndTriggering = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const rlAddFunctionalAssessmentDataState = useSelector(rlAddFunctionalAssessmentDataSelector);
  useEffect(() => {}, []);
  const handleSheduleSurvey = () => {
    if (localStorage.getItem('selected_module_Role') == 'BU') {
      history.push('/REP-Letters/scheduling-and-triggering/schedule-survey-bu');
    } else {
      history.push('/REP-Letters/scheduling-and-triggering/schedule-survey-functional');
    }
  };
  return (
    <PageWrapper>
      {rlAddFunctionalAssessmentDataState.loading ? (
        <div className="loader-animation">
          <DotSpinner size={100} speed={0.9} color="#e3af32" />
          <p className="loader-Desc ml-3">
            Please wait while we are scheduling Letter for you
          </p>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="mt-5">
                <div className="row">
                  <div className="col-12 col-lg-12">
                    <Group spacing="xs" className="actions-button-wrapper">
                      <Button
                        color="silver"
                        size="large"
                        startIcon={<MoreTimeIcon />}
                        onClick={handleSheduleSurvey}
                      >
                        Schedule Letter
                      </Button>
                    </Group>
                  </div>
                </div>
              </div>
              {localStorage.getItem('selected_module_Role') == 'BU' ? (
                <BULetterSummaryTable />
              ) : (
                <FunctionalLetterSummaryTable />
              )}
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default SchedulingAndTriggering;
