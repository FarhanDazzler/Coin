import React, { useEffect } from 'react';
import PageWrapper from '../../../../../components/wrappers/PageWrapper';
import '../../../../MDM/MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import FunctionalMasterdataTable from './Tables/FunctionalMasterdataTables';

const RL_MDM_FunctionalMasterdataManagementLandingPage = () => {
  return (
    <PageWrapper>
      <div className="col-12 col-lg-12">
        <NavTabsMDM />
        <FunctionalMasterdataTable />
      </div>
    </PageWrapper>
  );
};

export default RL_MDM_FunctionalMasterdataManagementLandingPage;
