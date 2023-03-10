import React, { useState } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../MDMStyle.scss';

const MDM_MICS_FrameworkLandingPage = () => {
  return (
    <PageWrapper>
      <div className="container py-5" style={{ display: 'flex' }}>
        <div className="col-lg-6 py-4 MDMBoxWrapper" style={{ marginRight: '16px' }}>
          <h1>MICS Framework</h1>
        </div>
      </div>
    </PageWrapper>
  );
};

export default MDM_MICS_FrameworkLandingPage;
