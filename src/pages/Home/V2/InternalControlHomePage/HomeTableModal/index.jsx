import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './homeTableModalStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import {
  addAssessmentAns,
  addAssessmentSection2Ans,
  addOrUpdateDraft,
  getAssessmentAns,
  getAssessmentSection2Ans,
  getKPIData,
  getLatestDraft,
  getQuestions,
} from '../../../../../redux/Assessments/AssessmentAction';
import {
  addOrEditUpdateDraftSelector,
  getLatestDraftSelector,
  getQuestionsSelector,
  getResponseSelector,
} from '../../../../../redux/Assessments/AssessmentSelectors';
import Swal from 'sweetalert2';
import RenderHomeModalTable from './RenderHomeModalTable';
import { getSection3Questions } from '../../../../../redux/Questions/QuestionsAction';
import CustomModal from '../../../../../components/UI/CustomModal';
import blockType from '../../../../../components/RenderBlock/constant';
import CloseIcon from '@mui/icons-material/Close';

const HomeTableModal = ({ isModal = false, activeData = {} }) => {
  const history = useHistory();
  const { accounts } = useMsal();
  const query = new URLSearchParams(history.location.search);
  const stateControlData = useSelector((state) => state?.controlData?.controlData?.data);
  const { Assessment_id = '' } = useParams();
  const dispatch = useDispatch();
  const getResponse = useSelector(getResponseSelector);
  const latestDraftData = useSelector(getLatestDraftSelector);
  const responseData = !getResponse?.data?.Latest_Response ? latestDraftData : getResponse;
  const questionsInfo = useSelector(getQuestionsSelector);
  const [ansSection1, setAnsSection1] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [ansSection3, setAnsSection3] = useState({});
  const [showNoQuestionAns, setShowNoQuestionAns] = useState('');
  const [showMoreSection, setShowMoreSection] = useState(false);
  const [terminating, setTerminating] = useState(false);
  const [startEdit, setStartEdit] = useState(false);
  const addOrEditUpdateDraft = useSelector(addOrEditUpdateDraftSelector);
  const [loading, setLoading] = useState(false);
  const [closeAssessment, setCloseAssessment] = useState(false);
  // const Control_ID = query.get('Assessment_id') || !isModal ? 'ATR_MJE_01a-K' : '';
  const Control_ID = Assessment_id || query.get('Control_ID');
  const responseUpdatedData =
    responseData.data?.Latest_Response || responseData.data?.Latest_response;
  const handleClose = () => {
    if (startEdit && responseData?.data?.Attempt_no <= 5) {
      Swal.fire({
        title: 'Do you want save as draft!',
        text: `Remaining response ${
          responseData?.data?.Attempt_no
            ? responseData?.data?.Attempt_no < 5
              ? 4 - responseData?.data?.Attempt_no
              : 0
            : responseData?.data?.Attempt_no === 0
            ? '4'
            : '5'
        }`,
        icon: 'warning',
        showConfirmButton: false,
        showCancelButton: true,
        showDenyButton: true,
        denyButtonColor: 'silver',
        denyButtonText: 'Save draft!',
      }).then((result) => {
        if (result.isDismissed) {
          history.push('/');
        }
        if (result.isDenied) {
          if (responseData?.data?.Attempt_no >= 5) {
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
          dispatch(addOrUpdateDraft(payload));
          setStartEdit(false);
        }
      });
      return;
    }
    history.push('/');
  };
  useEffect(() => {
    dispatch(
      getQuestions({
        Control_ID: activeData.Question_Bank === 'Template1' ? 'Standard' : activeData.Control_ID,
      }),
    );
    // dispatch(
    //   getKPIData({
    //     MICS_code: activeData.Control_ID || Control_ID,
    //     Entity_ID: activeData.Provider,
    //   }),
    // );
    setTimeout(() => {
      if (!isModal) {
        dispatch(getLatestDraft({ assessment_id: activeData.id || Control_ID }));
      } else {
        dispatch(
          getAssessmentAns({
            assessment_id: activeData.id,
            cowner: activeData?.Control_Owner,
          }),
        );
      }

      dispatch(
        getAssessmentSection2Ans({
          MICS_code: activeData.Control_ID || Control_ID,
          Entity_ID: activeData.Receiver,
          KPI_From: activeData.KPI_From || '',
          KPI_To: activeData.KPI_To || '',
        }),
      );
    }, 400);
  }, [Control_ID]);

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
    if (responseUpdatedData) {
      if (responseUpdatedData.s1) setAnsSection1(responseUpdatedData.s1);

      if (responseUpdatedData?.s3?.length > 0) {
        const section3Data = responseUpdatedData?.s3?.reduce(
          (acc, [k, v]) => ((acc[k] = v), acc),
          {},
        );
        setAnsSection3(section3Data);
        setShowMoreSection(true);

        if (section3Data.L2) {
          setTimeout(() => {
            dispatch(
              getSection3Questions({
                Level: 'L2',
                Control_ID: Control_ID,
                Assessment_ID: activeData.id,
              }),
            );
          }, 1000);
        }
        if (section3Data.L3) {
          setTimeout(() => {
            dispatch(
              getSection3Questions({
                Level: 'L3',
                Control_ID: Control_ID,
                Assessment_ID: activeData.id,
              }),
            );
            setTerminating(true);
          }, 2000);
        }
      }
    }
  }, [responseData.data]);

  const getIsFaildValueSelect = () => {
    let isFail = false;
    ansSection1.forEach((ans) => {
      switch (true) {
        case ans.question_type === blockType.EMAIL_WIDTH_SELECT:
        case ans.question_type === blockType.IS_AD:
        case ans.question_type === blockType.TEXT:
          ans.options.forEach((d) => {
            if (d.is_Failing === 1) isFail = true;
          });
          break;
        case ans.question_type === blockType.RADIO:
        case ans.question_type === blockType.DROPDOWN:
          ans.question_options.forEach((d) => {
            if (d.is_Failing === 1) isFail = true;
          });
          break;
        default:
          break;
      }
    });
    return isFail;
  };

  const handleSubmit = () => {
    Swal.fire({
      title: 'Do you want Submit assessment',
      text: `Remaining response ${
        responseData?.data?.Attempt_no
          ? responseData?.data?.Attempt_no < 5
            ? 4 - responseData?.data?.Attempt_no
            : 0
          : responseData?.data?.Attempt_no === 0
          ? '4'
          : '5'
      }`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'golden',
      cancelButtonColor: 'black',
      confirmButtonText: 'Yes, submit it!',
      showDenyButton: !(responseData?.data?.Attempt_no >= 5),
      denyButtonText: 'Save draft!',
      denyButtonColor: 'silver',
    }).then((result) => {
      if (result.isConfirmed) {
        // setLoading(true);
        // dispatch(addAssessmentSection2Ans({ kpis: tableData }));
        const s1FailObj = ansSection1.some((i) => {
          return !!i?.question_options?.find((d) => d?.option_id === i.selectVal)?.is_Failing;
        });
        const isupdated = ansSection1.find((i) => i.is_AD === 1);
        const dataArray = Object.keys(ansSection3) || [];
        const isS3Failed = !dataArray.includes('L3');
        const payload = {
          Assessment_ID: activeData.id,
          Assessment_result: isupdated ? 'NA' : isS3Failed || s1FailObj ? 'Fail' : 'Pass',
          Latest_response: {
            s1: ansSection1,
            s3: Object.entries({ ...ansSection3, noQueAns: showNoQuestionAns }),
          },
          kpis: isupdated ? [] : tableData,
          event: {
            onSuccess: () => {
              setLoading(false);
              if (isupdated) {
                Swal.fire('Your Assesment has been submitted', '', 'success');
                history.push('/');
              } else {
                if (dataArray.length > 0 ? isS3Failed || s1FailObj : s1FailObj) {
                  Swal.fire('Your Assesment has been failed', '', 'success');
                } else {
                  Swal.fire('Your Assesment has been passed', '', 'success');
                }
                history.push('/');
              }
            },
          },
        };
        if (isupdated) payload.is_incorrect_owner = true;
        dispatch(addAssessmentAns(payload));
      }
      if (result.isDenied) {
        if (responseData?.data?.Attempt_no >= 5) {
          Swal.fire("You don't have a limited", '', 'error');
          return;
        }
        const payload = {
          Assessment_ID: activeData?.id,
          Latest_response: {
            s1: ansSection1,
            s3: Object.entries({ ...ansSection3, noQueAns: showNoQuestionAns }),
          },
          events: {
            onSuccess: () => {
              history.push('/');
            },
          },
        };
        dispatch(addOrUpdateDraft(payload));
        setStartEdit(false);
      }
    });
  };

  const handleSaveDraft = () => {
    if (responseData?.data?.Attempt_no >= 5) {
      Swal.fire("You don't have a limited", '', 'error');
      return;
    }
    Swal.fire({
      title: 'Do you want save draft?',
      text: `Remaining response ${
        responseData?.data?.Attempt_no
          ? responseData?.data?.Attempt_no < 5
            ? 4 - responseData?.data?.Attempt_no
            : 0
          : responseData?.data?.Attempt_no === 0
          ? '4'
          : '5'
      }`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'golden',
      cancelButtonColor: 'black',
      confirmButtonText: 'Save draft!',
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          Assessment_ID: activeData.id,
          Latest_response: {
            s1: ansSection1,
            s3: Object.entries({ ...ansSection3, noQueAns: showNoQuestionAns }),
          },
          events: {
            onSuccess: () => {
              Swal.fire('Draft saved successfully', '', 'success');
              history.push('/');
            },
          },
        };
        dispatch(addOrUpdateDraft(payload));
        setStartEdit(false);
      }
    });
  };
  const handleCloseAssessment = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to close the Assessment`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'golden',
      cancelButtonColor: 'black',
      confirmButtonText: 'Close Assessment',
    }).then((result) => {
      if (result.isConfirmed) {
        history.push('/');
      }
    });
  };
  if (!isModal)
    return (
      <>
        {Control_ID && (
          <div className="homeTableModalTop">
            <div className="topBar d-flex justify-content-between">
              <div>
                <div className="mb-2">
                  {/*<CloseIcon className="close-modal-icon" onClick={handleClose} />*/}
                  {Control_ID}
                </div>
                <span className="font-weight-bold">Control Name: </span>
                <span>{stateControlData.control_name}</span>
              </div>
              <CloseIcon className="close-modal-icon" onClick={() => handleCloseAssessment()} />
            </div>
          </div>
        )}
        <RenderHomeModalTable
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
          handleSaveDraftProps={{
            disabled: responseData?.data?.Attempt_no >= 5,
            style: { width: 128 },
            loading: addOrEditUpdateDraft.loading,
          }}
          isModal={false}
          setStartEdit={setStartEdit}
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
      <RenderHomeModalTable
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
        handleSaveDraftProps={{
          disabled: responseData?.data?.Attempt_no >= 5,
          style: { width: 128 },
          loading: addOrEditUpdateDraft.loading,
        }}
        isModal={true}
        setStartEdit={setStartEdit}
      />
    </CustomModal>
  );
};

export default HomeTableModal;
