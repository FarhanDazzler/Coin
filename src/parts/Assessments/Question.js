import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useMsal } from '@azure/msal-react';

import { getAssessmentAns } from '../../redux/Assessments/AssessmentAction';
import {
  getControlDataAction,
  getControlDataGcdAction,
} from '../../redux/ControlData/ControlDataAction';
import './Questions.scss';
import HomeTableModal from '../../pages/Home/V2/InternalControlHomePage/HomeTableModal';

const Question = () => {
  const { Assessment_id } = useParams();
  // console.log('Assessment_id',Assessment_id)
  // const Assessment_id = 'ATR_MJE_01a-K';
  const { accounts } = useMsal();
  const dispatch = useDispatch();

  useEffect(() => {
    let payload = {
      controlId: Assessment_id,
      coOwner: accounts.length > 0 ? accounts[0].username : '',
    };
    let gcdPayload = {
      controlId: Assessment_id,
    };
    dispatch(getControlDataAction(payload));
    dispatch(getControlDataGcdAction(gcdPayload));
    dispatch(getAssessmentAns({ COwner: accounts[0].username, Control_ID: Assessment_id }));
  }, []);

  return (
    <div className="text-left container">
      <HomeTableModal isModal={false} />
    </div>
  );
};

export default Question;
