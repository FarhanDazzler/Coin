import {
  GET_ORG_STRUCTURES_REQUEST,
  GET_ORG_HIERARCHY_REQUEST,
  GET_MICS_FRAMEWORK_REQUEST,
  GET_MEGA_AND_SUBPROCESS_VIEW_REQUEST,
  GET_MEGA_AND_SUBPROCESS_REQUEST,
  GET_CONTROL_OWNER_AND_OVERSIGHT_REQUEST,
} from './MDM_Reducer';

export const getOrgStructures = (payload) => ({ type: GET_ORG_STRUCTURES_REQUEST, payload });
export const getOrgHierarchy = (payload) => ({ type: GET_ORG_HIERARCHY_REQUEST, payload });
export const getMicsFramework = (payload) => ({ type: GET_MICS_FRAMEWORK_REQUEST, payload });
export const getMegaAndSubprocessView = (payload) => ({
  type: GET_MEGA_AND_SUBPROCESS_VIEW_REQUEST,
  payload,
});
export const getMegaAndSubprocess = (payload) => ({
  type: GET_MEGA_AND_SUBPROCESS_REQUEST,
  payload,
});
export const getControlOwnerAndOversight = (payload) => ({
  type: GET_CONTROL_OWNER_AND_OVERSIGHT_REQUEST,
  payload,
});
