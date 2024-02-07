import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './review.scss';
import { useTranslation } from 'react-i18next';
import AssessmentFormView from '../AssessmentForm/AssessmentFormView';
import {
  getControlDataAction,
  getControlDataGcdAction,
} from '../../redux/ControlData/ControlDataAction';
import { useDispatch } from 'react-redux';

const Review = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const Control_ID = query.get('Control_ID');
  const id = query.get('id');
  const Provider = query.get('Provider') || query.get('provider');
  const Control_Owner = query.get('Control_Owner') || query.get('coOwner');
  const Question_Bank = query.get('Question_Bank');
  const Receiver = query.get('Receiver');
  const KPI_From = query.get('KPI_From');
  const KPI_To = query.get('KPI_To');
  const dispatch = useDispatch();

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

  useEffect(() => {
    let payload = {
      controlId: Control_ID || id,
      coOwner: Control_Owner,
      provider: Provider,
    };
    let gcdPayload = {
      controlId: Control_ID || id,
    };

    dispatch(getControlDataAction(payload));
    dispatch(getControlDataGcdAction(gcdPayload));
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {Control_ID && <AssessmentFormView isReview={true} activeData={state} />}
      </div>
    </div>
  );
};

export default Review;
