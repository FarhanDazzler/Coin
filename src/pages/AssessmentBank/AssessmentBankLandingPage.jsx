import React, { useState } from 'react';
import CustomModal from '../../components/UI/CustomModal';
import './AssessmentBankLandingPage.scss';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import PageWrapper from '../../components/wrappers/PageWrapper';
import AssessmentbankTable from '../../components/Assessmentbank/AssessmentbankTable';
import AssessmentBankFilterButtons from '../../components/Assessmentbank/Filter/AssessmentBankFilterButtons';
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
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="container mt-5">
              <div className="row">
                <div className="col col-lg-12">
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
