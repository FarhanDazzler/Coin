import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DotSpinner } from '@uiball/loaders';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import Section0 from './FormComponents/Section0';
import Section1 from './FormComponents/Section1';
import { getFunctionalInstructions } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import { get_Function_Questions } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import {
  get_Function_QuestionsSelector,
  getFunctionalInstructionsSelector,
} from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';
import '../LetterFormStyle.scss';

const FunctionalLetterForm = (props) => {
  const dispatch = useDispatch();
  const scopeData = props.location.state.data?.scopeData;
  const modalType = props.location.state.data?.modalType;

  const questionState = useSelector(get_Function_QuestionsSelector);
  const instructionState = useSelector(getFunctionalInstructionsSelector);

  useEffect(() => {
    let payload = {
      function: scopeData?.Function,
    };
    dispatch(getFunctionalInstructions());
    dispatch(get_Function_Questions(payload));
  }, []);

  return (
    <div>
      <PageWrapper>
        {instructionState.loading || questionState.loading ? (
          <div className="loader-animation">
            <DotSpinner size={100} speed={0.9} color="#e3af32" />
            <p className="loader-Desc ml-3">Please wait while we are Loading letter for you</p>
          </div>
        ) : (
          <div className="col-lg-12">
            <Section0 scopeData={scopeData} />
            <Section1 questions={questionState.data} scopeData={scopeData} />
          </div>
        )}
      </PageWrapper>
    </div>
  );
};

export default FunctionalLetterForm;
