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
  isModal,
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
    setStep(step + 2);
    setInfo({ ...info, step: step + 2 });
    setShowControlSection(false);
  };

  //Set textarea value
  useEffect(() => {
    const Action_Plan_Dom = document.getElementById('Action_Plan');
    if (Action_Plan_Dom) {
      Action_Plan_Dom.innerHTML = info.Action_Plan;
    }
  }, [info.Action_Plan]);
  //Set textarea value
  useEffect(() => {
    const Issue_Description_Dom = document.getElementById('Issue_Description');
    if (Issue_Description_Dom) {
      Issue_Description_Dom.innerHTML = info.Action_Plan;
    }
  }, [info.Issue_Description]);
  //Set textarea value
  useEffect(() => {
    const detailsInfoDom = document.getElementById('detailsInfo');
    if (detailsInfoDom) {
      detailsInfoDom.innerHTML = info.detailsInfo;
    }
  }, [info.Issue_Description]);

  return (
    <div>
      <CollapseFrame title={t('selfAssessment.assessmentForm.section0_Standard')} active>
        <div className="mt-5">
          <div className="renderBlockWrapper">
            <CustomTextarea
              id="Issue_Description"
              readOnly
              label="Issue Description: "
              name="IssueDescription"
            >
              {info.Issue_Description}
            </CustomTextarea>
            <CustomTextarea
              formControlProps={{ style: { paddingTop: 20 } }}
              label="Resolution/Action Plan: "
              name="actkonPlan"
              readOnly
              id="Action_Plan"
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
                <div
                  className="ActionPlanQuestionSection"
                  style={{ minWidth: 'calc(100% - 190px)' }}
                >
                  Issue resolved?
                </div>
                <div className="d-flex">
                  <Button
                    className={cs({ ['active-btn']: info.issueResolved === 'yes' })}
                    style={{ height: '100%' }}
                    variant="outlined"
                    disabled={isModal}
                    onClick={() => {
                      handleSave();
                      setStep(1);
                      setInfo({ ...info, issueResolved: 'yes' });
                    }}
                  >
                    Yes
                  </Button>
                  <div className="pl-5">
                    <Button
                      className={cs({ ['active-btn']: info.issueResolved === 'no' })}
                      disabled={isModal}
                      style={{ height: '100%' }}
                      variant="outlined"
                      onClick={() => {
                        handleNo();
                        setInfo({ ...info, issueResolved: 'no', step: 3 });
                      }}
                    >
                      No
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {step > 1 && (
              <div className="pt-5">
                <div className="d-flex justify-content-between">
                  <div
                    className="ActionPlanQuestionSection"
                    style={{ minWidth: 'calc(100% - 190px)' }}
                  >
                    Are you still the Owner of Action ?
                  </div>
                  <div className="d-flex">
                    <Button
                      className={cs({ ['active-btn']: info.ownerAction === 'yes' })}
                      style={{ height: '100%' }}
                      disabled={isModal}
                      variant="outlined"
                      onClick={() => {
                        setInfo({ ...info, ownerAction: 'yes' });
                      }}
                    >
                      Yes
                    </Button>
                    <div className="pl-5">
                      <Button
                        className={cs({ ['active-btn']: info.ownerAction === 'no' })}
                        style={{ height: '100%' }}
                        disabled={isModal}
                        variant="outlined"
                        onClick={() => {
                          setInfo({ ...info, ownerAction: 'no' });
                        }}
                      >
                        No
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step > 2 && (
              <div className="pt-5">
                <div
                  className="ActionPlanQuestionSection"
                  style={{ minWidth: '100%', textAlign: 'left' }}
                >
                  Provide details on what was the actions taken in the last 3 months and what are
                  the further action plan proposed. Also is there any change in Action plan?
                  (Mandatory)
                </div>
                <CustomTextarea
                  name="detailsInfo"
                  className="mt-3"
                  onChange={({ target: { value } }) => {
                    setInfo({ ...info, detailsInfo: value });
                  }}
                  id="detailsInfo"
                  readOnly={isModal}
                >
                  {info.detailsInfo || ''}
                </CustomTextarea>
              </div>
            )}

            {step > 2 && (
              <div className="pt-5">
                <div className="d-flex justify-content-between">
                  <div
                    className="ActionPlanQuestionSection"
                    style={{ minWidth: 'calc(100% - 190px)' }}
                  >
                    Is escalation required?
                  </div>
                  <div className="d-flex">
                    <Button
                      className={cs({ ['active-btn']: info.isEscalationRequired === 'yes' })}
                      //color="silver"
                      style={{ height: '100%' }}
                      disabled={isModal}
                      variant="outlined"
                      onClick={() => {
                        handleSave();
                        setInfo({ ...info, isEscalationRequired: 'yes' });
                      }}
                    >
                      Yes
                    </Button>
                    <div className="pl-5">
                      <Button
                        className={cs({ ['active-btn']: info.isEscalationRequired === 'no' })}
                        style={{ height: '100%' }}
                        disabled={isModal}
                        variant="outlined"
                        onClick={() => {
                          handleSave();
                          setInfo({ ...info, isEscalationRequired: 'no' });
                        }}
                      >
                        No
                      </Button>
                    </div>
                  </div>
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
