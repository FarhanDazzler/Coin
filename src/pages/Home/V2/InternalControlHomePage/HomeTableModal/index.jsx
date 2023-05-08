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

const HomeTableModal = ({ isModal = false }) => {
  const history = useHistory();
  const { accounts } = useMsal();

  const query = new URLSearchParams(history.location.search);
  const { Assessment_id = '' } = useParams()
  const dispatch = useDispatch();
  const getResponse = useSelector(getResponseSelector);
  const latestDraftData = useSelector(getLatestDraftSelector);
  const responseData = !isModal ? latestDraftData : getResponse;
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

  // const Control_ID = query.get('Assessment_id') || !isModal ? 'ATR_MJE_01a-K' : '';
  const Control_ID = Assessment_id || query.get('Control_ID')
  const handleClose = () => {
    if (startEdit && responseData?.data?.Attempt_no <= 5) {
      Swal.fire({
        title: 'Do you want save as draft!',
        text: `Remaining response ${responseData?.data?.Attempt_no
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
    dispatch(getQuestions({ Control_ID: 'Standard' }));
    dispatch(
      getKPIData({
        MICS_code: Control_ID,
        Entity_ID: 'Argentina',
      }),
    );
    setTimeout(() => {
      if (!isModal) {
        dispatch(getLatestDraft({ assessment_id: Control_ID }));
      } else {
        dispatch(
          getAssessmentAns({
            assessment_id: Control_ID,
            cowner: accounts[0]?.username,
          }),
        );
      }

      dispatch(getAssessmentSection2Ans({ MICS_code: Control_ID, Entity_ID: 'Argentina' }));
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
  console.log('responseData', responseData);
  useEffect(() => {
    if (responseData.data?.Latest_response) {
      if (responseData.data?.Latest_response.s1)
        setAnsSection1(responseData.data?.Latest_response.s1);

      if (responseData.data?.Latest_response?.s3?.length > 0) {
        const section3Data = responseData.data?.Latest_response?.s3?.reduce(
          (acc, [k, v]) => ((acc[k] = v), acc),
          {},
        );
        setAnsSection3(section3Data);
        setShowMoreSection(true);
        if (section3Data.L2) {
          setTimeout(() => {
            dispatch(getSection3Questions({ Level: 'L2', Control_ID: Control_ID }));
          }, 1000);
        }
        if (section3Data.L3) {
          setTimeout(() => {
            dispatch(getSection3Questions({ Level: 'L3', Control_ID: Control_ID }));
            setTerminating(true);
          }, 2000);
        }
      }
    }
  }, [responseData.data]);
  const handleSubmit = () => {
    Swal.fire({
      title: 'Do you want Submit assessment',
      text: `Remaining response ${responseData?.data?.Attempt_no
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
        setLoading(true);
        dispatch(addAssessmentSection2Ans({ kpis: tableData }));
        const payload = {
          Assessment_ID: Control_ID,
          Assessment_result: 'Pass',
          Latest_response: {
            s1: ansSection1,
            s3: Object.entries({ ...ansSection3, noQueAns: showNoQuestionAns }),
            // s2:,
          },
          event: {
            onSuccess: () => {
              setLoading(false);
              if (showNoQuestionAns) {
                Swal.fire('Your Assesment has been failed', '', 'success');
              } else {
                Swal.fire('Your Assesment has been passed', '', 'success');
              }
              history.push('/');
            },
          },
        };
        dispatch(addAssessmentAns(payload));
      }
      if (result.isDenied) {
        if (responseData?.data?.Attempt_no >= 5) {
          Swal.fire("You don't have a limited", '', 'error');
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
  };

  const handleSaveDraft = () => {
    if (responseData?.data?.Attempt_no >= 5) {
      Swal.fire("You don't have a limited", '', 'error');
      return;
    }
    Swal.fire({
      title: 'Do you want save draft?',
      text: `Remaining response ${responseData?.data?.Attempt_no
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
          Assessment_ID: Control_ID,
          Latest_response: {
            s1: ansSection1,
            s3: Object.entries({ ...ansSection3, noQueAns: showNoQuestionAns }),
          },
          events: {
            onSeccess: () => {
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

  if (!isModal)
    return (
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
        handleSaveDraft={handleSaveDraft}
        loadingSubmit={loading}
        handleSaveDraftProps={{
          disabled: responseData?.data?.Attempt_no >= 5,
          style: { width: 128 },
          loading: addOrEditUpdateDraft.loading,
        }}
        setStartEdit={setStartEdit}
      />
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