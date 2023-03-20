import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { useDispatch, useSelector } from 'react-redux';
import { getOrgStructures, getOrgHierarchy } from '../../../redux/MDM/MDM_Action';
import OrgStructuresTable from './Tables/OrgStructures/OrgStructuresTable';
import OrgHierarchyTable from './Tables/OrgHierarchy/OrgHierarchyTable';

const MDM_OrganizationHierarchyLandingPage = () => {
  const dispatch = useDispatch();

  // API Call using dispatch
  useEffect(() => {
    dispatch(getOrgStructures());
    dispatch(getOrgHierarchy());
  }, []);

  // to select data from redux store using selector
  // const orgStructures = useSelector(getOrgStructuresSelector);
  // console.log(orgStructures.data, 'Org Structure data from API');

  return (
    <PageWrapper>
      <NavTabsMDM />
      <OrgHierarchyTable />
      <OrgStructuresTable />
      {/*<div className="container py-5" style={{ display: 'flex' }}>
        <div className="col-lg-6 py-4 MDMBoxWrapper" style={{ marginRight: '16px' }}>
          <h1>Organization Hierarchy Tables</h1>
        </div>
      </div>*/}
    </PageWrapper>
  );
};

export default MDM_OrganizationHierarchyLandingPage;
