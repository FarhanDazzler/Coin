import {
  GET_ORG_STRUCTURES_REQUEST,
  GET_ORG_HIERARCHY_REQUEST,
  GET_MICS_FRAMEWORK_REQUEST,
  GET_MEGA_AND_SUBPROCESS_VIEW_REQUEST,
  GET_MEGA_AND_SUBPROCESS_REQUEST,
  GET_CONTROL_OWNER_AND_OVERSIGHT_REQUEST,
  GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_REQUEST,
  ORG_OPEN_TABLE_REQUEST,
  MEGA_AND_SUBPROCESS_OPEN_TABLE_REQUEST,
  ACTION_ADD_ORG_STRUCTURE_DATA,
  ADD_MICS_FRAMEWORK_REQUEST,
  ACTION_GET_PARENT_ENTITY_DATA,
  ACTION_UPDATE_ORG_STRUCTURE_DATA,
  ADD_MEGA_AND_SUBPROCESS_REQUEST,
  GET_MEGA_PROCESS_PREFIX_REQUEST,
  GET_SUBPROCESS_PARENT_REQUEST,
  GET_SUBPROCESS_PREFIX_REQUEST,
  MODIFY_CONTROL_OWNER_AND_OVERSIGHT_REQUEST,
  UPDATE_MICS_FRAMEWORK_REQUEST,
  GET_MEGA_PROCESS_MICS_FRAMEWORK_REQUEST,
  GET_SUB_PROCESS_MICS_FRAMEWORK_REQUEST,
  UPDATE_MEGA_AND_SUBPROCESS_REQUEST,
  ASSIGN_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_REQUEST,
  GET_ALL_PROVIDER_ENTITIES_REQUEST,
  ACTION_GET_CONTROL_INSTANCE_HISTORY_DATA,
  GET_SITES_AND_PLANTS_MASTER_REQUEST,
} from './MDM_Reducer';

export const getOrgStructures = (payload) => ({ type: GET_ORG_STRUCTURES_REQUEST, payload });
export const addOrgStructureAction = (payload) => ({
  type: ACTION_ADD_ORG_STRUCTURE_DATA,
  payload,
});
export const updateOrgStructureAction = (payload) => ({
  type: ACTION_UPDATE_ORG_STRUCTURE_DATA,
  payload,
});
export const getParentEntityAction = (payload) => ({
  type: ACTION_GET_PARENT_ENTITY_DATA,
  payload,
});
export const getOrgHierarchy = (payload) => ({ type: GET_ORG_HIERARCHY_REQUEST, payload });

export const getMicsFramework = (payload) => ({ type: GET_MICS_FRAMEWORK_REQUEST, payload });
export const addMicsFramework = (payload) => ({ type: ADD_MICS_FRAMEWORK_REQUEST, payload });
export const updateMicsFramework = (payload) => ({ type: UPDATE_MICS_FRAMEWORK_REQUEST, payload });
export const getMegaProcessMicsFramework = (payload) => ({
  type: GET_MEGA_PROCESS_MICS_FRAMEWORK_REQUEST,
  payload,
});
export const getSubProcessMicsFramework = (payload) => ({
  type: GET_SUB_PROCESS_MICS_FRAMEWORK_REQUEST,
  payload,
});

export const getMegaAndSubprocessView = (payload) => ({
  type: GET_MEGA_AND_SUBPROCESS_VIEW_REQUEST,
  payload,
});
export const getMegaAndSubprocess = (payload) => ({
  type: GET_MEGA_AND_SUBPROCESS_REQUEST,
  payload,
});
export const addMegaAndSubprocess = (payload) => ({
  type: ADD_MEGA_AND_SUBPROCESS_REQUEST,
  payload,
});
export const getMegaProcessPrefix = (payload) => ({
  type: GET_MEGA_PROCESS_PREFIX_REQUEST,
  payload,
});
export const getSubprocessParent = (payload) => ({
  type: GET_SUBPROCESS_PARENT_REQUEST,
  payload,
});
export const getSubprocessPrefix = (payload) => ({
  type: GET_SUBPROCESS_PREFIX_REQUEST,
  payload,
});
export const updateMegaAndSubprocess = (payload) => ({
  type: UPDATE_MEGA_AND_SUBPROCESS_REQUEST,
  payload,
});

export const getControlOwnerAndOversight = (payload) => ({
  type: GET_CONTROL_OWNER_AND_OVERSIGHT_REQUEST,
  payload,
});
export const getControlInstanceHistoryAction = (payload) => ({
  type: ACTION_GET_CONTROL_INSTANCE_HISTORY_DATA,
  payload,
});
export const modifyControlOwnerAndOversight = (payload) => ({
  type: MODIFY_CONTROL_OWNER_AND_OVERSIGHT_REQUEST,
  payload,
});
export const getApplicabilityAndAssignmentOfProviderOrganization = (payload) => ({
  type: GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_REQUEST,
  payload,
});
export const assignApplicabilityAndAssignmentOfProviderOrganization = (payload) => ({
  type: ASSIGN_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_REQUEST,
  payload,
});
export const getAllProviderEntities = (payload) => ({
  type: GET_ALL_PROVIDER_ENTITIES_REQUEST,
  payload,
});

export const orgManageButton = (payload) => ({ type: ORG_OPEN_TABLE_REQUEST, payload });
export const megaAndSubprocessManageButton = (payload) => ({
  type: MEGA_AND_SUBPROCESS_OPEN_TABLE_REQUEST,
  payload,
});

export const getSiteAndPlant = (payload) => ({
  type: GET_SITES_AND_PLANTS_MASTER_REQUEST,
  payload,
});
