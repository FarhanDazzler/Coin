import React from 'react';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import Section0 from './FormComponents/Section0';
import '../LetterFormStyle.scss';

const FunctionalLetterForm = (props) => {
  const scopeData = props.location.state.data?.scopeData;
  const tableData = props.location.state.data?.tableData;
  return (
    <div>
      <PageWrapper>
        <Section0 scopeData={tableData} />
      </PageWrapper>
    </div>
  );
};

export default FunctionalLetterForm;
