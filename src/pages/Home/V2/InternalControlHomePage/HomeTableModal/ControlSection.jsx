import React, { useEffect, useState } from 'react';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import { useTranslation } from 'react-i18next';
import CustomTextarea from '../../../../../components/UI/CustomTextarea';
import DatePickers from '../../../../../components/UI/DatePickers';
import Button from '../../../../../components/UI/Button';
import dayjs from 'dayjs';
import cs from 'classnames';

const ControlSection = ({
  setShowControlSection,
  loadingSubmit,
  handleSubmit,
  info = {},
  setInfo,
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  const handleSave = () => {
    setShowControlSection(true);
  };

  useEffect(() => {
    if (info.step) setStep(info.step);
  }, [info.step]);
  const handleNo = () => {
    setStep(step + 1);
    setInfo({ ...info, step: step + 1 });
    setShowControlSection(false);
  };

  return (
    <div>
      <CollapseFrame title={t('selfAssessment.assessmentForm.section0_Standard')} active>
        <div className="mt-5">
          <div className="renderBlockWrapper">
            <CustomTextarea readOnly label="Issue Description: " name="IssueDescription">
              {info.Issue_Description}
            </CustomTextarea>
            <CustomTextarea
              formControlProps={{ style: { paddingTop: 20 } }}
              label="Resolution/Action Plan:: "
              name="actkonPlan"
              readOnly
            >
              {info.Action_Plan}
            </CustomTextarea>

            <div className="pt-4 d-flex align-items-center date-white-border">
              <DatePickers
                readOnly
                label="Original Due Date"
                value={dayjs(info.Original_Due_Date)}
              />
              <div className="pl-5">
                <DatePickers
                  readOnly
                  value={dayjs(info.Revised_Due_Date)}
                  className="date-white-border"
                  label="Revised Due Date"
                />
              </div>
            </div>

            <div className="pt-5">
              <div className="d-flex justify-content-between">
                <Button color="neutral" style={{ minWidth: 'calc(100% - 190px)' }}>
                  ISSUE RESOLVED?
                </Button>
                <div className="d-flex">
                  <Button
                    color="neutral"
                    onClick={() => {
                      handleSave();
                      setStep(1);
                    }}
                  >
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
                    <Button
                      color="neutral"
                      onClick={() => {
                        handleSave();
                        setStep(2);
                      }}
                      className={cs('')}
                    >
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
                <CustomTextarea
                  name="detailsInfo"
                  className="mt-3"
                  onChange={({ target: { value } }) => {
                    setInfo({ ...info, detailsInfo: value });
                  }}
                >
                  {info.detailsInfo}
                </CustomTextarea>
              </div>
            )}

            {step > 2 && (
              <div className="pt-5">
                <div className="d-flex justify-content-between">
                  <Button color="neutral" style={{ minWidth: 'calc(100% - 190px)' }}>
                    Is escalation required?
                  </Button>
                  <div className="d-flex">
                    <Button
                      color="neutral"
                      onClick={() => {
                        handleSave();
                        setStep(3);
                      }}
                    >
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
