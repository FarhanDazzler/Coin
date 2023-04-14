import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { useDispatch, useSelector } from 'react-redux';
import { getControlOwnerAndOversight } from '../../../redux/MDM/MDM_Action';
import ControlOwnerAndOversightTable from './Tables/ControlOwnerAndOversight/ControlOwnerandOversightTable';
import { modifyControlOwnerAndOversightSelector } from '../../../redux/MDM/MDM_Selectors';

const MDM_Control_Owner_OversightLandingPage = () => {
  const dispatch = useDispatch();
  const modifyControlOwnerAndOversightState = useSelector(modifyControlOwnerAndOversightSelector);
  console.log(modifyControlOwnerAndOversightState);
  // API Call using dispatch
  useEffect(() => {
    dispatch(getControlOwnerAndOversight());
  }, [modifyControlOwnerAndOversightState.data]);

  // to select data from redux store using selector
  // const orgStructures = useSelector(getOrgStructuresSelector);
  // console.log(orgStructures.data, 'Org Structure data from API');

  return (
    <PageWrapper>
      <NavTabsMDM />
      <ControlOwnerAndOversightTable />
    </PageWrapper>
  );
};

export default MDM_Control_Owner_OversightLandingPage;
