import React, { useEffect } from 'react';
import PageWrapper from '../../../../../components/wrappers/PageWrapper';
import '../../../../MDM/MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { useDispatch, useSelector } from 'react-redux';
import BuZoneMasterdataTable from './Tables/BuZoneMasterdataTable';

const BUZoneMasterDataManagementLandingPage = () => {
  return (
    <PageWrapper>
      <div className="col-12 col-lg-12">
        <NavTabsMDM />
        <BuZoneMasterdataTable />
      </div>
    </PageWrapper>
  );
};

export default BUZoneMasterDataManagementLandingPage;
