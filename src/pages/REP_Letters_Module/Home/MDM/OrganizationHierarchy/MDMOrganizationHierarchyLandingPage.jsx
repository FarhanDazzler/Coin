import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../../../components/wrappers/PageWrapper';
import '../../../../MDM/MDMStyle.scss';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { useDispatch, useSelector } from 'react-redux';
import OrgStructuresTable from './Tables/OrgStructures/OrgStructuresTable';
import OrgHierarchyTable from './Tables/OrgHierarchy/OrgHierarchyTable';
import { getRlOrgHierarchy, getRlOrgMd } from '../../../../../redux/REP_Letters/RLMDM/RLMDMAction';
import { updateOrganizationalMdDataSelector, addOrganizationalMdDataSelector } from '../../../../../redux/REP_Letters/RLMDM/RLMDMSelectors';

const RL_MDM_OrganizationHierarchyLandingPage = () => {
  const dispatch = useDispatch();
  const [rlOrgManageButton, setRlOrgManageButtonState] = useState(false)
  const addOrgState = useSelector(addOrganizationalMdDataSelector);
  const updateOrgState = useSelector(updateOrganizationalMdDataSelector);

  useEffect(() => {
    dispatch(getRlOrgHierarchy())
    dispatch(getRlOrgMd())
  }, [addOrgState?.data, updateOrgState?.data])

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
