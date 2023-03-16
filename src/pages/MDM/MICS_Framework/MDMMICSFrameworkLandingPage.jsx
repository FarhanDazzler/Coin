import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { useDispatch, useSelector } from 'react-redux';
import { getMicsFramework } from '../../../redux/MDM/MDM_Action';
import MicsFrameworkTable from './Tables/MicsFramework/MicsFrameworkTable';

const MDM_MICS_FrameworkLandingPage = () => {
  const dispatch = useDispatch();

  // API Call using dispatch
  useEffect(() => {
    dispatch(getMicsFramework());
  }, []);

  return (
    <PageWrapper>
      <NavTabsMDM />
      <MicsFrameworkTable />
    </PageWrapper>
  );
};

export default MDM_MICS_FrameworkLandingPage;
