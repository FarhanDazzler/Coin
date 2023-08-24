import React from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import FunctionalHomePage from './Functional/FunctionalHomePage.jsx';

const REP_Letters_HomePage = () => {
  const selected_module_role = localStorage.getItem('selected_module_Role');
  return (
    <div>
      <PageWrapper>
        {selected_module_role === 'Functional' ? <FunctionalHomePage /> : <FunctionalHomePage />}
      </PageWrapper>
    </div>
  );
};

export default REP_Letters_HomePage;
