import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './review.scss';
import AssessmentFormView from '../AssessmentForm/AssessmentFormView';
import {
  getControlDataAction,
  getControlDataGcdAction,
} from '../../redux/ControlData/ControlDataAction';
import { useDispatch } from 'react-redux';

const Review = () => {
  const dispatch = useDispatch();
  const params = new URL(document.location).searchParams;

  const { control_id } = useParams();
  const assessment_id = decodeURIComponent(params.get('id'));
  const Provider = decodeURIComponent(params.get('Provider'));
  const Receiver = decodeURIComponent(params.get('Receiver'));
  const Control_Owner = decodeURIComponent(params.get('coOwner'));
  const Control_Oversight = decodeURIComponent(params.get('Control_Oversight'));
  const KPI_From = decodeURIComponent(params.get('KPI_From'));
  const KPI_To = decodeURIComponent(params.get('KPI_To'));
  const BU = decodeURIComponent(params.get('BU'));
  const Assessment_Cycle = decodeURIComponent(params.get('Assessment_Cycle'));
  const Year = decodeURIComponent(params.get('Year'));
  const Question_Bank = decodeURIComponent(params.get('Question_Bank'));

  const state = {
    assessment_id: assessment_id,
    control_id: control_id,
    Provider,
    Receiver,
    Control_Owner,
    Control_Oversight,
    KPI_From,
    KPI_To,
    BU,
    Year,
    Assessment_Cycle,
    Question_Bank,
  };

  useEffect(() => {
    let payload = {
      controlId: control_id,
      coOwner: Control_Owner,
      provider: Provider,
    };
    let gcdPayload = {
      controlId: control_id,
    };

    dispatch(getControlDataAction(payload));
    dispatch(getControlDataGcdAction(gcdPayload));
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {control_id && <AssessmentFormView isReview={true} activeData={state} />}
      </div>
    </div>
  );
};

export default Review;
