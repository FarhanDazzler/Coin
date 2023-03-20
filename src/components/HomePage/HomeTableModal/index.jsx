import React, { useEffect, useState } from 'react';
import CustomModal from '../../UI/CustomModal';
import { useHistory } from 'react-router-dom';
import ControlActions from './ControlActions';
import './homeTableModalStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAssessmentAns,
  getAssessmentAns,
  getKPIData,
  getQuestions,
} from '../../../redux/Assessments/AssessmentAction';
import ControlSection1 from './ControlSection1';
import ControlSection2 from './ControlSection2';
import ControlSection3 from './ControlSection3';
import Button from '../../UI/Button';
import { getQuestionsSelector } from '../../../redux/Assessments/AssessmentSelectors';
import { Loader } from '@mantine/core';
import { getSection3Questions } from '../../../redux/Questions/QuestionsAction';
import Swal from 'sweetalert2';
import { useMsal } from '@azure/msal-react';
import {
  getControlDataAction,
  getControlDataGcdAction,
} from '../../../redux/ControlData/ControlDataAction';

const HomeTableModal = () => {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const dispatch = useDispatch();
  const questionsInfo = useSelector(getQuestionsSelector);
  const [ansSection1, setAnsSection1] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [ansSection3, setAnsSection3] = useState({});
  const [showNoQuestionAns, setShowNoQuestionAns] = useState('');
  const [showMoreSection, setShowMoreSection] = useState(false);
  const [terminating, setTerminating] = useState(false);
  const Control_ID = query.get('Control_ID');
  const { accounts } = useMsal();
  const handleClose = () => {
    history.push('/new');
  };

  useEffect(() => {
    dispatch(getAssessmentAns({ COwner: 'jaymin@ab-inbev.com', Control_ID: Control_ID }));
    dispatch(getQuestions({ Control_ID: 'Standard' }));
    dispatch(
      getKPIData({
        MICS_code: 'ATR_ACCR_01b-K',
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

  const handleSubmit = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'golden',
      cancelButtonColor: 'black',
      confirmButtonText: 'Yes, submit it!',
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
            s2: tableData,
            s3: { ansSection3, showNoQuestionAns },
          }),
          Time_Stamp: '01/30/2023',
        };
        dispatch(addAssessmentAns(payload));
        // dispatch(updateAssessmentAns(payload));
      }
    });
  };

  return (
    <div>
      <CustomModal
        bodyClassName="p-0"
        open={!!Control_ID}
        title={Control_ID}
        width={1080}
        onClose={handleClose}
      >
        <div className="modal-form-body">
          <ControlActions />

          {questionsInfo.loading ? (
            <div className="d-flex w-100 align-items-center justify-content-center py-5 my-5">
              <Loader color="#d3a306" />
            </div>
          ) : (
            <div className="p-5">
              <ControlSection1
                setTerminating={setTerminating}
                setShowMoreSection={setShowMoreSection}
                ans={ansSection1}
                setAns={setAnsSection1}
              />
              {showMoreSection && (
                <>
                  <ControlSection2 tableData={tableData} setTableData={setTableData} />
                  <ControlSection3
                    setTerminating={setTerminating}
                    ans={ansSection3}
                    setAns={setAnsSection3}
                    showNoQuestionAns={showNoQuestionAns}
                    setShowNoQuestionAns={setShowNoQuestionAns}
                  />
                </>
              )}

              {terminating && (
                <Button color="neutral" className="w-100" id="submit-button" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </div>
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default HomeTableModal;
