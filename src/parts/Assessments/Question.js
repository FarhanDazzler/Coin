import React from 'react';
import { useParams } from 'react-router-dom';

import Details from '../../components/Sections/Details';
import AssessmentForm from '../../components/Sections/AssessmentForm';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAssessmentAns } from '../../redux/Assessments/AssessmentAction';

const Question = () => {
  const { Assessment_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssessmentAns({ COwner: "jaymin@ab-inbev.com", Control_ID: "ATR_MJE_01a-K" }));
  }, []);
  return (
    <>
      <div className="container text-left">
        <Details control_id={Assessment_id} />
        <AssessmentForm control_id={Assessment_id} />
      </div>
    </>
  );
};

export default Question;
