import React, { useState } from 'react';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import SelectAssessmentDetailsBU from './SelectAssessmentDetails';


const ScheduleSurveyBUPage = () => {


  return (
    <PageWrapper>
      <div className="container-fluid py-5">
        <div className="col-lg-12 py-4 AssessmentBankBoxWrapper">
          <div id="schedule-survey" className="content">
            <div className="wrapper">
              <h4 className="AssessmentBank-inputPage-title">Schedule Assessment BU</h4>
              <div className="AssessmentBankInnerBoxWrapper">
                <SelectAssessmentDetailsBU />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ScheduleSurveyBUPage;
