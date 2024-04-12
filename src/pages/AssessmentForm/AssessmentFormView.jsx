import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './assessmentFormStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  addAssessmentAns,
  addOrUpdateDraft,
  getAssessmentAns,
  getAssessmentSection2Ans,
  getLatestDraft,
  getQuestions,
  clearAssessmentResponse,
  clearLatestDraftResponse,
  updateLastAccess,
  getMicsOpenActionPlan,
  resetBlockAssessment,
} from '../../redux/Assessments/AssessmentAction';
import {
  addOrEditUpdateDraftSelector,
  getLatestDraftSelector,
  getMicsOpenActionPlanSelector,
  getQuestionsSelector,
  getResponseSelector,
  kpiResultSelector,
} from '../../redux/Assessments/AssessmentSelectors';
import Swal from 'sweetalert2';
import AssessmentFormRender from './AssessmentFormRender';
import { getSection3Questions } from '../../redux/Questions/QuestionsAction';
import { getLanguageFormat, isJsonString } from '../../utils/helper';
import { question3Selector } from '../../redux/Questions/QuestionsSelectors';
import { useMsal } from '@azure/msal-react';

const AssessmentFormView = ({ isModal: contentTypeModal = false, activeData = {}, isReview }) => {
  const history = useHistory();
  const { accounts } = useMsal();
  // selected language getting here
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language; // Selected user language

  const loadingRef = useRef();
  const dispatch = useDispatch();

  // Get all reducer selector
  const stateControlData = useSelector((state) => state?.controlData?.controlData?.data);
  const questionData = useSelector(question3Selector);
  const getResponse = useSelector(getResponseSelector);
  const latestDraftData = useSelector(getLatestDraftSelector);
  const getMicsOpenActionPlanVal = useSelector(getMicsOpenActionPlanSelector);
  const questionsInfo = useSelector(getQuestionsSelector);
  const addOrEditUpdateDraft = useSelector(addOrEditUpdateDraftSelector);
  const kpiResultData = useSelector(kpiResultSelector);
  //If user save draft data then use latestDraftData otherwise using getResponse data
  const responseData = !getResponse?.data?.Latest_Response ? latestDraftData : getResponse;
  const responseUpdatedData =
    responseData.data?.Latest_Response || responseData.data?.Latest_response;

  // Local state for assessment form
  const [isModal, setIsModal] = useState(isReview || contentTypeModal);
  const [isOverride, setIsOverride] = useState(false);
  const [ansSection1, setAnsSection1] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [ansSection3, setAnsSection3] = useState({});
  const [showNoQuestionAns, setShowNoQuestionAns] = useState('');
  // Section3 - L1 & L2 select no option then next question ans store here
  const [L1AndL2NoQuestionsAns, setL1AndL2NoQuestionsAns] = useState({
    failingDue: null,
    reasonsForFailing: null,
  });

  const [showMoreSection, setShowMoreSection] = useState(false);
  const [terminating, setTerminating] = useState(false);
  const [startEdit, setStartEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(currentLanguage);
  const [actionPlanInfo, setActionPlanInfo] = useState({
    Action_Plan: '',
    Issue_Description: '',
    Original_Due_Date: null,
    Revised_Due_Date: null,
    ...getMicsOpenActionPlanVal.data,
    loading: !!getMicsOpenActionPlanVal?.loading,
  });
  const [isQuestion3Api, setIsQuestion3Api] = useState(false);
  const [loadingLevel, setLoadingLevel] = useState({
    L2: false,
    L3: false,
  });

  // User choose no option in Section plan value true, then we are clear older data
  const isNotEscalationRequired =
    actionPlanInfo.issueResolved === 'no' && !!actionPlanInfo.isEscalationRequired;

  const L1InnerQuestion = isJsonString(questionData.Level?.L1?.Inner_Questions || '[]')
    ? JSON.parse(questionData.Level?.L1?.Inner_Questions || '[]')
    : [];
  const L2InnerQuestion = isJsonString(questionData.Level?.L2?.Inner_Questions || '[]')
    ? JSON.parse(questionData.Level?.L2?.Inner_Questions || '[]')
    : [];

  useEffect(() => {
    loadingRef.current = loadingLevel;
  }, [loadingLevel]);

  useEffect(() => {
    if (responseUpdatedData?.actionPlanInfo?.Action_Plan) {
      setActionPlanInfo({ ...actionPlanInfo, ...responseUpdatedData?.actionPlanInfo });
    }
  }, [responseUpdatedData]);

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    setActionPlanInfo({ ...getMicsOpenActionPlanVal.data });
  }, [getMicsOpenActionPlanVal.data]);

  useEffect(() => {
    if (ansSection3?.noQueAns) {
      setShowNoQuestionAns(ansSection3?.noQueAns);
    }
    if (ansSection3?.L1AndL2NoQuestionsAns?.failingDue) {
      console.log('@@@@@@@@ ----11');
      setL1AndL2NoQuestionsAns(ansSection3?.L1AndL2NoQuestionsAns);
    }
  }, [ansSection3]);

  //API useEffect
  useEffect(() => {
    //console.log(activeData, '@@@');
    // get question API
    dispatch(
      getQuestions({
        Control_ID: activeData?.Question_Bank == 'Template1' ? 'Standard' : activeData?.control_id,
      }),
    );
    setTimeout(() => {
      if (!isModal) {
        // Get Drafted response API
        dispatch(getLatestDraft({ assessment_id: activeData?.assessment_id }));
      } else {
        // Get submitted response API
        dispatch(
          getAssessmentAns({
            assessment_id: activeData?.assessment_id,
          }),
        );
      }
      if (!isModal) {
        // Get KPI Section 2 data API
        dispatch(
          getAssessmentSection2Ans({
            MICS_code: activeData?.control_id,
            Entity_ID: activeData?.Receiver,
            KPI_From: activeData?.KPI_From,
            KPI_To: activeData?.KPI_To,
            // MICS_code: 'INV_REP_06',
            // Entity_ID: 'Argentina, Botswana',
            // KPI_From: '2023-09-01' || '',
            // KPI_To: '2023-11-30' || '',
          }),
        );
      }
    }, 400);
  }, [activeData]);

  useEffect(() => {
    if (ansSection1?.length > 0) {
      // Section 1 actions
      dispatch(updateLastAccess({ s1: getLanguageFormat(ansSection1, language) }));
      setAnsSection1(getLanguageFormat(ansSection1, language));
    }
  }, [language, currentLanguage]);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (terminating) {
        const btn = document.getElementById('submit-button');
        if (btn) btn.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'start' });
      }
    }, 200);
    return () => {
      clearTimeout(handle);
    };
  }, [terminating]);

  useEffect(() => {
    // Get MICS Open Action plan API call
    dispatch(
      getMicsOpenActionPlan({
        Control_ID: activeData?.control_id,
        Provider: activeData?.Provider,
        // Control_ID: 'OTC_AR_04',
        // Provider: 'SSC_ZCC_MAZ_GUA_CO_ECUADOR',
      }),
    );
    return () => {
      // When user componentdidmount then clear all response
      dispatch(clearLatestDraftResponse());
      dispatch(resetBlockAssessment());
      dispatch(resetBlockAssessment());
      setAnsSection1([]);
      setAnsSection3([]);
    };
  }, []);

  let timeOutSection2 = null;
  let timeOutSection3 = null;

  useEffect(() => {
    // condition for  L1 level questionData exist and L2 questionData exist
    const condition =
      (!(L1InnerQuestion.length > 0) &&
        questionData.Level?.L1?.Inner_Questions &&
        !questionData.Level?.L1) ||
      (!(L2InnerQuestion.length > 0) &&
        questionData.Level?.L2?.Inner_Questions &&
        !questionData.Level?.L3);

    // check user response section 3 `no` question ans select or not
    const isNoQueAns =
      responseUpdatedData?.s3?.length === 1 &&
      responseUpdatedData?.s3[0]?.length === 2 &&
      responseUpdatedData?.s3[0][0] === 'noQueAns';

    if (responseUpdatedData || condition) {
      if (responseUpdatedData?.s1 && !startEdit) {
        // set section 1 ans here..
        setAnsSection1(getLanguageFormat(responseUpdatedData.s1, language));
      }

      if (responseUpdatedData?.kpis) {
        // section 2 table local state store data
        setTableData(responseUpdatedData?.kpis);
      }

      if (responseUpdatedData?.showTable) {
        // API save already save response then show table, this state true then show section 2 in display
        setShowMoreSection(true);
      }

      if (responseUpdatedData?.L1AndL2NoQuestionsAns) {
        console.log('@@@@@@@---2222');
        setL1AndL2NoQuestionsAns(responseUpdatedData?.L1AndL2NoQuestionsAns);
      }

      if (responseUpdatedData?.s3?.length > 0 || condition) {
        //convert section 3 data to preview formate
        const section3Data = responseUpdatedData?.s3?.reduce(
          (acc, [k, v]) => ((acc[k] = v), acc),
          {},
        );

        if (!startEdit && !isNoQueAns) {
          // save section 3 to local state
          setAnsSection3(section3Data);
          setShowMoreSection(true);
        }

        // convert json string to parse data
        const L1InnerQuestion = isJsonString(questionData.Level?.L1?.Inner_Questions)
          ? JSON.parse(questionData.Level?.L1?.Inner_Questions)
          : [];
        const L2InnerQuestion = isJsonString(questionData.Level?.L2?.Inner_Questions)
          ? JSON.parse(questionData.Level?.L2?.Inner_Questions)
          : [];

        // check section 1 and section 2 select any no option or not
        const isLevel1NoInnerQuestion =
          questionData.Level?.L1?.Header_Question && !L1InnerQuestion.length;
        const isLevel2NoInnerQuestion =
          questionData.Level?.L1?.Header_Question &&
          questionData.Level?.L2?.Header_Question &&
          !L2InnerQuestion.length;

        // Check section 3 L1 level fill or not
        if (
          (section3Data?.L2 && questionData.Level?.L1 && !questionData.Level?.L2) ||
          (isLevel1NoInnerQuestion && !questionData.Level?.L2) ||
          (!(L1InnerQuestion.length > 0) &&
            questionData.Level?.L1?.Inner_Questions &&
            !questionData.Level?.L2)
        ) {
          // if section 3 level 1 show then API to get section 3 L2 level api call condition
          if (timeOutSection2) clearTimeout(timeOutSection2);
          timeOutSection2 = setTimeout(() => {
            if (!loadingRef?.current?.L2) {
              setLoadingLevel({ ...loadingLevel, L2: true });
              // Section 3 - L2 level api call
              dispatch(
                getSection3Questions({
                  Level: 'L2',
                  Control_ID: activeData?.control_id,
                  Assessment_ID: activeData?.assessment_id,
                  events: {
                    onSuccess: () => {
                      setTimeout(() => {
                        setLoadingLevel({ ...loadingLevel, L2: false });
                      }, 1500);
                    },
                  },
                }),
              );
            }
          }, 1000);
        }

        // Check section 3 L2 and L3 level fill or not
        if (
          (section3Data?.L3 && questionData.Level?.L2 && !questionData.Level?.L3) ||
          (isLevel2NoInnerQuestion && !questionData.Level?.L3)
        ) {
          if (timeOutSection3) clearTimeout(timeOutSection3);
          timeOutSection3 = setTimeout(() => {
            if (!loadingRef?.current?.L3) {
              setLoadingLevel({ ...loadingLevel, L3: true });
              // Section 3 - L3 level api call
              dispatch(
                getSection3Questions({
                  Level: 'L3',
                  Control_ID: activeData?.control_id,
                  Assessment_ID: activeData?.assessment_id,
                  events: {
                    onSuccess: () => {
                      setTimeout(() => {
                        setLoadingLevel({ ...loadingLevel, L3: false });
                      }, 1500);
                    },
                  },
                }),
              );
            }

            if (!showMoreSection) {
              console.log('1111111111');
              setTerminating(true);
            }
          }, 2000);
        }
      }
    }
  }, [responseData.data, questionData, activeData]);

  // check if section 1 fail or not
  const s1FailObj = useMemo(() => {
    return ansSection1.some((i) => {
      return !!i?.question_options?.find((d) => d?.option_id === i.selectVal)?.is_Failing;
    });
  }, [ansSection1]);

  // assessment submit action
  const handleSubmit = () => {
    let isS3FailedData;
    // warning alert to save or draft option dialog.
    //Text key check condition how many attempt remaining
    Swal.fire({
      title: t('selfAssessment.assessmentForm.submitText'),
      text: `${
        responseData?.data?.Attempt_no
          ? responseData?.data?.Attempt_no < 5
            ? 4 - responseData?.data?.Attempt_no
            : 0
          : responseData?.data?.Attempt_no === 0
          ? '4'
          : '5'
      } ${t('selfAssessment.assessmentForm.submitRemainingResponseText')}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'golden',
      cancelButtonColor: 'black',
      confirmButtonText: t('selfAssessment.assessmentForm.submitConfirmBtn'),
      showDenyButton: !(responseData?.data?.Attempt_no >= 5),
      denyButtonText: t('selfAssessment.assessmentForm.saveDraftBtn'),
      denyButtonColor: 'silver',
    }).then((result) => {
      if (result.isConfirmed) {
        // check if section 1 is_AD question then not store KPI data
        const isupdated = ansSection1.find((i) => i.is_AD === 1);
        const dataArray = Object.keys(ansSection3) || [];
        for (const key in ansSection3) {
          if (key !== 'L3') {
            if (
              key !== 'noQueAns' &&
              key !== 'L1AndL2NoQuestionsAns' &&
              ansSection3[key] &&
              Object.values(ansSection3[key]).length > 0 &&
              Object.values(ansSection3[key])[0].includes('no')
            ) {
              isS3FailedData = true;
            }
          }
        }

        // Assessment_result: check condition for S1 S3 fail then show Fail alert otherwise Pass result condition
        const payload = {
          Assessment_ID: activeData?.assessment_id,
          Assessment_result: isupdated
            ? 'NA'
            : isS3FailedData || s1FailObj || actionPlanInfo.issueResolved === 'no'
            ? 'Fail'
            : 'Pass',
          // isNotEscalationRequired if action plane (not yet resolved) button select then s1 s2 s3 set null
          Latest_response: {
            s1: isNotEscalationRequired ? null : ansSection1,
            data: isNotEscalationRequired
              ? null
              : isReview
              ? responseUpdatedData.data
              : kpiResultData?.data?.data,
            kpis: isNotEscalationRequired ? [] : tableData.length > 0 ? tableData : [],
            s3: isNotEscalationRequired
              ? null
              : !(showMoreSection && !s1FailObj && !isNotEscalationRequired)
              ? null
              : Object.entries({
                  ...ansSection3,
                  noQueAns: showNoQuestionAns,
                  L1AndL2NoQuestionsAns,
                }),
            showTable: showMoreSection,
            actionPlanInfo,
          },
          is_override: isOverride,
          submitted_by: accounts.length > 0 ? accounts[0].username : '',
          // kpis: isNotEscalationRequired ? [] : isupdated ? [] : tableData,
          event: {
            onSuccess: () => {
              setLoading(false);
              if (isupdated) {
                Swal.fire(
                  t('selfAssessment.assessmentForm.assessmentSubmittedText'),
                  '',
                  'success',
                );
                dispatch(clearAssessmentResponse());
                history.push('/');
              } else {
                if (
                  (dataArray.length > 0 ? isS3FailedData || s1FailObj : s1FailObj) ||
                  actionPlanInfo.issueResolved === 'no'
                ) {
                  Swal.fire(t('selfAssessment.assessmentForm.assessmentFailText'), '', 'success');
                } else {
                  Swal.fire(t('selfAssessment.assessmentForm.assessmentPassText'), '', 'success');
                }
                dispatch(clearAssessmentResponse());
                history.push('/');
              }
            },
          },
        };
        if (isupdated) payload.is_incorrect_owner = true;
        dispatch(addAssessmentAns(payload)); // API call for save assessment ans
      }

      // If user Denied (Draft) action
      if (result.isDenied) {
        //is user 5 time draft then not save again. show no limit error dialog
        if (responseData?.data?.Attempt_no >= 5) {
          Swal.fire(t('selfAssessment.assessmentForm.saveDraftNoLimiteText'), '', 'error');
          return;
        }
        const payload = {
          Assessment_ID: activeData?.assessment_id,
          Latest_response: {
            s1: isNotEscalationRequired ? null : ansSection1,
            s3: isNotEscalationRequired
              ? null
              : Object.entries({
                  ...ansSection3,
                  noQueAns: showNoQuestionAns,
                  L1AndL2NoQuestionsAns,
                }),
            data: isNotEscalationRequired ? null : kpiResultData?.data?.data,
            kpis: null,
            showTable: showMoreSection,
            actionPlanInfo,
            is_override: isOverride,
            submitted_by: accounts.length > 0 ? accounts[0].username : '',
          },
          events: {
            onSuccess: () => {
              dispatch(clearAssessmentResponse()); // Assessment clear action
              history.push('/');
            },
          },
        };
        // Draft API
        dispatch(addOrUpdateDraft(payload));
        setStartEdit(false);
      }
    });
  };

  const handleSaveDraft = () => {
    //is user 5 time draft then not save again. show no limit error dialog
    if (responseData?.data?.Attempt_no >= 5) {
      Swal.fire(t('selfAssessment.assessmentForm.saveDraftNoLimiteText'), '', 'error');
      return;
    }
    Swal.fire({
      title: t('selfAssessment.assessmentForm.saveDraftText'),
      text: `${
        responseData?.data?.Attempt_no
          ? responseData?.data?.Attempt_no < 5
            ? 4 - responseData?.data?.Attempt_no
            : 0
          : responseData?.data?.Attempt_no === 0
          ? '4'
          : '5'
      } ${t('selfAssessment.assessmentForm.saveDraftRemainingResponseText')}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'golden',
      cancelButtonColor: 'black',
      confirmButtonText: t('selfAssessment.assessmentForm.saveDraftBtn'),
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          Assessment_ID: activeData?.assessment_id,
          Latest_response: {
            is_override: !isModal,
            submitted_by: accounts.length > 0 ? accounts[0].username : '',
            s1: isNotEscalationRequired ? null : ansSection1,
            s3: isNotEscalationRequired
              ? null
              : Object.entries({
                  ...ansSection3,
                  noQueAns: showNoQuestionAns,
                  L1AndL2NoQuestionsAns,
                }),
            data: isNotEscalationRequired ? null : kpiResultData?.data?.data,
            kpis: null,
            showTable: showMoreSection,
            actionPlanInfo,
          },
          actionPlanInfo,
          is_override: isOverride,
          submitted_by: accounts.length > 0 ? accounts[0].username : '',
          events: {
            onSuccess: () => {
              Swal.fire(t('selfAssessment.assessmentForm.saveDraftSuccessText'), '', 'success');
              dispatch(clearAssessmentResponse());
              history.push('/');
            },
          },
        };
        dispatch(addOrUpdateDraft(payload));
        setStartEdit(false);
      }
    });
  };

  return (
    <>
      <div className="homeTableModalTop">
        <div className="topBar d-flex justify-content-between">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div>
              <div className="mb-2">{activeData?.control_id}</div>
              <span className="font-weight-bold">Control Name: </span>
              <span>{stateControlData.control_name}</span>
            </div>
          </div>
        </div>
      </div>
      <AssessmentFormRender
        s1FailObj={s1FailObj}
        questionsInfo={questionsInfo}
        setShowMoreSection={setShowMoreSection}
        ansSection1={ansSection1}
        setAnsSection1={setAnsSection1}
        showMoreSection={showMoreSection}
        tableData={tableData}
        setTableData={setTableData}
        setTerminating={setTerminating}
        ansSection3={ansSection3}
        setAnsSection3={setAnsSection3}
        showNoQuestionAns={showNoQuestionAns}
        setShowNoQuestionAns={setShowNoQuestionAns}
        terminating={terminating}
        handleSubmit={handleSubmit}
        activeData={activeData}
        handleSaveDraft={handleSaveDraft}
        loadingSubmit={loading}
        actionPlanInfo={actionPlanInfo}
        setActionPlanInfo={setActionPlanInfo}
        getMicsOpenActionPlanVal={getMicsOpenActionPlanVal}
        handleSaveDraftProps={{
          disabled: responseData?.data?.Attempt_no >= 5,
          style: { width: 128 },
          loading: addOrEditUpdateDraft.loading,
        }}
        isOverride={isOverride}
        setIsOverride={setIsOverride}
        isReview={isReview}
        isModal={isModal}
        setIsModal={setIsModal}
        setStartEdit={setStartEdit}
        language={language}
        loadingLevel={loadingLevel}
        setLoadingLevel={setLoadingLevel}
        loadingRef={loadingRef}
        L1AndL2NoQuestionsAns={L1AndL2NoQuestionsAns}
        setL1AndL2NoQuestionsAns={setL1AndL2NoQuestionsAns}
        question3Api={isQuestion3Api}
        setQuestion3Api={setIsQuestion3Api}
      />
    </>
  );
};

export default AssessmentFormView;
