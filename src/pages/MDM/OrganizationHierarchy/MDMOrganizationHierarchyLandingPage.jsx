import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { useDispatch, useSelector } from 'react-redux';
import { getOrgStructures } from '../../../redux/MDM/MDM_Action';
import { getOrgStructuresSelector } from '../../../redux/MDM/MDM_Selectors';
import OrgStructuresTable from './Tables/OrgStructures/OrgStructuresTable';

const MDM_OrganizationHierarchyLandingPage = () => {
  const dispatch = useDispatch();

  // API Call using dispatch
  useEffect(() => {
    dispatch(getOrgStructures());
  }, []);

  // to select data from redux store using selector
  // const orgStructures = useSelector(getOrgStructuresSelector);
  // console.log(orgStructures.data, 'Org Structure data from API');

  return (
    <PageWrapper>
      <NavTabsMDM />
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
