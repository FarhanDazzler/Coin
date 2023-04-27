import React, { useState } from 'react';
import CustomModal from '../../components/UI/CustomModal';
import './AssessmentBankLandingPage.scss';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import PageWrapper from '../../components/wrappers/PageWrapper';
import AssessmentbankTable from '../../components/Assessmentbank/AssessmentbankTable';
import AssessmentBankFilterButtons from '../../components/Assessmentbank/Filter/AssessmentBankFilterButtons';

const AssessmentBankLandingPage = () => {
  const history = useHistory();
  const handleSheduleSurvey = () => {
    history.push('/assessmentbank/schedule-survey');
  };
  return (
    <PageWrapper>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <AssessmentBankFilterButtons handleSheduleSurvey={handleSheduleSurvey} />
            <AssessmentbankTable />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AssessmentBankLandingPage;
