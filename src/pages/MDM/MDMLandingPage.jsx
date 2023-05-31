import React, { useState } from 'react';
import PageWrapper from '../../components/wrappers/PageWrapper';
import MDMBox from './MDMBox/MDMBox';
import './MDMStyle.scss';

const MDM = () => {
  return (
    <PageWrapper>
      <div className="container-fluid py-5" style={{ display: 'flex' }}>
        <div className="col-lg-6 py-4 MDMBoxWrapper" style={{ marginRight: '16px' }}>
          <MDMBox
            title="Organization Hierarchy"
            description="Create or modify a Organization within the Organization Hierarchy"
            url="/master-data-management/organization-hierarchy"
          />
          <MDMBox
            title="Applicability & Assignment of Provider Organization"
            description="Assign Provider Organizations to applicable Control IDs."
            url="/master-data-management/applicability-assignment-of-provider-organization"
          />
          <MDMBox
            title="Control Owner & Oversight"
            description="Assign new or modify existing Control Owner & Oversight."
            url="/master-data-management/co-owner-oversight"
          />
        </div>
        <div className="col-lg-6 py-4 MDMBoxWrapper">
          <MDMBox
            title="MICS Framework"
            description="Create or modify MICS in the MICS Framework table."
            url="/master-data-management/mics-framework"
          />
          <MDMBox
            title="Mega Process & Sub-Process"
            description="Create or modify Mega Process & Sub-Process names."
            url="/master-data-management/mega-process-sub-Process"
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default MDM;
