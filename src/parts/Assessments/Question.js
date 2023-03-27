import React from 'react';
import { useParams } from 'react-router-dom';

import Details from '../../components/Sections/Details';
import AssessmentForm from '../../components/Sections/AssessmentForm';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAssessmentAns } from '../../redux/Assessments/AssessmentAction';
import ControlActions from '../../components/HomePage/HomeTableModal/ControlActions';
import {
  getControlDataAction,
  getControlDataGcdAction,
} from '../../redux/ControlData/ControlDataAction';
import { useMsal } from '@azure/msal-react';
import './Questions.scss';
import DashboardTable from '../../components/HomePage/HomePageTable/HomePageTableComponent';
import PageWrapper from '../../components/wrappers/PageWrapper';
import HomeTableModal from '../../components/HomePage/HomeTableModal';

const Question = () => {
  // const { Assessment_id } = useParams();
  const Assessment_id = 'ATR_MJE_01a-K';
  const { accounts } = useMsal();
  const dispatch = useDispatch();

  useEffect(() => {
    let payload = {
      controlId: Assessment_id,
      coOwner: accounts.length > 0 ? accounts[0].username : '',
    };
    let gcdPayload = {
      controlId: Assessment_id,
    };
    dispatch(getControlDataAction(payload));
    dispatch(getControlDataGcdAction(gcdPayload));
    dispatch(getAssessmentAns({ COwner: 'jaymin@ab-inbev.com', Control_ID: Assessment_id }));
  }, []);

  return (
    <div className="text-left container">
      <HomeTableModal isModal={false} />
    </div>
  );
};

export default Question;
