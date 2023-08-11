import React, { useState } from 'react';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import SelectAssessmentDetailsFunctional from './SelectAssessmentFunctionalDetails';


const ScheduleSurveyFunctionalPage = () => {


  return (
    <PageWrapper>
      <div className="container-fluid py-5">
        <div className="col-lg-12 py-4 AssessmentBankBoxWrapper">
          <div id="schedule-survey" className="content">
            <div className="wrapper">
              <h4 className="AssessmentBank-inputPage-title">Schedule Functional Letter</h4>
              <div className="AssessmentBankInnerBoxWrapper">
                <SelectAssessmentDetailsFunctional />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ScheduleSurveyFunctionalPage;
