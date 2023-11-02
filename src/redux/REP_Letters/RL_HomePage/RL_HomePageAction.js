import {
  GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BUZONE_EXCOM_MEMBER_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BUZONE_ZONE_LEGAL_REPRESENTATIVE_HOME_PAGE_TABLE_DATA_REQUEST,
  ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_REQUEST,
  GET_LATEST_FUNCTION_DRAFT_RESPONSE_REQUEST,
  CLEAR_LATEST_FUNCTION_DRAFT_RESPONSE,
  GET_FUNCTION_SUBMIT_RESPONSE_REQUEST,
  ADD_FUNCTION_SUBMIT_RESPONSE_REQUEST,
  CLEAR_FUNCTION_SUBMIT_RESPONSE_REQUEST,
  ADD_OR_UPDATE_BU_DRAFT_RESPONSE_REQUEST,
  GET_LATEST_BU_DRAFT_RESPONSE_REQUEST,
  CLEAR_LATEST_BU_DRAFT_RESPONSE,
  GET_BU_SUBMIT_RESPONSE_REQUEST,
  ADD_BU_SUBMIT_RESPONSE_REQUEST,
  CLEAR_BU_SUBMIT_RESPONSE_REQUEST,
  GET_BU_SECTION2_SIGNATURE_RESPONSE_REQUEST,
  ADD_BU_SECTION2_CHECKBOX_REQUEST,
  ADD_BU_SECTION2_UPLOAD_MAIL_APPROVAL_REQUEST,
  GET_BU_SECTION_3_RESPONSE_REQUEST,
  CLEAR_GET_BU_SECTION_3_RESPONSE_REQUEST,
  ADD_BU_SECTION_3_RESPONSE_REQUEST,
  APPROVE_BU_SECTION_3_RESPONSE_REQUEST,
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

export const get_BUZone_ExcomMemberHomePageData = (payload) => ({
  type: GET_BUZONE_EXCOM_MEMBER_HOME_PAGE_TABLE_DATA_REQUEST,
  payload,
});
export const get_BUZone_ZoneLegalRepresentativeHomePageData = (payload) => ({
  type: GET_BUZONE_ZONE_LEGAL_REPRESENTATIVE_HOME_PAGE_TABLE_DATA_REQUEST,
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

export const clearLatestFunctionDraftResponse = () => ({
  type: CLEAR_LATEST_FUNCTION_DRAFT_RESPONSE,
});

export const getFunctionSubmitResponse = (payload) => ({
  type: GET_FUNCTION_SUBMIT_RESPONSE_REQUEST,
  payload,
});

export const addFunctionSubmitResponse = (payload) => ({
  type: ADD_FUNCTION_SUBMIT_RESPONSE_REQUEST,
  payload,
});

export const clearFunctionSubmitResponse = () => ({
  type: CLEAR_FUNCTION_SUBMIT_RESPONSE_REQUEST,
});

export const addOrUpdateBUDraftResponse = (payload) => ({
  type: ADD_OR_UPDATE_BU_DRAFT_RESPONSE_REQUEST,
  payload,
});

export const getLatestBUDraftResponse = (payload) => ({
  type: GET_LATEST_BU_DRAFT_RESPONSE_REQUEST,
  payload,
});

export const clearLatestBUDraftResponse = () => ({
  type: CLEAR_LATEST_BU_DRAFT_RESPONSE,
});

export const getBUSubmitResponse = (payload) => ({
  type: GET_BU_SUBMIT_RESPONSE_REQUEST,
  payload,
});

export const addBUSubmitResponse = (payload) => ({
  type: ADD_BU_SUBMIT_RESPONSE_REQUEST,
  payload,
});

export const clearBUSubmitResponse = () => ({
  type: CLEAR_BU_SUBMIT_RESPONSE_REQUEST,
});

export const getBUSection2SignatureResponseAction = (payload) => ({
  type: GET_BU_SECTION2_SIGNATURE_RESPONSE_REQUEST,
  payload,
});
export const addBUSection2CheckboxAction = (payload) => ({
  type: ADD_BU_SECTION2_CHECKBOX_REQUEST,
  payload,
});

export const addBUSection2UploadMailApprovalAction = (payload) => ({
  type: ADD_BU_SECTION2_UPLOAD_MAIL_APPROVAL_REQUEST,
  payload,
});

export const getBUSection3Response = (payload) => ({
  type: GET_BU_SECTION_3_RESPONSE_REQUEST,
  payload,
});

export const addBUSection3Response = (payload) => ({
  type: ADD_BU_SECTION_3_RESPONSE_REQUEST,
  payload,
});

export const approveBUSection3Response = (payload) => ({
  type: APPROVE_BU_SECTION_3_RESPONSE_REQUEST,
  payload,
});

export const clearGetBUSection3Response = () => ({
  type: CLEAR_GET_BU_SECTION_3_RESPONSE_REQUEST,
});
