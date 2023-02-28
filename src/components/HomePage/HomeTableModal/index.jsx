import React, { useEffect, useState } from 'react';
import CustomModal from '../../UI/CustomModal';
import { useHistory } from 'react-router-dom';
import ControlActions from './ControlActions';
import './homeTableModalStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
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

const HomeTableModal = () => {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const dispatch = useDispatch();
  const questionsInfo = useSelector(getQuestionsSelector);
  const ans = localStorage.getItem('userAns');
  const [showMoreSection, setShowMoreSection] = useState(false);
  const [terminating, setTerminating] = useState(false);
  const Control_ID = query.get('Control_ID');
  const handleClose = () => {
    history.push('/new');
  };

  useEffect(() => {
    dispatch(getAssessmentAns({ COwner: 'jaymin@ab-inbev.com', Control_ID: Control_ID }));
    dispatch(getQuestions({ Control_ID: Control_ID }));
    dispatch(
      getKPIData({
        ControlID: 'ATR_ACCR_01b-K',
        Entity: 'Argentina',
      }),
    );
  }, []);

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
              />
              {showMoreSection && (
                <>
                  <ControlSection2 />
                  <ControlSection3 setTerminating={setTerminating} />
                </>
              )}

              {terminating && (
                <Button color="neutral" className="w-100">
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
