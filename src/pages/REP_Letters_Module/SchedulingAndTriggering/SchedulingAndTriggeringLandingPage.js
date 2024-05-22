import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Group } from '@mantine/core';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import Button from '../../../components/UI/Button';
import FunctionalLetterSummaryTable from './Functional/Table/FunctionalLetterSummaryTable';
import { DotSpinner } from '@uiball/loaders';
import './SchedulingAndTriggeringLandingPage.scss';
import { ProductFeedback } from '@abi-ds-beerblocs/product-feedback-module';
import BuSchedulingAndTriggeringLandingPage from './BU/BuSchedulingAndTriggeringLandingPage';
import {
  rlAddFunctionalAssessmentDataSelector,
  rlAddBuLetterDataSelector,
} from '../../../redux/REP_Letters/RL_SchedulingAndTriggering/RL_SchedulingAndTriggeringSelectors';

const SchedulingAndTriggering = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { instance, accounts, inProgress } = useMsal();
  const [opened, setOpened] = useState(false);

  const rlAddFunctionalAssessmentDataState = useSelector(rlAddFunctionalAssessmentDataSelector);
  const rlAddBuLetterDataState = useSelector(rlAddBuLetterDataSelector);

  useEffect(() => {
    if (rlAddFunctionalAssessmentDataState.success || rlAddBuLetterDataState.success) {
      // Delay by 1 second (1000 milliseconds)
      const timeoutId = setTimeout(() => {
        setOpened(true);
      }, 2500);

      // Clean up the timeout when the component unmounts or when the effect re-runs
      return () => clearTimeout(timeoutId);
    }
  }, [rlAddFunctionalAssessmentDataState, rlAddBuLetterDataState]);

  const handleSheduleSurvey = () => {
    if (localStorage.getItem('selected_module_Role') == 'BU Representation Letter') {
      history.push('/REP-Letters/scheduling-and-triggering/schedule-survey-bu');
    } else {
      history.push('/REP-Letters/scheduling-and-triggering/schedule-survey-functional');
    }
  };

  return (
    <PageWrapper>
      {opened && (
        <ProductFeedback
          env={process.env.REACT_APP_STAGE}
          apiKey={''}
          token={localStorage.getItem('nps-auth-token')}
          feedbackMetadata={{
            Activity: 'IC has scheduled a Rep letter survey',
            Rep_letter:
              localStorage.getItem('selected_module_Role') == 'BU Representation Letter'
                ? 'BU Letter'
                : 'Functional Letter',
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
      )}
      {rlAddFunctionalAssessmentDataState.loading || rlAddBuLetterDataState.loading ? (
        <div className="loader-animation">
          <DotSpinner size={100} speed={0.9} color="#e3af32" />
          <p className="loader-Desc ml-3">Please wait while we are scheduling Letter for you</p>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {localStorage.getItem('selected_module_Role') == 'BU Representation Letter' ? (
                <BuSchedulingAndTriggeringLandingPage />
              ) : (
                <>
                  <div className="mt-5">
                    {localStorage.getItem('selected_Role') == 'Global Persona' && (
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
                    )}
                  </div>
                  <FunctionalLetterSummaryTable />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default SchedulingAndTriggering;
