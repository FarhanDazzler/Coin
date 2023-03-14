import React, { useState } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';

const MDM_OrganizationHierarchyLandingPage = () => {
  return (
    <PageWrapper>
      <NavTabsMDM />
      <div className="container py-5" style={{ display: 'flex' }}>
        <div className="col-lg-6 py-4 MDMBoxWrapper" style={{ marginRight: '16px' }}>
          <h1>Organization Hierarchy Tables</h1>
        </div>
      </div>
    </PageWrapper>
  );
};

export default MDM_OrganizationHierarchyLandingPage;
