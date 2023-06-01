import React, { useState } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../AssessmentBankLandingPage.scss';
import './styles.scss';
import Page1 from './Page1';
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
              <h4 className="AssessmentBank-inputPage-title">Schedule Assessment</h4>
              <div className="AssessmentBankInnerBoxWrapper">
                <div className="step-header d-flex justify-content-between">
                  <p className={step === 1 && 'active'}>
                    Details&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p className={step === 2 && 'active'}>Select Provider Organization</p>
                  <p className={step === 3 && 'active'}>Review & Confirm</p>
                </div>
                <div className="progress"></div>

                {step === 1 && (
                  <div className="holder">
                    <Page1 handleNext={handleNext} />
                  </div>
                )}
                {step === 2 && (
                  <div className="holder">
                    <Page3 handleNext={handleNext} setStep={setStep} />
                  </div>
                )}
                {step === 3 && (
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
