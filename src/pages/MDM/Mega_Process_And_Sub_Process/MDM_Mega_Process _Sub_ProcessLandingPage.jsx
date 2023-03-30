import React, { useEffect, useState } from 'react';
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
  // console.log(orgStructures.data, 'Org Structure data from API');

  return (
    <PageWrapper>
      <NavTabsMDM />
      <MegaAndSubprocessViewTable />
      {!!megaAndSubprocessManageButtonState && <MegaAndSubprocessTable />}
    </PageWrapper>
  );
};

export default MDM_Mega_Process_Sub_ProcessLandingPage;
