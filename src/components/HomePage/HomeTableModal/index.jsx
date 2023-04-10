import React, { useEffect, useState } from 'react';
import CustomModal from '../../UI/CustomModal';
import { useHistory } from 'react-router-dom';
import ControlActions from './ControlActions';
import './homeTableModalStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAssessmentAns,
  addOrUpdateDraft,
  getAssessmentAns,
  getKPIData,
  getLatestDraft,
  getQuestions,
} from '../../../redux/Assessments/AssessmentAction';
import {
  getLatestDraftSelector,
  getQuestionsSelector,
} from '../../../redux/Assessments/AssessmentSelectors';
import Swal from 'sweetalert2';
import { useMsal } from '@azure/msal-react';
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
  const Control_ID = query.get('Control_ID') || !isModal ? 'ATR_MJE_01a-Kss' : '';
  const { accounts } = useMsal();
  const handleClose = () => {
    history.push('/new');
  };
  console.log('@@@@', latestDraftData?.data?.Attempt_no);
  useEffect(() => {
    dispatch(getAssessmentAns({ COwner: 'jaymin@ab-inbev.com', Control_ID: Control_ID }));
    dispatch(getQuestions({ Control_ID: 'Standard' }));
    dispatch(getLatestDraft({ assessment_id: Control_ID }));
    dispatch(
      getKPIData({
        MICS_code: 'ATR_MJE_01a-K',
        Entity_ID: 'Argentina',
      }),
    );
  }, []);

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
          }, 2000);
        }
      }
    }
  }, [latestDraftData.data]);
  console.log('latestDraftData?.data?.Attempt_no', latestDraftData?.data?.Attempt_no);

  const handleSubmit = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Remaining response ${
        latestDraftData?.data?.Attempt_no
          ? 4 - latestDraftData?.data?.Attempt_no
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
      // customClass: {
      //   denyButton: latestDraftData?.data?.Attempt_no >= 5 ? 'btn-disabled' : '',
      // },
    }).then((result) => {
      // debugger
      if (result.isConfirmed) {
        const payload = {
          Assessment_ID: '',
          Response_ID: '',
          Control_ID: 'ATR_MJE_01a-K',
          COwner: 'jaymin@ab-inbev.com',
          Response_Data: JSON.stringify({
            s1: ansSection1,
            s3: ansSection3,
          }),
          Time_Stamp: '01/30/2023',
        };
        dispatch(addAssessmentAns(payload));
        // dispatch(updateAssessmentAns(payload));
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
        // Swal.fire('Saved!', '', 'success');
        // history.push('/');
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
      />
    </CustomModal>
  );
};

export default HomeTableModal;
