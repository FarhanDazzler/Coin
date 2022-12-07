import React from 'react';
import { useParams } from 'react-router-dom';

import Details from '../../components/Sections/Details';
import AssessmentForm from '../../components/Sections/AssessmentForm';

const Question = () => {
  const { Assessment_id } = useParams();
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
