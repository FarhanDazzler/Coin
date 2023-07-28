import React from 'react';
import './AssessmentBankLandingPage.scss';
import { useHistory } from 'react-router-dom';
import PageWrapper from '../../components/wrappers/PageWrapper';
import Button from '../../components/UI/Button';
import { Group } from '@mantine/core';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
// Assessments Summary Table
import AssessmentsSummaryTable from './Table/AssessmentsSummaryTable';

import { addAssessmentSchedulingAndTriggeringSelector } from '../../redux/AssessmentBank/AssessmentBankSelectors';
import { useSelector } from 'react-redux';
import { DotSpinner } from '@uiball/loaders';

const AssessmentBankLandingPage = () => {
  const history = useHistory();

  const addAssessmentSchedulingAndTriggeringState = useSelector(
    addAssessmentSchedulingAndTriggeringSelector,
  );
  const handleSheduleSurvey = () => {
    history.push('/assessmentbank/schedule-survey');
  };

  return (
    <PageWrapper>
      {addAssessmentSchedulingAndTriggeringState.loading ? (
        <div className="loader-animation">
          <DotSpinner size={100} speed={0.9} color="#e3af32" />
          <p className="loader-Desc ml-3">
            Please wait while we are scheduling Assessments for you
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
                        Schedule Survey
                      </Button>
                    </Group>
                  </div>
                </div>
              </div>
              <AssessmentsSummaryTable />
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default AssessmentBankLandingPage;
