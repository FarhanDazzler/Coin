import React, { useEffect } from 'react';
import ModifyStandardChangeLang from './ModifyStandardChangeLang';
import { useDispatch } from 'react-redux';
import { getSection1QuestionTranslationDataAction } from '../../redux/QuestionBank/QuestionBankAction';

const QuestionBankChangeLanguage = () => {
  return <ModifyStandardChangeLang />;
};

export default QuestionBankChangeLanguage;
