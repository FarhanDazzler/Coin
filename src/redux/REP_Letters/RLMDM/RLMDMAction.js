import {
  GET_RL_ORG_HIERARCHY_REQUEST,
  GET_RL_ORG_MD_REQUEST,
  GET_RL_BU_MASTERDATA_REQUEST,
  ASSIGN_RL_BU_MASTERDATA_REQUEST,
  GET_RL_BU_ZONE_MASTERDATA_REQUEST,
  ASSIGN_RL_BU_ZONE_MASTERDATA_REQUEST,
  GET_RL_FUNCTIONAL_MASTERDATA_REQUEST,
  ACTION_GET_RL_PARENT_ENTITY_DATA,
  ACTION_ADD_ORGANIZATIONAL_MD_DATA,
  ACTION_UPDATE_ORGANIZATIONAL_MD_DATA,
  ASSIGN_RL_FUNCTIONAL_MASTERDATA_REQUEST,
  GET_RL_ZONE_REQUEST,
  GET_RL_BU_FROM_ZONE_REQUEST,
  GET_RL_FUNCTIONS_REQUEST,
  ADD_RL_FUNCTIONAL_MASTERDATA_REQUEST,
} from './RLMDMReducer';

export const getRlOrgHierarchy = (payload) => ({ type: GET_RL_ORG_HIERARCHY_REQUEST, payload });
export const getRlOrgMd = (payload) => ({ type: GET_RL_ORG_MD_REQUEST, payload });
export const getRlBuMasterdata = (payload) => ({ type: GET_RL_BU_MASTERDATA_REQUEST, payload });
export const assignRlBuMasterdata = (payload) => ({
  type: ASSIGN_RL_BU_MASTERDATA_REQUEST,
  payload,
});
export const getRlBuZoneMasterdata = (payload) => ({
  type: GET_RL_BU_ZONE_MASTERDATA_REQUEST,
  payload,
});
export const assignRlBuZoneMasterdata = (payload) => ({
  type: ASSIGN_RL_BU_ZONE_MASTERDATA_REQUEST,
  payload,
});
export const getRlFunctionalMasterdata = (payload) => ({
  type: GET_RL_FUNCTIONAL_MASTERDATA_REQUEST,
  payload,
});
export const getRlParentEntityData = (payload) => ({
  type: ACTION_GET_RL_PARENT_ENTITY_DATA,
  payload,
});
export const addOrganizationalMd = (payload) => ({
  type: ACTION_ADD_ORGANIZATIONAL_MD_DATA,
  payload,
});
export const updateOrganizationalMd = (payload) => ({
  type: ACTION_UPDATE_ORGANIZATIONAL_MD_DATA,
  payload,
});

export const assignRlFunctionalMasterdata = (payload) => ({
  type: ASSIGN_RL_FUNCTIONAL_MASTERDATA_REQUEST,
  payload,
});

export const addRlFunctionalMasterdata = (payload) => ({
  type: ADD_RL_FUNCTIONAL_MASTERDATA_REQUEST,
  payload,
});

export const get_rep_functions = (payload) => ({ type: GET_RL_FUNCTIONS_REQUEST, payload });
export const get_rep_bu_form_zone = (payload) => ({ type: GET_RL_BU_FROM_ZONE_REQUEST, payload });
export const get_rep_zones = (payload) => ({ type: GET_RL_ZONE_REQUEST, payload });
