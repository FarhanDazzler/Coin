import React, { useEffect, useMemo, useState } from 'react';
import ControlActions from './ControlActions';
import { Loader } from '@mantine/core';
import ControlSection1 from './ControlSection1';
import ControlSection2, { hasFailDenominator, hasFailNumerator } from './ControlSection2';
import ControlSection3 from './ControlSection3';
import Button from '../../components/UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getSection3Questions, resetSection3 } from '../../redux/Questions/QuestionsAction';
import { useTranslation } from 'react-i18next';
import ControlSection from './ControlSection';
import cs from 'classnames';
import {
  get_historical_graph_dataSelector,
  get_KPI_Section2_dataSelector,
  getLatestDraftSelector,
  kpiResultSelector,
} from '../../redux/Assessments/AssessmentSelectors';
import { question3Selector } from '../../redux/Questions/QuestionsSelectors';
import Swal from 'sweetalert2';

const AssessmentFormRender = ({
  s1FailObj,
  questionsInfo,
  setShowMoreSection,
  ansSection1,
  setAnsSection1,
  showMoreSection,
  tableData = [],
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
  setIsModal,
  isReview,
  isOverride,
  setIsOverride,
  L1AndL2NoQuestionsAns,
  setL1AndL2NoQuestionsAns,
}) => {
  const Control_ID = activeData?.control_id;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const kpiResultData = useSelector(kpiResultSelector);
  const question3 = useSelector(question3Selector);
  const latestDraftData = useSelector(getLatestDraftSelector);
  const [startTableEdit, setIsStartTableEdit] = useState(false);
  // check useEffect if user select section 1 Terminating then this state true
  const [section1TerminatingLogicValue, setSection1TerminatingLogicValue] = React.useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const get_KPI_Section2_data = useSelector(get_KPI_Section2_dataSelector);
  const get_historical_graph_data = useSelector(get_historical_graph_dataSelector);
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
    setSection1TerminatingLogicValue(sectionTerminating);
  }, [ansSection3, ansSection1]);

  const checkL3Validation = useMemo(() => {
    if (ansSection3 && !(Object.keys(ansSection3).length > 0)) {
      return false;
    }
    // check section 3 yes select then show submit
    if (ansSection3?.L3) {
      return true;
    }

    // check user l1 and l2 no question but next both yes then this return true
    if (!!L1AndL2NoQuestionsAns.failingDue && !!L1AndL2NoQuestionsAns.reasonsForFailing) {
      return true;
    }

    // Check if user submit last no question then show submit btn
    if (!!showNoQuestionAns) {
      return true;
    }
  }, [showNoQuestionAns, L1AndL2NoQuestionsAns, ansSection3, ansSection3?.L3]);

  useEffect(() => {
    dispatch(getSection3Questions({ Level: 'L1', Control_ID: Control_ID }));
    dispatch(resetSection3()); // Reset section 3
  }, []);

  const handleValidation = (type) => () => {
    if (type === 'submit' && handleSubmit) {
      const findErrorTableRow = tableData?.find((row) => {
        if (!hasFailNumerator(row) && !hasFailDenominator(row)) {
          return false;
        }
        return true;
      });

      if (findErrorTableRow) {
        Swal.fire({
          title: 'Section2: KPI (Invalid)',
          text: 'Table Data invalid. Please verify every row since some row Numerator and Denominator value not valid.',
          icon: 'error',
        });
        return;
      }

      if (handleSubmit) handleSubmit();
    }
    if (type === 'draft' && handleSaveDraft) {
      if (handleSaveDraft) handleSaveDraft();
    }
  };

  const loader = useMemo(() => {
    return (
      questionsInfo.loading ||
      getMicsOpenActionPlanVal.loading ||
      actionPlanInfo?.loading ||
      latestDraftData.loading
    );
  }, [questionsInfo, getMicsOpenActionPlanVal, actionPlanInfo, latestDraftData]);

  const section3NoSelectErrorMessage = useMemo(() => {
    const s1NoSelect =
      Object.keys(ansSection3).includes('L1') &&
      !!Object.values(ansSection3?.L1)[0]?.includes('no');
    const s2NoSelect =
      Object.keys(ansSection3).includes('L2') &&
      !!Object.values(ansSection3?.L2)[0]?.includes('no');
    return showMoreSection && !s1FailObj && !isNotEscalationRequired && (s1NoSelect || s2NoSelect);
  }, [ansSection3, s1FailObj, isNotEscalationRequired, showNoQuestionAns, L1AndL2NoQuestionsAns]);

  const showSubmitButton = useMemo(() => {
    const loader =
      get_historical_graph_data.loading || get_KPI_Section2_data.loading || question3.loading;
    if (Object.keys(validationErrors)?.length > 0 || loader) return false;

    if (
      (!isModal && (terminating || checkL3Validation)) ||
      (s1FailObj && showMoreSection && !isModal) ||
      (isNotEscalationRequired && !isModal)
    ) {
      return true;
    }

    return false;
  }, [
    question3.loading,
    get_historical_graph_data,
    get_KPI_Section2_data,
    validationErrors,
    isModal,
    terminating,
    s1FailObj,
    showMoreSection,
    isNotEscalationRequired,
    checkL3Validation,
  ]);

  const loaderSection =
    get_historical_graph_data?.loading || get_KPI_Section2_data?.loading || question3?.loading;

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

      {loader ? (
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
                setAnsSection3={setAnsSection3}
              />
              {(showMoreSection || isNotEscalationRequired) && (
                <ControlSection2
                  tableData={tableData}
                  setTableData={setTableData}
                  controlId={controlId}
                  setStartEdit={setStartEdit}
                  isModal={isModal}
                  isReview={isReview}
                  startTableEdit={startTableEdit}
                  setIsStartTableEdit={setIsStartTableEdit}
                  validationErrors={validationErrors}
                  setValidationErrors={setValidationErrors}
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
                    L1AndL2NoQuestionsAns={L1AndL2NoQuestionsAns}
                    setL1AndL2NoQuestionsAns={setL1AndL2NoQuestionsAns}
                  />
                </>
              )}
              {!loaderSection && (
                <>
                  {showSubmitButton ? (
                    <>
                      {/* Section 1 Terminating then show error  */}
                      {section1TerminatingLogicValue && (
                        <div style={{ color: 'red', marginBottom: '10px' }}>
                          Based on above response, the control is assessed as failed because of
                          inadequate Documentation or inadequate frequency
                        </div>
                      )}
                      {section3NoSelectErrorMessage ? (
                        <div style={{ color: 'red', marginBottom: '10px' }}>
                          Based on above response, the control is assessed as failed because of{' '}
                          {Object.keys(ansSection3).includes('L1') &&
                          !!Object.values(ansSection3?.L1)[0]?.includes('no')
                            ? 'L1'
                            : Object.keys(ansSection3).includes('L2') &&
                              !!Object.values(ansSection3?.L2)[0]?.includes('no')
                            ? 'L2'
                            : ''}
                        </div>
                      ) : null}
                      {!kpiResultData.loading && (
                        <div style={{ paddingBottom: '100px' }}>
                          <Button
                            color="neutral"
                            className={cs('w-100', { ['isDisabledButton']: isDisabledButton })}
                            id="submit-button"
                            loading={loadingSubmit}
                            onClick={handleValidation('submit')}
                          >
                            {t('selfAssessment.assessmentForm.submitBtn')}
                          </Button>
                        </div>
                      )}
                    </>
                  ) : handleSaveDraft && !isOverride && !isReview ? (
                    <div className="save-draft-btn-wrapper">
                      <Button
                        onClick={handleValidation('draft')}
                        loading={loadingSubmit}
                        {...handleSaveDraftProps}
                      >
                        {t('selfAssessment.assessmentForm.saveDraftBtn')}
                      </Button>
                    </div>
                  ) : (
                    <div />
                  )}{' '}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AssessmentFormRender;
