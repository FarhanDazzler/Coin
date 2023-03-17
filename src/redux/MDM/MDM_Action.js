import {
  GET_ORG_STRUCTURES_REQUEST,
  GET_ORG_HIERARCHY_REQUEST,
  GET_MICS_FRAMEWORK_REQUEST,
} from './MDM_Reducer';

export const getOrgStructures = (payload) => ({ type: GET_ORG_STRUCTURES_REQUEST, payload });
export const getOrgHierarchy = (payload) => ({ type: GET_ORG_HIERARCHY_REQUEST, payload });
export const getMicsFramework = (payload) => ({ type: GET_MICS_FRAMEWORK_REQUEST, payload });
