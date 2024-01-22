import React from 'react';
import { useHistory } from 'react-router-dom';
import './review.scss';
import { useTranslation } from 'react-i18next';
import AssessmentFormView from '../AssessmentForm/AssessmentFormView';

const Review = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const Control_ID = query.get('Control_ID');
  const id = query.get('id');
  const Provider = query.get('Provider');
  const Control_Owner = query.get('Control_Owner');
  const Question_Bank = query.get('Question_Bank');
  const Receiver = query.get('Receiver');
  const KPI_From = query.get('KPI_From');
  const KPI_To = query.get('KPI_To');
  const state = {
    id,
    Provider,
    Control_Owner,
    Question_Bank,
    Receiver,
    KPI_From,
    KPI_To,
    Control_ID,
  };

  console.log('statestate', state);

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {Control_ID && <AssessmentFormView isReview={true} activeData={state} />}
      </div>
    </div>
  );
};

export default Review;
