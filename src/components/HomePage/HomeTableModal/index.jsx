import React, { useEffect } from 'react';
import CustomModal from '../../UI/CustomModal';
import { useHistory } from 'react-router-dom';
import ControlActions from './ControlActions';
import './homeTableModalStyles.scss';
import ControlFormModal from './ControlFormModal';
import { useDispatch } from 'react-redux';
import { getAssessmentAns } from '../../../redux/Assessments/AssessmentAction';

const HomeTableModal = () => {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const dispatch = useDispatch();

  const ans = localStorage.getItem('userAns');
  console.log('@@@@@@: ans', ans);
  const Control_ID = query.get('Control_ID');
  const handleClose = () => {
    history.push('/new');
  };

  useEffect(() => {
    dispatch(getAssessmentAns({ COwner: 'jaymin@ab-inbev.com', Control_ID: Control_ID }));
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
          <ControlFormModal Control_ID={Control_ID} />
        </div>
      </CustomModal>
    </div>
  );
};

export default HomeTableModal;
