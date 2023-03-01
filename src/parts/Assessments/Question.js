import React from 'react';
import { useParams } from 'react-router-dom';

import Details from '../../components/Sections/Details';
import AssessmentForm from '../../components/Sections/AssessmentForm';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAssessmentAns } from '../../redux/Assessments/AssessmentAction';
import ControlActions from '../../components/HomePage/HomeTableModal/ControlActions';
import { getControlDataAction, getControlDataGcdAction } from '../../redux/ControlData/ControlDataAction';
import { useMsal } from '@azure/msal-react';

const Question = () => {
  const { Assessment_id } = useParams();
  const { accounts } = useMsal();
  const dispatch = useDispatch();

  useEffect(() => {
    let payload = {
      controlId : Assessment_id,
      coOwner: accounts.length > 0 ? accounts[0].username : ''
    }
    let gcdPayload = {
      controlId : Assessment_id,
    }
    dispatch(getControlDataAction(payload ));
    dispatch(getControlDataGcdAction(gcdPayload))
    dispatch(getAssessmentAns({ COwner: 'jaymin@ab-inbev.com', Control_ID: Assessment_id }));
  }, []);

  return (
    <>
      <div className="container text-left pb-5 mb-5">
        <ControlActions control_id={Assessment_id} />
        <AssessmentForm control_id={Assessment_id} />
      </div>
    </>
  );
};

export default Question;
