import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

// Components import
import { getAssessmentAns } from '../../redux/Assessments/AssessmentAction';
import {
  getControlDataAction,
  getControlDataGcdAction,
} from '../../redux/ControlData/ControlDataAction';
import './AssessmentForm.scss';
import PageWrapper from '../../components/wrappers/PageWrapper';
import { getControlOwnerDataSelector } from '../../redux/DashBoard/DashBoardSelectors';
import AssessmentFormView from './AssessmentFormView';

const AssessmentForm = (props) => {
  // Get URL parms
  const { Assessment_id } = useParams();
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  // const Assessment_id = 'ATR_MJE_01a-K';
  const { accounts } = useMsal();
  const dispatch = useDispatch();
  const getControlOwnerData = useSelector(getControlOwnerDataSelector);
  const id = query.get('id');
  const Id = id || Assessment_id || query.get('Assessment_id');
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
    const ownerData = (getControlOwnerData.data[0]?.cOwnerData || []).find(
      (d) => d.id === assessment_id,
    );
    if (!ownerData && !state) return;
    let payload = {
      controlId: control_id,
      coOwner: Control_Owner,
      provider: Provider,
      ownerData,
    };
    let gcdPayload = {
      controlId: control_id,
    };
    // GET Assessment and ans API call
    dispatch(getControlDataAction(payload));
    dispatch(getControlDataGcdAction(gcdPayload));
    dispatch(getAssessmentAns({ assessment_id: assessment_id }));
  }, []);

  return (
    // PageWrapper Component to create automatically dark background
    <PageWrapper>
      <div className="text-left container-fluid">
        {/*Assessment form page Component here isModal props show inside modal view*/}
        <AssessmentFormView isModal={true} activeData={state} />
      </div>
    </PageWrapper>
  );
};

export default AssessmentForm;
