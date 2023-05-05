import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { useDispatch, useSelector } from 'react-redux';
import { getOrgStructures, getOrgHierarchy } from '../../../redux/MDM/MDM_Action';
import OrgStructuresTable from './Tables/OrgStructures/OrgStructuresTable';
import OrgHierarchyTable from './Tables/OrgHierarchy/OrgHierarchyTable';
import { orgManageButtonSelector } from '../../../redux/MDM/MDM_Selectors';
import {
  addOrgStructureSelector,
  updateOrgStructureSelector,
} from '../../../redux/MDM/MDM_Selectors';

const MDM_OrganizationHierarchyLandingPage = () => {
  const dispatch = useDispatch();
  const orgManageButtonState = useSelector(orgManageButtonSelector);
  const addOrgStructureState = useSelector(addOrgStructureSelector);
  const updateOrgState = useSelector(updateOrgStructureSelector);
  console.log('addOrgStructureState', addOrgStructureState);
  // API Call using dispatch
  useEffect(() => {
    console.log('BU');
    dispatch(getOrgStructures());
    dispatch(getOrgHierarchy());
    console.log('BU=====>>>>>>>>>>>>>>>>>>>>>>>>>>');
  }, [addOrgStructureState?.data, updateOrgState?.data?.message]);

  // to select data from redux store using selector
  // const orgStructures = useSelector(getOrgStructuresSelector);
  // console.log(orgStructures.data, 'Org Structure data from API');

  return (
    <PageWrapper>
      <div className="col-12 col-lg-12">
        <NavTabsMDM />
        <OrgHierarchyTable />
        {!!orgManageButtonState && <OrgStructuresTable />}
      </div>
    </PageWrapper>
  );
};

export default MDM_OrganizationHierarchyLandingPage;
