export const getOrgStructuresSelector = (state) => state.mdm.orgStructures;
export const getOrgHierarchySelector = (state) => state.mdm.orgHierarchy;
export const getMicsFrameworkSelector = (state) => state.mdm.micsFramework;
export const getMegaAndSubprocessViewSelector = (state) => state.mdm.megaAndSubprocessView;
export const getMegaAndSubprocessSelector = (state) => state.mdm.megaAndSubprocess;
export const getControlOwnerAndOversightSelector = (state) => state.mdm.controlOwnerAndOversight;
export const getControlInstanceHistorySelector = (state) => state.mdm.getControlInstanceHistory;

export const getApplicabilityAndAssignmentOfProviderOrganizationSelector = (state) =>
  state.mdm.applicabilityAndAssignmentOfProviderOrganization;
export const getParentEntitySelector = (state) => state.mdm.getParentEntityData;
export const orgManageButtonSelector = (state) => state.mdm.orgManageButtonValue;
export const megaAndSubprocessManageButtonSelector = (state) =>
  state.mdm.megaAndSubprocessManageButtonValue;
export const addOrgStructureSelector = (state) => state.mdm.addOrgStructureData;
export const updateOrgStructureSelector = (state) => state.mdm.updateOrgStructureData;
export const addMicsFrameworkSelector = (state) => state.mdm.addMicsFramework;
export const addMegaAndSubprocessSelector = (state) => state.mdm.addMegaAndSubprocess;
export const getMegaProcessPrefixSelector = (state) => state.mdm.getMegaProcessPrefix;
export const getSubprocessParentSelector = (state) => state.mdm.getSubprocessParent;
export const getSubprocessPrefixSelector = (state) => state.mdm.getSubprocessPrefix;
export const modifyControlOwnerAndOversightSelector = (state) =>
  state.mdm.modifyControlOwnerAndOversight;
export const updateMicsFrameworkSelector = (state) => state.mdm.updateMicsFramework;
export const getMegaProcessMicsFrameworkSelector = (state) => state.mdm.getMegaProcessMicsFramework;
export const getSubProcessMicsFrameworkSelector = (state) => state.mdm.getSubProcessMicsFramework;
export const updateMegaAndSubprocessSelector = (state) => state.mdm.updateMegaAndSubprocess;
export const assignApplicabilityAndAssignmentOfProviderOrganizationSelector = (state) =>
  state.mdm.assignApplicabilityAndAssignmentOfProviderOrganization;
export const getAllProviderEntitiesSelector = (state) => state.mdm.getAllProviderEntities;
export const sitesAndPlantDataSelector = (state) => state.mdm.getSitesAndPlantData;
