import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import Section0 from './FormComponents/Section0';
import Section1 from './FormComponents/Section1';
import { getFunctionalInstructions } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import { get_BU_Questions } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import { get_BU_QuestionsSelector } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';
import '../LetterFormStyle.scss';

const FunctionalLetterForm = (props) => {
  const dispatch = useDispatch();
  const scopeData = props.location.state.data?.scopeData;
  const modalType = props.location.state.data?.modalType;

  const get_BU_QuestionState = useSelector(get_BU_QuestionsSelector);

  useEffect(() => {
    let payload = {
      type: 'BU',
    };
    dispatch(getFunctionalInstructions());
    dispatch(get_BU_Questions(payload));
  }, []);

  return (
    <div>
      <PageWrapper>
        <div className="col-lg-12">
          <Section0 scopeData={scopeData} />
          <Section1 questions={get_BU_QuestionState.data} scopeData={scopeData} />
        </div>
      </PageWrapper>
    </div>
  );
};

export default FunctionalLetterForm;
