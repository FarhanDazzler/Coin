import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { useDispatch, useSelector } from 'react-redux';

import { getMegaAndSubprocessView, getMegaAndSubprocess } from '../../../redux/MDM/MDM_Action';
import MegaAndSubprocessViewTable from './Tables/MegaAndSubprocessView/MegaAndSubprocessViewTable';
import MegaAndSubprocessTable from './Tables/MegaAndSubprocess/MegaAndSubprocessTable';

const MDM_Mega_Process_Sub_ProcessLandingPage = () => {
  const dispatch = useDispatch();

  // API Call using dispatch
  useEffect(() => {
    dispatch(getMegaAndSubprocessView());
    dispatch(getMegaAndSubprocess());
  }, []);

  // to select data from redux store using selector
  // const orgStructures = useSelector(getOrgStructuresSelector);
  // console.log(orgStructures.data, 'Org Structure data from API');

  return (
    <PageWrapper>
      <NavTabsMDM />
      <MegaAndSubprocessViewTable />
      <MegaAndSubprocessTable />
      {/*<div className="container py-5" style={{ display: 'flex' }}>
        <div className="col-lg-6 py-4 MDMBoxWrapper" style={{ marginRight: '16px' }}>
          <h1>Organization Hierarchy Tables</h1>
        </div>
      </div>*/}
    </PageWrapper>
  );
};

export default MDM_Mega_Process_Sub_ProcessLandingPage;
