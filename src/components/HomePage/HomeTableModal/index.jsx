import React, { useEffect, useState } from 'react';
import CustomModal from '../../UI/CustomModal';
import { useHistory } from 'react-router-dom';
import './homeTableModalStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAssessmentAns,
  addAssessmentSection2Ans,
  addOrUpdateDraft,
  getAssessmentAns,
  getAssessmentSection2Ans,
  getKPIData,
  getLatestDraft,
  getQuestions,
} from '../../../redux/Assessments/AssessmentAction';
import {
  addOrEditUpdateDraftSelector,
  getLatestDraftSelector,
  getQuestionsSelector,
} from '../../../redux/Assessments/AssessmentSelectors';
import Swal from 'sweetalert2';
import RenderHomeModalTable from './RenderHomeModalTable';
import { getSection3Questions } from '../../../redux/Questions/QuestionsAction';

const HomeTableModal = ({ isModal = true }) => {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const dispatch = useDispatch();
  const latestDraftData = useSelector(getLatestDraftSelector);
  const questionsInfo = useSelector(getQuestionsSelector);
  const [ansSection1, setAnsSection1] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [ansSection3, setAnsSection3] = useState({});
  const [showNoQuestionAns, setShowNoQuestionAns] = useState('');
  const [showMoreSection, setShowMoreSection] = useState(false);
  const [terminating, setTerminating] = useState(false);
  const [startEdit, setStartEdit] = useState(false);
  const addOrEditUpdateDraft = useSelector(addOrEditUpdateDraftSelector);
  const Control_ID = query.get('Control_ID') || !isModal ? 'ATR_MJE_01a-K' : '';

  const handleClose = () => {
    if (startEdit && latestDraftData?.data?.Attempt_no <= 5) {
      Swal.fire({
        title: 'Are you sure?',
        text: `Remaining response ${
          latestDraftData?.data?.Attempt_no
            ? latestDraftData?.data?.Attempt_no < 5
              ? 4 - latestDraftData?.data?.Attempt_no
              : 0
            : latestDraftData?.data?.Attempt_no === 0
            ? '4'
            : '5'
        }`,
        icon: 'warning',
        showConfirmButton: false,
        showCancelButton: true,
        showDenyButton: true,
        denyButtonColor: 'silver',
        denyButtonText: 'Save draft!',
        denyButtonColor: 'gold',
      }).then((result) => {
        if (result.isDismissed) {
          history.push('/new');
        }
        if (result.isDenied) {
          if (latestDraftData?.data?.Attempt_no >= 5) {
            history.push('/new');
            return;
          }
          const payload = {
            Assessment_ID: Control_ID,
            Latest_response: {
              s1: ansSection1,
              s3: Object.entries(ansSection3),
            },
          };
          dispatch(addOrUpdateDraft(payload));
          setStartEdit(false);
        }
      });
      return;
    }
    history.push('/new');
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
      dispatch(
        getAssessmentAns({
          assessment_id: 'ATR_MJE_01a-K AB InBev India',
          cowner: 'Avi.Sehgal-ext@ab-inbev.com',
        }),
      );
      dispatch(getLatestDraft({ assessment_id: Control_ID }));

      dispatch(getAssessmentSection2Ans({ MICS_code: 'ATR_MJE_01a-K', Entity_ID: 'Argentina' }));
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
    if (latestDraftData.data?.Latest_response) {
      if (latestDraftData.data?.Latest_response.s1)
        setAnsSection1(latestDraftData.data?.Latest_response.s1);

      if (latestDraftData.data?.Latest_response.s3.length > 0) {
        const section3Data = latestDraftData.data?.Latest_response?.s3?.reduce(
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
  }, [latestDraftData.data]);

  const handleSubmit = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Remaining response ${
        latestDraftData?.data?.Attempt_no
          ? latestDraftData?.data?.Attempt_no < 5
            ? 4 - latestDraftData?.data?.Attempt_no
            : 0
          : latestDraftData?.data?.Attempt_no === 0
          ? '4'
          : '5'
      }`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'golden',
      cancelButtonColor: 'black',
      confirmButtonText: 'Yes, submit it!',
      showDenyButton: !(latestDraftData?.data?.Attempt_no >= 5),
      denyButtonText: 'Save draft!',
      denyButtonColor: 'silver',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(addAssessmentSection2Ans({ kpis: tableData }));
        const payload = {
          Assessment_ID: 'ATR_MJE_01a-K',
          Assessment_result: 'Pass',
          Latest_response: {
            s1: ansSection1,
            s3: Object.entries(ansSection3),
          },
          event: {
            onSuccess: () => {
              Swal.fire('Saved!', '', 'success');
              history.push('/new');
            },
          },
        };
        dispatch(addAssessmentAns(payload));
      }
      if (result.isDenied) {
        if (latestDraftData?.data?.Attempt_no >= 5) {
          return;
        }
        const payload = {
          Assessment_ID: Control_ID,
          Latest_response: {
            s1: ansSection1,
            s3: Object.entries(ansSection3),
          },
        };
        dispatch(addOrUpdateDraft(payload));
        setStartEdit(false);
      }
    });
  };

  const handleSaveDraft = () => {
    if (latestDraftData?.data?.Attempt_no >= 5) {
      return;
    }
    const payload = {
      Assessment_ID: Control_ID,
      Latest_response: {
        s1: ansSection1,
        s3: Object.entries(ansSection3),
      },
    };
    dispatch(addOrUpdateDraft(payload));
    setStartEdit(false);
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
        handleSaveDraftProps={{
          disabled: latestDraftData?.data?.Attempt_no >= 5,
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
        handleSaveDraftProps={{
          disabled: latestDraftData?.data?.Attempt_no >= 5,
          style: { width: 128 },
          loading: addOrEditUpdateDraft.loading,
        }}
        setStartEdit={setStartEdit}
      />
    </CustomModal>
  );
};

export default HomeTableModal;
