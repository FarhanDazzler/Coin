import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import '../MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { useDispatch, useSelector } from 'react-redux';
import { getApplicabilityAndAssignmentOfProviderOrganization } from '../../../redux/MDM/MDM_Action';
import ApplicabilityAndAssignmentOfProviderOrganizationTable from './Tables/ApplicabilityAndAssignmentOfProviderOrganization/ApplicabilityAndAssignmentOfProviderOrganizationTable';

const MDM_ApplicabilityAndAssignmentOfProviderOrganizationLandingPage = () => {
  const dispatch = useDispatch();

  // API Call using dispatch
  useEffect(() => {
    dispatch(getApplicabilityAndAssignmentOfProviderOrganization());
  }, []);

  // to select data from redux store using selector
  // const orgStructures = useSelector(getOrgStructuresSelector);
  // console.log(orgStructures.data, 'Org Structure data from API');

  return (
    <PageWrapper>
      <div className="col col-lg-12">
        <NavTabsMDM />
        <ApplicabilityAndAssignmentOfProviderOrganizationTable />
      </div>
    </PageWrapper>
  );
};

export default MDM_ApplicabilityAndAssignmentOfProviderOrganizationLandingPage;
