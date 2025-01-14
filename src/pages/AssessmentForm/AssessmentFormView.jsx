import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
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
  getHistoricalGraphData,
  getKPISection2Data,
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
import { getLanguageFormat, isJsonString } from '../../utils/helper';
import { question3Selector } from '../../redux/Questions/QuestionsSelectors';
import { useMsal } from '@azure/msal-react';
import { resetBlockAD } from '../../redux/AzureAD/AD_Action';
import { hasFailDenominator, hasFailNumerator } from './ControlSection2';
import { getCurrentYearAndQuarter } from '../KPIModule/KpiModuleLandingPage';

const AssessmentFormView = ({ isModal: contentTypeModal = false, activeData = {}, isReview }) => {
  const history = useHistory();
  const location = useLocation();
  const { accounts } = useMsal();
  // selected language getting here
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language; // Selected user language
  const currentQuarter = getCurrentYearAndQuarter();
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
  const [submitLoading, setSubmitLoading] = useState(false);
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
  const [language, setLanguage] = useState(currentLanguage);
  const [actionPlanInfo, setActionPlanInfo] = useState({
    Action_Plan: '',
    Issue_Description: '',
    Original_Due_Date: null,
    Revised_Due_Date: null,
    ...getMicsOpenActionPlanVal.data,
    loading: !!getMicsOpenActionPlanVal?.loading,
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
    if (responseUpdatedData?.actionPlanInfo?.Action_Plan) {
      setActionPlanInfo({ ...actionPlanInfo, ...responseUpdatedData?.actionPlanInfo });
    }
  }, [responseUpdatedData]);

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    if (!responseUpdatedData?.actionPlanInfo?.Action_Plan)
      setActionPlanInfo({ ...getMicsOpenActionPlanVal.data });
  }, [getMicsOpenActionPlanVal.data]);

  useEffect(() => {
    if (ansSection3?.noQueAns) {
      setShowNoQuestionAns(ansSection3?.noQueAns);
    }
    if (ansSection3?.L1AndL2NoQuestionsAns?.failingDue) {
      setL1AndL2NoQuestionsAns(ansSection3?.L1AndL2NoQuestionsAns);
    }
  }, [ansSection3]);

  //API useEffect
  useEffect(() => {
    if (questionsInfo.loading) return;
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
            // MICS_code: 'OTC_MD_04',
            // Entity_ID: 'Botswana',
            // KPI_From: '2024-03-01' || '',
            // KPI_To: '2024-05-31' || '',
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
    dispatch(
      getHistoricalGraphData({
        mics_id: activeData?.control_id,
        receiver_entity: activeData?.Receiver,
        year_and_quarter: currentQuarter,
      }),
    );

    dispatch(
      getKPISection2Data({
        mics_id: activeData?.control_id,
        receiver_entity: activeData?.Receiver,
        year_and_quarter: currentQuarter,

        // mics_id: 'ATR_BALAN_01-K',
        // receiver_entity: 'Australia',
        // year_and_quarter: '2024Q3',
      }),
    );

    return () => {
      // When user componentdidmount then clear all response
      dispatch(clearLatestDraftResponse());
      dispatch(resetBlockAssessment());
      dispatch(resetBlockAssessment());
      dispatch(clearAssessmentResponse());
      dispatch(resetBlockAD({ blockType: 'userFromAD' }));
      dispatch(resetBlockAD({ blockType: 'isEmailValidAD' }));
      setAnsSection1([]);
      setAnsSection3([]);
    };
  }, []);

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
        setTimeout(() => {
          setAnsSection1(getLanguageFormat(responseUpdatedData.s1, language));
        }, [10]);

        // if section1 ad question fill then show submit btn
        if (responseUpdatedData.s1?.length > 0) {
          const lastS1Data = responseUpdatedData.s1[responseUpdatedData.s1.length - 1];
          if (lastS1Data && lastS1Data.is_AD && lastS1Data.value) {
            setTerminating(true);
          }
        }
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
        setL1AndL2NoQuestionsAns(responseUpdatedData?.L1AndL2NoQuestionsAns);
      }

      if (responseUpdatedData?.s3?.length > 0 || condition) {
        //convert section 3 data to preview formate
        const section3Data = responseUpdatedData?.s3?.reduce((acc, [k, v]) => {
          if (!v) return acc;
          return (acc[k] = v), acc;
        }, {});

        const isValidSection3Data = section3Data && Object.keys(section3Data).length !== 1;
        if (!startEdit && !isNoQueAns && isValidSection3Data) {
          // save section 3 to local state
          setAnsSection3(section3Data);
          setShowMoreSection(true);
        }

        // convert json string to parse data
        const L2InnerQuestion = isJsonString(questionData.Level?.L2?.Inner_Questions)
          ? JSON.parse(questionData.Level?.L2?.Inner_Questions)
          : [];

        // check section 1 and section 2 select any no option or not
        const isLevel2NoInnerQuestion =
          questionData.Level?.L1?.Header_Question &&
          questionData.Level?.L2?.Header_Question &&
          !L2InnerQuestion.length;

        // Check section 3 L2 and L3 level fill or not
        if (
          (section3Data?.L3 && questionData.Level?.L2 && !questionData.Level?.L3) ||
          (isLevel2NoInnerQuestion && !questionData.Level?.L3)
        ) {
          if (!questionData?.data?.L3) {
            if (timeOutSection3) clearTimeout(timeOutSection3);
            timeOutSection3 = setTimeout(() => {
              if (!showMoreSection) {
                setTerminating(true);
              }
            }, 2000);
          }
        }
      }
    }
  }, [responseData.data, questionData, activeData, questionsInfo]);

  // check if section 1 fail or not
  const s1FailObj = useMemo(() => {
    return ansSection1.some((i) => {
      return !!i?.question_options?.find((d) => d?.option_id === i.selectVal)?.is_Failing;
    });
  }, [ansSection1, responseData, latestDraftData, questionData]);

  const convertSameDataType = (tableData = []) => {
    return tableData.map((td) => {
      return {
        ...td,
        Denominator: hasFailDenominator(td)
          ? ''
          : td.Denominator
          ? td.Denominator?.toString() || ''
          : '',
        Numerator: hasFailNumerator(td) ? '' : td.Numerator ? td.Numerator?.toString() || '' : '',
      };
    });
  };

  const onSuccessRedirect = () => {
    // Get current query parameters
    const searchParams = new URLSearchParams(location.search);

    // Check for %filter% keyword in any of the query parameters
    let filterParams = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key.includes('filter')) {
        filterParams.append(key, value);
      }
    });

    // Redirect to home with preserved %filter% query parameters if any
    const url = filterParams.toString() ? `/?${filterParams.toString()}` : '/';
    history.push(url);
  };

  // assessment submit action
  const handleSubmit = () => {
    let isS3FailedData;
    // warning alert to save or draft option dialog.
    //Text key check condition how many attempt remaining
    Swal.fire({
      title: t('selfAssessment.assessmentForm.submitText'),
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'golden',
      cancelButtonColor: 'black',
      confirmButtonText: ` ${t('selfAssessment.assessmentForm.submitConfirmBtn')} <br/>`,
      showDenyButton: true,
      denyButtonText: `${t('selfAssessment.assessmentForm.saveDraftBtn')}`,
      denyButtonColor: 'silver',

      // (${
      //   responseData?.data?.Attempt_no
      //     ? responseData?.data?.Attempt_no < 5
      //       ? 4 - responseData?.data?.Attempt_no
      //       : 0
      //     : responseData?.data?.Attempt_no === 0
      //     ? '4'
      //     : '5'
      // } remaining)`,
    }).then((result) => {
      if (result.isConfirmed) {
        // check if section 1 is_AD question then not store KPI data
        const isupdated = ansSection1?.find((i) => i.is_AD === 1);
        const dataArray = Object.keys(ansSection3) || [];
        for (const key in ansSection3) {
          if (key !== 'L3') {
            if (
              key !== 'noQueAns' &&
              key !== 'L1AndL2NoQuestionsAns' &&
              ansSection3[key] &&
              Object.values(ansSection3[key]).length > 0 &&
              Object.values(ansSection3[key])[0]?.includes('no')
            ) {
              isS3FailedData = true;
            }
          }
        }

        setSubmitLoading(true);

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
            kpis:
              tableData.length > 0 && (isNotEscalationRequired || showMoreSection)
                ? convertSameDataType(tableData)
                : [],
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
          submitted_by: accounts.length > 0 ? accounts[0]?.username : '',
          // kpis: isNotEscalationRequired ? [] : isupdated ? [] : tableData,
          event: {
            onError: () => {
              setSubmitLoading(false);
            },
            onSuccess: () => {
              setSubmitLoading(false);
              if (isupdated) {
                Swal.fire(
                  t('selfAssessment.assessmentForm.assessmentSubmittedText'),
                  '',
                  'success',
                );
                dispatch(clearAssessmentResponse());
                dispatch(resetBlockAD({ blockType: 'userFromAD' }));
                dispatch(resetBlockAD({ blockType: 'isEmailValidAD' }));
                onSuccessRedirect();
              } else {
                if (
                  (dataArray.length > 0 ? isS3FailedData || s1FailObj : s1FailObj) ||
                  actionPlanInfo.issueResolved === 'no'
                ) {
                  Swal.fire(t('selfAssessment.assessmentForm.assessmentFailText'), '', 'success');
                } else {
                  Swal.fire(t('selfAssessment.assessmentForm.assessmentPassText'), '', 'success');
                }
                dispatch(resetBlockAD({ blockType: 'userFromAD' }));
                dispatch(resetBlockAD({ blockType: 'isEmailValidAD' }));
                dispatch(clearAssessmentResponse());
                onSuccessRedirect();
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
        // if (responseData?.data?.Attempt_no >= 5) {
        //   Swal.fire(t('selfAssessment.assessmentForm.saveDraftNoLimiteText'), '', 'error');
        //   return;
        // }
        setSubmitLoading(true);
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
            kpis:
              tableData.length > 0 && (isNotEscalationRequired || showMoreSection)
                ? convertSameDataType(tableData)
                : [],
            showTable: showMoreSection,
            actionPlanInfo,
            is_override: isOverride,
            submitted_by: accounts.length > 0 ? accounts[0]?.username : '',
          },
          events: {
            onError: () => {
              setSubmitLoading(false);
            },
            onSuccess: () => {
              setSubmitLoading(false);
              dispatch(resetBlockAD({ blockType: 'userFromAD' }));
              dispatch(resetBlockAD({ blockType: 'isEmailValidAD' }));
              dispatch(clearAssessmentResponse()); // Assessment clear action
              onSuccessRedirect();
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
    // if (responseData?.data?.Attempt_no >= 5) {
    //   Swal.fire(t('selfAssessment.assessmentForm.saveDraftNoLimiteText'), '', 'error');
    //   return;
    // }
    // ${
    //   responseData?.data?.Attempt_no
    //     ? responseData?.data?.Attempt_no < 5
    //       ? 4 - responseData?.data?.Attempt_no
    //       : 0
    //     : responseData?.data?.Attempt_no === 0
    //     ? '4'
    //     : '5'
    // }
    Swal.fire({
      title: t('selfAssessment.assessmentForm.saveDraftText'),
      // html: `<p class='draft-btn'> ${t('selfAssessment.assessmentForm.saveDraftBtn')}</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'golden',
      cancelButtonColor: 'black',
      confirmButtonText: `${t('selfAssessment.assessmentForm.saveDraftBtn')}`,
      // (${
      //   responseData?.data?.Attempt_no
      //     ? responseData?.data?.Attempt_no < 5
      //       ? 4 - responseData?.data?.Attempt_no
      //       : 0
      //     : responseData?.data?.Attempt_no === 0
      //     ? '4'
      //     : '5'
      // })
    }).then((result) => {
      if (result.isConfirmed) {
        setSubmitLoading(true);
        const payload = {
          Assessment_ID: activeData?.assessment_id,
          Latest_response: {
            is_override: !isModal,
            submitted_by: accounts.length > 0 ? accounts[0]?.username : '',
            s1: isNotEscalationRequired ? null : ansSection1,
            s3: isNotEscalationRequired
              ? null
              : Object.entries({
                  ...ansSection3,
                  noQueAns: showNoQuestionAns,
                  L1AndL2NoQuestionsAns,
                }),
            data: isNotEscalationRequired ? null : kpiResultData?.data?.data,
            kpis:
              tableData.length > 0 && (isNotEscalationRequired || showMoreSection)
                ? convertSameDataType(tableData)
                : [],
            showTable: showMoreSection,
            actionPlanInfo,
          },
          actionPlanInfo,
          is_override: isOverride,
          submitted_by: accounts.length > 0 ? accounts[0]?.username : '',
          events: {
            onError: () => {
              setSubmitLoading(false);
            },
            onSuccess: () => {
              setSubmitLoading(false);
              setSubmitLoading(false);
              Swal.fire(t('selfAssessment.assessmentForm.saveDraftSuccessText'), '', 'success');
              dispatch(resetBlockAD({ blockType: 'userFromAD' }));
              dispatch(resetBlockAD({ blockType: 'isEmailValidAD' }));
              dispatch(clearAssessmentResponse());
              onSuccessRedirect();
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
        loadingSubmit={submitLoading}
        actionPlanInfo={actionPlanInfo}
        setActionPlanInfo={setActionPlanInfo}
        getMicsOpenActionPlanVal={getMicsOpenActionPlanVal}
        handleSaveDraftProps={{
          // disabled: responseData?.data?.Attempt_no >= 5,
          style: { width: 140 },
          loading: addOrEditUpdateDraft.loading,
        }}
        controlId={activeData?.control_id}
        isOverride={isOverride}
        setIsOverride={setIsOverride}
        isReview={isReview}
        isModal={isModal}
        setIsModal={setIsModal}
        setStartEdit={setStartEdit}
        language={language}
        L1AndL2NoQuestionsAns={L1AndL2NoQuestionsAns}
        setL1AndL2NoQuestionsAns={setL1AndL2NoQuestionsAns}
      />
    </>
  );
};

export default AssessmentFormView;
