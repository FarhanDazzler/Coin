import React, { useEffect } from 'react';
import PageWrapper from '../../../../../components/wrappers/PageWrapper';
import '../../../../MDM/MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { useDispatch, useSelector } from 'react-redux';
import BuMasterdataTable from './Tables/BuMasterdataTables';
import { getRlBuMasterdata } from '../../../../../redux/REP_Letters/RLMDM/RLMDMAction';

const RL_MDM_BUMasterdataManagementLandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRlBuMasterdata());
  }, [])

  return (
    <PageWrapper>
      <div className="col-12 col-lg-12">
        <NavTabsMDM />
       <BuMasterdataTable />
      </div>
    </PageWrapper>
  );
};

export default RL_MDM_BUMasterdataManagementLandingPage;
