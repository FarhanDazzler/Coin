import React, { useEffect } from 'react';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import MDMBox from '../../../MDM/MDMBox/MDMBox';
import '../../../MDM/MDMStyle.scss';
import './RLMDMStyle.scss';

const RLMDM = () => {
  return (
    <PageWrapper>
      <div className="container-fluid py-5" style={{ display: 'flex' }}>
        <div
          className="col-lg-6 py-4"
          style={{
            marginRight: '16px',
            background: 'rgba(92, 92, 92, 0.2)',
            backdropFilter: 'blur(20px)',
            padding: '30px',
            borderRadius: '24px',
            height: '50%'
          }}
        >
          <MDMBox
            title="Organization Hierarchy"
            description="Create or modify a Organization within the Organization Hierarchy"
            url="/REP-Letters/master-data-management/organization-hierarchy"
          />
        </div>
        {localStorage.getItem('selected_module_Role') == 'BU Representation Letter' ? (
          <div className="col-lg-6 py-4 MDMBoxWrapper">
            <MDMBox
              title="Zone Masterdata Management"
              description="Assign Zone Master Data within the Organization Hierarchy."
              url="/REP-Letters/master-data-management/bu-zone-masterdata-management"
            />
            <MDMBox
              title="BU Masterdata Management"
              description="Assign BU Master Data within the Organization Hierarchy."
              url="/REP-Letters/master-data-management/bu-masterdata-management"
            />
          </div>
        ) : (
          <div className="col-lg-6 py-4 MDMBoxWrapper">
            <MDMBox
              title="Functional Masterdata management"
              description="Create or modify Function related Framework table."
              url="/REP-Letters/master-data-management/functional-masterdata-management"
            />
            <MDMBox
              title="Site & Plant Masterdata management"
              description="Master Data Table for Sites and Plants."
              url="/REP-Letters/master-data-management/site-and-plant-masterdata-management"
            />
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default RLMDM;
