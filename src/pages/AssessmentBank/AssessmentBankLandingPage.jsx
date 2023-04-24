import React, { useState } from 'react';
import CustomModal from '../../components/UI/CustomModal';
import './AssessmentBankLandingPage.scss';
import Stepper from './Stepper';
import PageWrapper from '../../components/wrappers/PageWrapper';
import AssessmentbankTable from '../../components/Assessmentbank/AssessmentbankTable';
import AssessmentBankFilterButtons from '../../components/Assessmentbank/Filter/AssessmentBankFilterButtons';

const AssessmentBankLandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const handleSheduleSurvey = () => {
    setShowModal(true);
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

      <CustomModal
        className="schedule-survey"
        open={showModal}
        onClose={() => setShowModal(false)}
        width={900}
        title="Schedule Survey"
        bodyClassName="p-0"
      >
        <Stepper />
      </CustomModal>
    </PageWrapper>
  );
};

export default AssessmentBankLandingPage;
