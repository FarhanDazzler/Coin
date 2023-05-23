import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { useParams } from 'react-router-dom';
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
  const history = useHistory();
  const {state} = useLocation();
  const query = new URLSearchParams(history.location.pathname);
  // console.log('Assessment_id',Assessment_id)
  // const Assessment_id = 'ATR_MJE_01a-K';
  const { accounts } = useMsal();
  const dispatch = useDispatch();
  const Id= Assessment_id||query.get('Assessment_id')
  useEffect(() => {
    let payload = {
      controlId: Id,
      coOwner: accounts.length > 0 ? accounts[0].username : '',
    };
    let gcdPayload = {
      controlId: Id,
    };
    dispatch(getControlDataAction(payload));
    dispatch(getControlDataGcdAction(gcdPayload));
    dispatch(getAssessmentAns({ COwner: state?.Control_Owner, Control_ID: state.id }));
  }, []);
  return (
    <div className="text-left container">
      <HomeTableModal isModal={false} activeData={state}/>
    </div>
  );
};

export default Question;
