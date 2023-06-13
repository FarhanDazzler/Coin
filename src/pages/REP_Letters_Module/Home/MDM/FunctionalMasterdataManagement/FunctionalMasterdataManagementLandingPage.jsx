import React, { useEffect } from 'react';
import PageWrapper from '../../../../../components/wrappers/PageWrapper';
import '../../../../MDM/MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { useDispatch, useSelector } from 'react-redux';
import FunctionalMasterdataTable from './Tables/FunctionalMasterdataTables';
import { getRlFunctionalMasterdata } from '../../../../../redux/REP_Letters/RLMDM/RLMDMAction';
import EditIcon from '@mui/icons-material/Edit';

const RL_MDM_FunctionalMasterdataManagementLandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRlFunctionalMasterdata());
  }, [])

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
