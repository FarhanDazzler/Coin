import React, { useEffect, useMemo, useState } from 'react';
import ControlActions from './ControlActions';
import { Loader } from '@mantine/core';
import ControlSection1 from './ControlSection1';
import ControlSection2 from './ControlSection2';
import ControlSection3 from './ControlSection3';
import Button from '../../components/UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { resetSection3 } from '../../redux/Questions/QuestionsAction';
import { useTranslation } from 'react-i18next';
import ControlSection from './ControlSection';
import cs from 'classnames';
import { kpiResultSelector } from '../../redux/Assessments/AssessmentSelectors';

const AssessmentFormRender = ({
  s1FailObj,
  questionsInfo,
  setShowMoreSection,
  ansSection1,
  setAnsSection1,
  showMoreSection,
  tableData,
  setTableData,
  setTerminating,
  ansSection3 = {},
  setAnsSection3,
  showNoQuestionAns,
  setShowNoQuestionAns,
  terminating,
  handleSubmit,
  controlId,
  setStartEdit,
  handleSaveDraft,
  handleSaveDraftProps = {},
  loadingSubmit,
  isModal = false,
  activeData = {},
  language,
  getMicsOpenActionPlanVal,
  actionPlanInfo,
  setActionPlanInfo,
  loadingLevel,
  setLoadingLevel,
  loadingRef,
  setIsModal,
  isReview,
  isOverride,
  setIsOverride,
  L1AndL2NoQuestionsAns,
  setL1AndL2NoQuestionsAns,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const kpiResultData = useSelector(kpiResultSelector);
  // check useEffect if user select section 1 Terminating then this state true
  const [section1TerminatingLogicValue, setSection1TerminatingLogicValue] = React.useState(false);

  // If user select any no ans in section 3 then this var true
  const isSection3Failed = Object.keys(ansSection3)?.find((i) => {
    const value = ansSection3[i] && Object.values(ansSection3[i]);
    if (value?.length > 0) return value[0]?.includes('no');
  });
  const isNotEscalationRequired =
    actionPlanInfo.issueResolved === 'no' && !!actionPlanInfo.isEscalationRequired;
  const [showControlSection, setShowControlSection] = useState(false);

  const isDisabledButton = useMemo(() => {
    if (isNotEscalationRequired) {
      return !(
        actionPlanInfo.isEscalationRequired &&
        actionPlanInfo.ownerAction &&
        actionPlanInfo.detailsInfo
      );
    }
    return false;
  }, [actionPlanInfo]);

  useEffect(() => {
    if (JSON.stringify(actionPlanInfo) === JSON.stringify({})) return setShowControlSection(true);
    if (!!actionPlanInfo?.isEscalationRequired) return setShowControlSection(true);
    if (actionPlanInfo?.issueResolved === 'no') return setShowControlSection(false);
    setShowControlSection(!!actionPlanInfo?.issueResolved);
  }, [actionPlanInfo]);

  // Here condition foe section Terminating or not.
  // Check if user select question 6 'No' option and question 5 this 2 option selected then section 1 is terminated
  useEffect(() => {
    let sectionTerminating = false;
    if (Object.keys(ansSection3).length !== 0) {
      ansSection1.forEach((data) => {
        if (data.q_id == '6') {
          data.options.forEach((option) => {
            if (data.value === option.value) {
              if (option.label == 'No') {
                sectionTerminating = true;
                // setSection1TerminatingLogicValue(true);
              }
            }
          });
        }

        if (data.q_id == '5') {
          data.options.forEach((option) => {
            if (data.value === option.value) {
              if (
                option.label == 'Yes - In e-mail box / on my personal laptop' ||
                option.label == 'No - Evidence of Control Execution is not Stored'
              ) {
                sectionTerminating = true;
                // setSection1TerminatingLogicValue(true);
              }
            }
          });
        }
      });
    }
    setSection1TerminatingLogicValue(sectionTerminating);
  }, [ansSection3]);

  useEffect(() => {
    dispatch(resetSection3()); // Reset section 3
  }, []);

  return (
    <div className="modal-form-body">
      <ControlActions
        isReview={isReview}
        activeData={activeData}
        setIsModal={setIsModal}
        isModal={isModal}
        isOverride={isOverride}
        setIsOverride={setIsOverride}
      />

      {questionsInfo.loading || getMicsOpenActionPlanVal.loading || actionPlanInfo?.loading ? (
        <div className="d-flex w-100 align-items-center justify-content-center py-5 my-5">
          <Loader color="#d3a306" />
        </div>
      ) : (
        <div className="p-5">
          {!!actionPlanInfo?.Action_Plan && (
            <ControlSection
              setShowControlSection={setShowControlSection}
              info={actionPlanInfo}
              setInfo={setActionPlanInfo}
              isModal={isModal}
            />
          )}

          {showControlSection && (
            <>
              <ControlSection1
                setTerminating={setTerminating}
                setShowMoreSection={setShowMoreSection}
                ans={ansSection1}
                setAns={setAnsSection1}
                setStartEdit={setStartEdit}
                isModal={!isModal || isOverride}
                language={language}
                isDisabled={isNotEscalationRequired}
              />
              {(showMoreSection || isNotEscalationRequired) && (
                <ControlSection2
                  tableData={tableData}
                  setTableData={setTableData}
                  controlId={controlId}
                  setStartEdit={setStartEdit}
                  isModal={isModal}
                  isReview={isReview}
                />
              )}
              {showMoreSection && !s1FailObj && !isNotEscalationRequired && (
                <>
                  <ControlSection3
                    activeData={activeData}
                    setTerminating={setTerminating}
                    ans={ansSection3}
                    setAns={setAnsSection3}
                    showNoQuestionAns={showNoQuestionAns}
                    setShowNoQuestionAns={setShowNoQuestionAns}
                    setStartEdit={setStartEdit}
                    isModal={!isModal}
                    loadingLevel={loadingLevel}
                    setLoadingLevel={setLoadingLevel}
                    loadingRef={loadingRef}
                    L1AndL2NoQuestionsAns={L1AndL2NoQuestionsAns}
                    setL1AndL2NoQuestionsAns={setL1AndL2NoQuestionsAns}
                  />
                </>
              )}
              {(!isModal && terminating) ||
              (s1FailObj && showMoreSection && !isModal) ||
              (isNotEscalationRequired && !isModal) ? (
                <>
                  {(section1TerminatingLogicValue || !!isSection3Failed) &&
                  showMoreSection &&
                  !s1FailObj &&
                  !isNotEscalationRequired ? (
                    <div style={{ color: 'red', marginBottom: '10px' }}>
                      Based on above response, the control is assessed as failed because of{' '}
                      {Object.keys(ansSection3).includes('L1') &&
                      !!Object.values(ansSection3?.L1)[0].includes('no')
                        ? 'L1'
                        : Object.keys(ansSection3).includes('L2')
                        ? 'L2'
                        : ''}{' '}
                      {'  '}
                      {section1TerminatingLogicValue &&
                        Object.keys(ansSection3).length !== 0 &&
                        Object.keys(ansSection3).length !== 3 &&
                        '/'}
                      {section1TerminatingLogicValue &&
                        ' inadequate Documentation or inadequate frequency'}
                    </div>
                  ) : null}
                  {!kpiResultData.loading && (
                    <Button
                      color="neutral"
                      className={cs('w-100', { ['isDisabledButton']: isDisabledButton })}
                      id="submit-button"
                      loading={loadingSubmit}
                      onClick={handleSubmit}
                    >
                      {t('selfAssessment.assessmentForm.submitBtn')}
                    </Button>
                  )}
                </>
              ) : handleSaveDraft && !isOverride && !isReview ? (
                <div className="save-draft-btn-wrapper">
                  <Button onClick={handleSaveDraft} {...handleSaveDraftProps}>
                    {t('selfAssessment.assessmentForm.saveDraftBtn')}
                  </Button>
                </div>
              ) : (
                <div />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AssessmentFormRender;
