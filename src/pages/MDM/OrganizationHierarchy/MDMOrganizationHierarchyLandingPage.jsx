import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
// import { ProductFeedback } from '@abi-ds-beerblocs/product-feedback-module-legacy';
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
  const { accounts } = useMsal();
  const [openNPS, setOpenNPS] = useState(false);
  const orgManageButtonState = useSelector(orgManageButtonSelector);
  const addOrgStructureState = useSelector(addOrgStructureSelector);
  const updateOrgState = useSelector(updateOrgStructureSelector);

  // API Call using dispatch
  useEffect(() => {
    dispatch(getOrgStructures());
    dispatch(getOrgHierarchy());
  }, [addOrgStructureState?.data, updateOrgState?.data?.message]);

  // to open NPS feedback modal
  useEffect(() => {
    if (addOrgStructureState.success || updateOrgState.success) {
      // Delay by 1 second (1000 milliseconds)
      const timeoutId = setTimeout(() => {
        setOpenNPS(true);
      }, 2500);

      // Clean up the timeout when the component unmounts or when the effect re-runs
      return () => clearTimeout(timeoutId);
    }
  }, [addOrgStructureState?.data, updateOrgState?.data?.message]);

  return (
    <PageWrapper>
      {/* {openNPS && (
        <ProductFeedback
          env={process.env.REACT_APP_STAGE}
          apiKey={''}
          token={localStorage.getItem('nps-auth-token')}
          feedbackMetadata={{
            Activity: 'IC Has done MDM modification for Organization Hierarchy',
            Created_By: {
              Email: accounts[0]?.username,
              name: accounts[0]?.name ? accounts[0].name : '',
            },
          }}
          productId={process.env.REACT_APP_NPS_PRODUCT_ID}
          productActivityId="nps_score_provided_IC"
          modalOpened={openNPS}
          setModalOpened={setOpenNPS}
        />
      )} */}
      <div className="col-12 col-lg-12">
        <NavTabsMDM />
        <OrgHierarchyTable />
        {!!orgManageButtonState && <OrgStructuresTable />}
      </div>
    </PageWrapper>
  );
};

export default MDM_OrganizationHierarchyLandingPage;
