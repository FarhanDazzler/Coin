import React, { useState } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../AssessmentBankLandingPage.scss';
import './styles.scss';
import { Divider, Box } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Alert, Form } from 'react-bootstrap';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';

const ScheduleSurveyPage = () => {
  const [step, setStep] = useState(1);
  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <PageWrapper>
      <div className="container py-5">
        <div className="col-lg-12 py-4 AssessmentBankBoxWrapper">
          <div id="schedule-survey" className="content">
            <div className="wrapper">
              <div className="AssessmentBankInnerBoxWrapper">
                <div className="step-header d-flex justify-content-between">
                  <p className={step === 1 && 'active'}>Details</p>
                  <p className={step === 2 && 'active'}>Select Provider Organization</p>
                  <p className={step === 3 && 'active'}>Select Object</p>
                  <p className={step === 4 && 'active'}>Review & Confirm</p>
                </div>
                <div className="progress"></div>

                <Divider
                  className="divider top-divider"
                  size="md"
                  my="xs"
                  labelPosition="center"
                  label={
                    <>
                      <IconSearch size={16} />
                      <Box ml={5}>
                        <Form.Label>Input Field</Form.Label>
                      </Box>
                    </>
                  }
                />
                {step === 1 && (
                  <div className="holder">
                    <Page1 handleNext={handleNext} />
                  </div>
                )}
                {step === 2 && (
                  <div className="holder">
                    <Page2 handleNext={handleNext} setStep={setStep} />
                  </div>
                )}
                {step === 3 && (
                  <div className="holder">
                    <Page3 handleNext={handleNext} setStep={setStep} />
                  </div>
                )}
                {step === 4 && (
                  <div className="holder">
                    <Page4 handleNext={handleNext} setStep={setStep} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ScheduleSurveyPage;
