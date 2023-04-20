import React from 'react';
import AssessmentbankTable from '../../components/Assessmentbank/AssessmentbankTable';
import FilterButtons from '../../components/FilterButtons';
import PageWrapper from '../../components/wrappers/PageWrapper';
import NoDataPlaceholder from '../../components/NoDataPlaceholder';

const AssessmentBankLandingPage = () => {
  const options1 = [
    {
      label: '',
      value: '',
    },
    {
      label: '',
      value: '',
    },
    {
      label: '',
      value: '',
    },
  ];
  return (
    <PageWrapper>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <FilterButtons />
            <AssessmentbankTable />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AssessmentBankLandingPage;
