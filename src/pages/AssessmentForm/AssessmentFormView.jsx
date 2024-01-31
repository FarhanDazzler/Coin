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
import CustomModal from '../../components/UI/CustomModal';
import CloseIcon from '@mui/icons-material/Close';
import { getLanguageFormat, isJsonString } from '../../utils/helper';
import { question3Selector } from '../../redux/Questions/QuestionsSelectors';

const AssessmentFormView = ({ isModal: contentTypeModal = false, activeData = {}, isReview }) => {
  // Page history and query
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const param = useParams();
  const { Assessment_id = '' } = param;
  const Control_ID = Assessment_id || query.get('Control_ID');

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
  const [ansSection1, setAnsSection1] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [ansSection3, setAnsSection3] = useState({});
  const [showNoQuestionAns, setShowNoQuestionAns] = useState('');
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

  // If user open assessment form inside modal then close handler
  const handleClose = () => {
    // A dialog will open if the user has not saved the draft more than 5 times
    if (startEdit && responseData?.data?.Attempt_no <= 5) {
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
        showConfirmButton: false,
        showCancelButton: true,
        showDenyButton: true,
        denyButtonColor: 'silver',
        denyButtonText: t('selfAssessment.assessmentForm.saveDraftBtn'),
      }).then((result) => {
        // if user select cancel then modal close and go back
        if (result.isDismissed) {
          dispatch(clearAssessmentResponse());
          history.push('/');
        }
        // is user save change then this action work
        if (result.isDenied) {
          if (responseData?.data?.Attempt_no >= 5) {
            dispatch(clearAssessmentResponse());
            history.push('/');
            return;
          }
          const payload = {
            Assessment_ID: Control_ID,
            Latest_response: {
              s1: ansSection1,
              s3: Object.entries({ ...ansSection3, noQueAns: showNoQuestionAns }),
            },
          };
          dispatch(addOrUpdateDraft(payload)); // Draft api call
          setStartEdit(false);
        }
      });
      return;
    }
    // for clearing the assessment response after closing the modal
    dispatch(clearAssessmentResponse());
    history.push('/');
  };
  useEffect(() => {
    if (ansSection3?.noQueAns) {
      setShowNoQuestionAns(ansSection3?.noQueAns);
    }
  }, [ansSection3]);

  //API useEffect
  useEffect(() => {
    // get question API
    dispatch(
      getQuestions({
        Control_ID: activeData.Question_Bank === 'Template1' ? 'Standard' : activeData.Control_ID,
      }),
    );
    setTimeout(() => {
      if (!isModal) {
        // Draft data API
        dispatch(getLatestDraft({ assessment_id: activeData.id || Control_ID }));
      } else {
        // Assessment ans API
        dispatch(
          getAssessmentAns({
            assessment_id: activeData.id,
            cowner: activeData?.Control_Owner,
          }),
        );
      }
      if (!isModal) {
        // Section 2 data API
        dispatch(
          getAssessmentSection2Ans({
            MICS_code: activeData.Control_ID || Control_ID,
            Entity_ID: activeData.Receiver,
            KPI_From: activeData.KPI_From || '',
            KPI_To: activeData.KPI_To || '',
            // MICS_code: 'INV_REP_06' || Control_ID,
            // Entity_ID: 'Argentina, Botswana',
            // KPI_From: '2023-09-01' || '',
            // KPI_To: '2023-11-30' || '',
          }),
        );
      }
    }, 400);
  }, [Control_ID]);

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
    // Action plan API call
    dispatch(
      getMicsOpenActionPlan({
        Control_ID: activeData.Control_ID || Control_ID,
        Provider: activeData.Provider,
        // Control_ID: 'OTC_AR_04',
        // Provider: 'SSC_ZCC_MAZ_GUA_CO_ECUADOR',
      }),
    );
    return () => {
      // When user componentdidmount then clear all response
      dispatch(clearLatestDraftResponse());
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
                  Control_ID: Control_ID,
                  Assessment_ID: activeData.id,
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
                  Control_ID: Control_ID,
                  Assessment_ID: activeData.id,
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

            if (!showMoreSection) setTerminating(true);
          }, 2000);
        }
      }
    }
  }, [responseData.data, questionData, Control_ID]);

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
            if (key !== 'noQueAns' && Object.values(ansSection3[key])[0].includes('no')) {
              isS3FailedData = true;
            }
          }
        }

        // Assessment_result: check condition for S1 S3 fail then show Fail alert otherwise Pass result condition
        const payload = {
          Assessment_ID: activeData.id,
          Assessment_result: isupdated
            ? 'NA'
            : isS3FailedData || s1FailObj || actionPlanInfo.issueResolved === 'no'
            ? 'Fail'
            : 'Pass',
          Latest_response: {
            s1: ansSection1,
            data: isReview ? responseUpdatedData.data : kpiResultData?.data?.data,
            kpis: tableData.length > 0 ? tableData : null,
            s3: isNotEscalationRequired
              ? null
              : Object.entries({ ...ansSection3, noQueAns: showNoQuestionAns }),
            showTable: showMoreSection,
            actionPlanInfo,
          },
          kpis: isupdated ? [] : tableData,
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
          Assessment_ID: activeData?.id,
          Latest_response: {
            s1: ansSection1,
            s3: isNotEscalationRequired
              ? null
              : Object.entries({ ...ansSection3, noQueAns: showNoQuestionAns }),
            data: kpiResultData?.data?.data,
            kpis: tableData.length > 0 ? tableData : null,
            showTable: showMoreSection,
            actionPlanInfo,
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
          Assessment_ID: activeData.id,
          Latest_response: {
            s1: ansSection1,
            s3: isNotEscalationRequired
              ? null
              : Object.entries({ ...ansSection3, noQueAns: showNoQuestionAns }),
            data: kpiResultData?.data?.data,
            kpis: tableData.length > 0 ? tableData : null,
            showTable: showMoreSection,
            actionPlanInfo,
          },
          actionPlanInfo,
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

  // if show in modal view then close icon action
  const handleCloseAssessment = () => {
    // Conform popup for assessment changes
    Swal.fire({
      title: t('selfAssessment.assessmentForm.closePopupBtnTitle'),
      text: t('selfAssessment.assessmentForm.closePopupBtnText'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'golden',
      cancelButtonColor: 'black',
      confirmButtonText: t('selfAssessment.assessmentForm.closePopupBtnConfirmBtn'),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearAssessmentResponse());
        history.push('/');
      }
    });
  };
  if (!contentTypeModal || isReview)
    return (
      <>
        {Control_ID && (
          <div className="homeTableModalTop">
            <div className="topBar d-flex justify-content-between">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                  <div className="mb-2">{Control_ID}</div>
                  <span className="font-weight-bold">Control Name: </span>
                  <span>{stateControlData.control_name}</span>
                </div>
              </div>
              <CloseIcon className="close-modal-icon" onClick={() => handleCloseAssessment()} />
            </div>
          </div>
        )}
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
          isReview={isReview}
          isModal={isModal}
          setIsModal={setIsModal}
          setStartEdit={setStartEdit}
          language={language}
          loadingLevel={loadingLevel}
          setLoadingLevel={setLoadingLevel}
          loadingRef={loadingRef}
        />
      </>
    );
  return (
    <CustomModal
      bodyClassName="p-0"
      open={!!Control_ID}
      title={Control_ID}
      width={1080}
      onClose={handleClose}
    >
      <AssessmentFormRender
        s1FailObj={s1FailObj}
        questionsInfo={questionsInfo}
        setShowMoreSection={setShowMoreSection}
        ansSection1={ansSection1}
        setAnsSection1={setAnsSection1}
        showMoreSection={showMoreSection}
        tableData={tableData}
        activeData={activeData}
        setTableData={setTableData}
        setTerminating={setTerminating}
        ansSection3={ansSection3}
        setAnsSection3={setAnsSection3}
        showNoQuestionAns={showNoQuestionAns}
        setShowNoQuestionAns={setShowNoQuestionAns}
        terminating={terminating}
        handleSubmit={handleSubmit}
        controlId={Control_ID}
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
        isReview={isReview}
        isModal={isModal}
        setIsModal={setIsModal}
        setStartEdit={setStartEdit}
        language={language}
        loadingLevel={loadingLevel}
        setLoadingLevel={setLoadingLevel}
        loadingRef={loadingRef}
      />
    </CustomModal>
  );
};

export default AssessmentFormView;
