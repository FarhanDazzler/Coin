import React from 'react';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import Section0 from './FormComponents/Section0';
import '../LetterFormStyle.scss';

const FunctionalLetterForm = (props) => {
  const scopeData = props.location.state.data?.scopeData;
  const modalType = props.location.state.data?.modalType;
  return (
    <div>
      <PageWrapper>
        <Section0 scopeData={scopeData} />
      </PageWrapper>
    </div>
  );
};

export default FunctionalLetterForm;
