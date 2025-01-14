import React, { useEffect } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { useDispatch, useSelector } from 'react-redux';

import { getMegaAndSubprocessView, getMegaAndSubprocess } from '../../../redux/MDM/MDM_Action';
import MegaAndSubprocessViewTable from './Tables/MegaAndSubprocessView/MegaAndSubprocessViewTable';
import MegaAndSubprocessTable from './Tables/MegaAndSubprocess/MegaAndSubprocessTable';
import { megaAndSubprocessManageButtonSelector } from '../../../redux/MDM/MDM_Selectors';

const MDM_Mega_Process_Sub_ProcessLandingPage = () => {
  const dispatch = useDispatch();

  // API Call using dispatch
  useEffect(() => {
    dispatch(getMegaAndSubprocessView());
    dispatch(getMegaAndSubprocess());
  }, []);

  const megaAndSubprocessManageButtonState = useSelector(megaAndSubprocessManageButtonSelector);

  // to select data from redux store using selector
  // const orgStructures = useSelector(getOrgStructuresSelector);

  return (
    <PageWrapper>
      <div className="col-12 col-lg-12">
        <NavTabsMDM />
        <MegaAndSubprocessViewTable />
        {localStorage.getItem('selected_Role') === 'Global Internal Control' && (
          <>{!!megaAndSubprocessManageButtonState && <MegaAndSubprocessTable />}</>
        )}
      </div>
    </PageWrapper>
  );
};

export default MDM_Mega_Process_Sub_ProcessLandingPage;
