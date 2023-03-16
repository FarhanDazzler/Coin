import { GET_ORG_STRUCTURES_REQUEST } from './MDM_Reducer';
import { GET_ORG_HIERARCHY_REQUEST } from './MDM_Reducer';

export const getOrgStructures = (payload) => ({ type: GET_ORG_STRUCTURES_REQUEST, payload });
export const getOrgHierarchy = (payload) => ({ type: GET_ORG_HIERARCHY_REQUEST, payload }); 
