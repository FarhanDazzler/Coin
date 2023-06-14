export const getRlOrgHierarchySelector = (state) => state?.rlMdm?.rlOrgHierarchy;
export const getRlOrgMDSelector = (state) => state?.rlMdm?.rlOrgMd;
export const getRlBuMasterdataSelector = (state) => state?.rlMdm?.rlBuMasterdata;
export const assignRlBuMasterdataSelector = (state) => state?.rlMdm?.rlAssignBuMasterdata;
export const getRlFunctionalMasterdataSelector = (state) => state?.rlMdm?.rlFunctionalMasterdata;
export const getRlParentEntityDataSelector = (state) => state?.rlMdm?.getRlParentEntityData;
export const addOrganizationalMdDataSelector = (state) => state?.rlMdm?.addOrganizationalMd;
export const updateOrganizationalMdDataSelector = (state) => state?.rlMdm?.updateOrganizationalMd;
export const assignRlFunctionalMasterdataSelector = (state) =>
  state?.rlMdm?.rlAssignFunctionalMasterdata;
export const get_rep_zonesSelector = (state) => state?.rlMdm?.get_rep_zones;
export const get_rep_bu_form_zoneSelector = (state) => state?.rlMdm?.get_rep_bu_form_zone;
export const get_rep_functionsSelector = (state) => state?.rlMdm?.get_rep_functions;
export const addRlFunctionalMasterdataSelector = (state) => state?.rlMdm?.rlAddFunctionalMasterdata;
