import React, { useState } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../MDMStyle.scss';

const MDM_Mega_Process_Sub_ProcessLandingPage = () => {
  return (
    <PageWrapper>
      <div className="container py-5" style={{ display: 'flex' }}>
        <div className="col-lg-6 py-4 MDMBoxWrapper" style={{ marginRight: '16px' }}>
          <h1>Mega Process & Sub-Process Tables</h1>
        </div>
      </div>
    </PageWrapper>
  );
};

export default MDM_Mega_Process_Sub_ProcessLandingPage;
