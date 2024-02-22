import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

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
  const Provider = decodeURIComponent(params.get('Provider'));
  const Control_Owner =
    query.get('coOwner') ||
    decodeURIComponent(params.get('Control_Owner')) ||
    decodeURIComponent(params.get('coOwner'));

  console.log(
    'Control_Owner',
    query.get('coOwner'),
    decodeURIComponent(params.get('Control_Owner')),
  );
  const Question_Bank = decodeURIComponent(params.get('Question_Bank'));
  const Receiver = decodeURIComponent(params.get('Receiver'));
  const KPI_From = decodeURIComponent(params.get('KPI_From'));
  const KPI_To = decodeURIComponent(params.get('KPI_To'));
  const Year = decodeURIComponent(params.get('Year'));
  const state = {
    id: Assessment_id,
    Provider,
    Control_Owner,
    Question_Bank,
    Receiver,
    KPI_From,
    KPI_To,
  };

  useEffect(() => {
    const ownerData = (getControlOwnerData.data[0]?.cOwnerData || []).find(
      (d) => d.Control_ID === Id,
    );
    if (!ownerData && !state) return;
    let payload = {
      controlId: Id,
      coOwner: ownerData?.Control_Owner || state.Control_Owner,
      provider: ownerData?.Provider || state.Provider,
      ownerData,
    };
    let gcdPayload = {
      controlId: Id,
    };
    // GET Assessment and ans API call
    dispatch(getControlDataAction(payload));
    dispatch(getControlDataGcdAction(gcdPayload));
    dispatch(
      getAssessmentAns({ cowner: state?.Control_Owner || Control_Owner, assessment_id: Id }),
    );
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
