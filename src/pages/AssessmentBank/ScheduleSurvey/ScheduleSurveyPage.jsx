import React, { useState } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../AssessmentBankLandingPage.scss';
import Button from '../../MDM/MDM_Tab_Buttons/Button';
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
              <div className="step-header d-flex justify-content-between">
                <p className={step === 1 && 'active'}>Details</p>
                <p className={step === 2 && 'active'}>Select Provider Organization</p>
                <p className={step === 3 && 'active'}>Select Object</p>
                <p className={step === 4 && 'active'}>Review & Confirm</p>
              </div>
              <div className="progress"></div>
              {step === 1 && (
                <div className="holder">
                  <p>1</p>
                  <div className="t-a-r btns schedule-survey-btn">
                    <Button color="neutral" className="ml-4" onClick={''}>
                      Cancel
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button color="neutral" className="ml-4" onClick={() => handleNext()}>
                      Next {'>'}
                    </Button>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="holder">
                  <p>2</p>
                  <div className="t-a-r btns schedule-survey-btn">
                    <Button variant="subtle">Cancel</Button>
                    <Button
                      color="neutral"
                      className="ml-4"
                      onClick={() => {
                        setStep(1);
                      }}
                    >
                      {'<'} Previous
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button color="neutral" className="ml-4" onClick={() => handleNext()}>
                      Next {'>'}
                    </Button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="holder">
                  <p>3</p>
                  <div className="t-a-c schedule-survey-btn">
                    <Button variant="subtle">Cancel</Button>
                    <Button
                      color="neutral"
                      className="ml-4"
                      onClick={() => {
                        setStep(2);
                      }}
                    >
                      {'<'} Previous
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button color="neutral" className="ml-4" onClick={() => handleNext()}>
                      Next {'>'}
                    </Button>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="holder">
                  <p>4</p>
                  <div className="t-a-c schedule-survey-btn">
                    <Button variant="subtle">Cancel</Button>
                    <Button
                      color="neutral"
                      className="ml-4"
                      onClick={() => {
                        setStep(3);
                      }}
                    >
                      {'<'} Previous
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button color="neutral" className="ml-4" onClick={''}>
                      Confirm
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ScheduleSurveyPage;
