import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Group } from '@mantine/core';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import './AssessmentBankLandingPage.scss';
import PageWrapper from '../../components/wrappers/PageWrapper';
import Button from '../../components/UI/Button';
import { DotSpinner } from '@uiball/loaders';
// Assessments Summary Table
import AssessmentsSummaryTable from './Table/AssessmentsSummaryTable';
import { addAssessmentSchedulingAndTriggeringSelector } from '../../redux/AssessmentBank/AssessmentBankSelectors';
import ProductFeedback from '../../components/NPSFeedbackModule/ProductFeedback/ProductFeedback';

const AssessmentBankLandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { instance, accounts, inProgress } = useMsal();
  const [opened, setOpened] = useState(true);

  const addAssessmentSchedulingAndTriggeringState = useSelector(
    addAssessmentSchedulingAndTriggeringSelector,
  );

  const handleSheduleSurvey = () => {
    history.push('/assessmentbank/schedule-survey');
  };

  useEffect(() => {
    //console.log('success @@@@@@');
    //console.log(addAssessmentSchedulingAndTriggeringState.success, '@@@@@@');
    if (addAssessmentSchedulingAndTriggeringState.success) {
      // Delay by 1 second (1000 milliseconds)
      const timeoutId = setTimeout(() => {
        setOpened(true);
      }, 2500);

      // Clean up the timeout when the component unmounts or when the effect re-runs
      return () => clearTimeout(timeoutId);
    }
  }, [addAssessmentSchedulingAndTriggeringState]);

  return (
    <PageWrapper>
      <ProductFeedback
        env={process.env.REACT_APP_STAGE}
        apiKey={''}
        token={localStorage.getItem('nps-auth-token')}
        feedbackMetadata={{
          Activity: 'IC has scheduled a survey',
          Created_By: {
            Email: accounts[0]?.username,
            name: accounts[0]?.name ? accounts[0].name : '',
          },
        }}
        productId={process.env.REACT_APP_NPS_PRODUCT_ID}
        productActivityId="nps_score_provided_IC"
        modalOpened={opened}
        setModalOpened={setOpened}
      />
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
