import React, { useState } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';

const MDM_ApplicabilityAndAssignmentOfProviderOrganizationLandingPage = () => {
  return (
    <PageWrapper>
      <NavTabsMDM />
      <div className="container py-5" style={{ display: 'flex' }}>
        <div className="col-lg-6 py-4 MDMBoxWrapper" style={{ marginRight: '16px' }}>
          <h1>Applicability & Assignment of Provider Organization</h1>
        </div>
      </div>
    </PageWrapper>
  );
};

export default MDM_ApplicabilityAndAssignmentOfProviderOrganizationLandingPage;
