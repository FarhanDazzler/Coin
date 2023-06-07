import React from 'react';
import './AssessmentBankLandingPage.scss';
import { useHistory } from 'react-router-dom';
import PageWrapper from '../../components/wrappers/PageWrapper';
import Button from '../../components/UI/Button';
import { Group } from '@mantine/core';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
// Assessments Summary Table
import AssessmentsSummaryTable from './Table/AssessmentsSummaryTable';

const AssessmentBankLandingPage = () => {
  const history = useHistory();
  const handleSheduleSurvey = () => {
    history.push('/assessmentbank/schedule-survey');
  };
  return (
    <PageWrapper>
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
    </PageWrapper>
  );
};

export default AssessmentBankLandingPage;
