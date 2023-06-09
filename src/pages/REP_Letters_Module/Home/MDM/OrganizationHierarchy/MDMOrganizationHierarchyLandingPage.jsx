import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../../../components/wrappers/PageWrapper';
import '../../../../MDM/MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { useDispatch, useSelector } from 'react-redux';
import OrgStructuresTable from './Tables/OrgStructures/OrgStructuresTable';
import OrgHierarchyTable from './Tables/OrgHierarchy/OrgHierarchyTable';
import { getRlOrgHierarchy, getRlOrgMd } from '../../../../../redux/REP_Letters/RLMDM/RLMDMAction';

const RL_MDM_OrganizationHierarchyLandingPage = () => {
  const dispatch = useDispatch();
  const [rlOrgManageButton, setRlOrgManageButtonState] = useState(false)

  useEffect(() => {
    dispatch(getRlOrgHierarchy())
    dispatch(getRlOrgMd())
  }, [])

  return (
    <PageWrapper>
      <div className="col-12 col-lg-12">
        <NavTabsMDM />
        <OrgHierarchyTable setRlOrgManageButtonState={setRlOrgManageButtonState}/>
        {!!rlOrgManageButton && <OrgStructuresTable />}
      </div>
    </PageWrapper>
  );
};

export default RL_MDM_OrganizationHierarchyLandingPage;
