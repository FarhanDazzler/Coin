import {
  GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_REQUEST,
  ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_REQUEST,
  GET_LATEST_FUNCTION_DRAFT_RESPONSE_REQUEST,
  GET_FUNCTION_SUBMIT_RESPONSE_REQUEST,
  ADD_FUNCTION_SUBMIT_RESPONSE_REQUEST,
} from './RL_HomePageReducer';

export const getFunctionRecipientHomePageData = (payload) => ({
  type: GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_REQUEST,
  payload,
});
export const getFunctionGlobalPersonaHomePageData = (payload) => ({
  type: GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  payload,
});

export const get_BU_GlobalPersonaHomePageData = (payload) => ({
  type: GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  payload,
});
export const get_BU_BU_HeadHomePageData = (payload) => ({
  type: GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_REQUEST,
  payload,
});
export const get_BU_Disclosure_ProcessorHomePageData = (payload) => ({
  type: GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_REQUEST,
  payload,
});
export const get_BU_Finance_DirectorHomePageData = (payload) => ({
  type: GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_REQUEST,
  payload,
});
export const get_BU_Zone_ControlHomePageData = (payload) => ({
  type: GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_REQUEST,
  payload,
});
export const get_BU_Zone_VPHomePageData = (payload) => ({
  type: GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_REQUEST,
  payload,
});

export const addOrUpdateFunctionDraftResponse = (payload) => ({
  type: ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_REQUEST,
  payload,
});

export const getLatestFunctionDraftResponse = (payload) => ({
  type: GET_LATEST_FUNCTION_DRAFT_RESPONSE_REQUEST,
  payload,
});

export const getFunctionSubmitResponse = (payload) => ({
  type: GET_FUNCTION_SUBMIT_RESPONSE_REQUEST,
  payload,
});

export const addFunctionSubmitResponse = (payload) => ({
  type: ADD_FUNCTION_SUBMIT_RESPONSE_REQUEST,
  payload,
});
