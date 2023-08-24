import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';

const Section0 = ({ scopeData }) => {
  //const getQuestions = useSelector(getQuestionsSelector);

  const dispatch = useDispatch();

  return (
    <div className="Rep-Letter-form-Section0">
      <CollapseFrame title="Scope and Instructions" active>
        <div className="renderBlockWrapper mt-5">
          something here
          {scopeData}
          <div id="lastShow" />
        </div>
      </CollapseFrame>
    </div>
  );
};

export default Section0;
