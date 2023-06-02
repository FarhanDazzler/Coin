import {
    GET_RL_ORG_HIERARCHY_REQUEST,
    GET_RL_ORG_MD_REQUEST
} from "./RLMDMReducer";

export const getRlOrgHierarchy = (payload) => ({ type: GET_RL_ORG_HIERARCHY_REQUEST, payload });
export const getRlOrgMd = (payload) => ({ type: GET_RL_ORG_MD_REQUEST, payload });