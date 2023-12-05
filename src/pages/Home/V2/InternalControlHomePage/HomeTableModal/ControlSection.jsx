import React, { useState } from 'react';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import { useTranslation } from 'react-i18next';
import CustomTextarea from '../../../../../components/UI/CustomTextarea';
import DatePickers from '../../../../../components/UI/DatePickers';
import Button from '../../../../../components/UI/Button';

const ControlSection = ({ setShowControlSection, loadingSubmit, handleSubmit }) => {
  const { t } = useTranslation();

  const [step, setStep] = useState(1);

  const handleSave = () => {
    setShowControlSection(true);
  };

  const handleNo = () => {
    setStep(step + 1);
    setShowControlSection(false);
  };

  return (
    <div>
      <CollapseFrame title={t('selfAssessment.assessmentForm.section0_Standard')} active>
        <div className="mt-5">
          <div className="renderBlockWrapper">
            <CustomTextarea label="Issue Description: " name="IssueDescription" />
            <CustomTextarea
              formControlProps={{ style: { paddingTop: 20 } }}
              label="Resolution/Action Plan:: "
              name="actkonPlan"
            />

            <div className="pt-4 d-flex align-items-center">
              <DatePickers label="Original Due Date" />
              <div className="pl-5">
                <DatePickers label="Revised Due Date" />
              </div>
            </div>

            <div className="pt-5">
              <div className="d-flex justify-content-between">
                <Button color="neutral" style={{ minWidth: 'calc(100% - 190px)' }}>
                  ISSUE RESOLVED?
                </Button>
                <div className="d-flex">
                  <Button color="neutral" onClick={handleSave}>
                    Yes
                  </Button>
                  <div className="pl-5">
                    <Button color="neutral" onClick={handleNo}>
                      No
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {step > 1 && (
              <div className="pt-5">
                <div className="d-flex justify-content-between">
                  <Button color="neutral" style={{ minWidth: 'calc(100% - 190px)' }}>
                    Are you still the Owner of Action plan?
                  </Button>
                  <div className="d-flex">
                    <Button color="neutral" onClick={handleSave}>
                      Yes
                    </Button>
                    <div className="pl-5">
                      <Button color="neutral" onClick={handleNo}>
                        No
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step > 2 && (
              <div className="pt-5">
                <Button color="neutral" style={{ minWidth: '100%', textAlign: 'left' }}>
                  Provide details on what was the actions taken in the last 3 months and what are
                  the further action plan proposed. Also is there any change in Action plan? (Can
                  even provide Examples)
                </Button>
                <CustomTextarea name="IssueDescription" className="mt-3" />
              </div>
            )}

            {step > 2 && (
              <div className="pt-5">
                <div className="d-flex justify-content-between">
                  <Button color="neutral" style={{ minWidth: 'calc(100% - 190px)' }}>
                    Is escalation required?
                  </Button>
                  <div className="d-flex">
                    <Button color="neutral" onClick={handleSave}>
                      Yes
                    </Button>
                    <div className="pl-5">
                      <Button color="neutral" onClick={handleNo}>
                        No
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step > 3 && (
              <div className="pt-5">
                <div>
                  <Button
                    color="neutral"
                    style={{ minWidth: '100%' }}
                    loading={loadingSubmit}
                    onClick={handleSubmit}
                  >
                    {t('selfAssessment.assessmentForm.submitBtn')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CollapseFrame>
    </div>
  );
};

export default ControlSection;
