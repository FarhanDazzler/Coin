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

  // API Call using dispatch
  useEffect(() => {
    dispatch(getOrgStructures());
    dispatch(getOrgHierarchy());
  }, [addOrgStructureState?.data, updateOrgState?.data?.message]);

  // to select data from redux store using selector
  // const orgStructures = useSelector(getOrgStructuresSelector);

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
