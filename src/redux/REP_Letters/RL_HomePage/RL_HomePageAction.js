import {
  GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_FUNCTION_ZIC_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_ZIC_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BUZONE_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BUZONE_EXCOM_MEMBER_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BUZONE_ZONE_LEGAL_REPRESENTATIVE_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BUZONE_ZONE_VP_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BUZONE_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BUZONE_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
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
  ADD_BU_SECTION2_LAZY_APPROVAL_REQUEST,
  CLEAR_GET_BU_SECTION2_SIGNATURE_RESPONSE_REQUEST,
  GET_BU_SECTION_3_RBA_DATA_REQUEST,
  CLEAR_GET_BU_SECTION_3_RBA_DATA_REQUEST,
  GET_BU_SECTION_3_RESPONSE_REQUEST,
  CLEAR_GET_BU_SECTION_3_RESPONSE_REQUEST,
  ADD_BU_SECTION_3_RESPONSE_REQUEST,
  APPROVE_BU_SECTION_3_RESPONSE_REQUEST,
  GET_BU_SCOPE_DATA_REQUEST,
  CLEAR_BU_SCOPE_DATA,
  ADD_OR_UPDATE_BU_ZONE_DRAFT_RESPONSE_REQUEST,
  GET_LATEST_BU_ZONE_DRAFT_RESPONSE_REQUEST,
  CLEAR_LATEST_BU_ZONE_DRAFT_RESPONSE,
  GET_BU_ZONE_SUBMIT_RESPONSE_REQUEST,
  ADD_BU_ZONE_SUBMIT_RESPONSE_REQUEST,
  CLEAR_BU_ZONE_SUBMIT_RESPONSE_REQUEST,
  GET_BU_ZONE_SECTION2_SIGNATURE_RESPONSE_REQUEST,
  ADD_BU_ZONE_SECTION2_CHECKBOX_REQUEST,
  ADD_BU_ZONE_SECTION2_UPLOAD_MAIL_APPROVAL_REQUEST,
  ADD_BU_ZONE_SECTION2_LAZY_APPROVAL_REQUEST,
  CLEAR_GET_BU_ZONE_SECTION2_SIGNATURE_RESPONSE_REQUEST,
  GET_BU_ZONE_SCOPE_DATA_REQUEST,
  CLEAR_BU_ZONE_SCOPE_DATA,
  GET_FUNCTIONAL_SCOPE_DATA_REQUEST,
  CLEAR_FUNCTIONAL_SCOPE_DATA,
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

export const getFunctionZIC_PersonaHomePageData = (payload) => ({
  type: GET_FUNCTION_ZIC_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  payload,
});

export const get_BU_ZIC_PersonaHomePageData = (payload) => ({
  type: GET_BU_ZIC_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
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

export const get_BUZone_Disclosure_ProcessorHomePageData = (payload) => ({
  type: GET_BUZONE_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_REQUEST,
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
export const get_BUZone_Zone_VPHomePageData = (payload) => ({
  type: GET_BUZONE_ZONE_VP_HOME_PAGE_TABLE_DATA_REQUEST,
  payload,
});
export const get_BUZone_Zone_ControlHomePageData = (payload) => ({
  type: GET_BUZONE_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_REQUEST,
  payload,
});
export const get_BUZone_GlobalPersonaHomePageData = (payload) => ({
  type: GET_BUZONE_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
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

export const clearGetBUSection2SignatureResponseAction = () => ({
  type: CLEAR_GET_BU_SECTION2_SIGNATURE_RESPONSE_REQUEST,
});

export const addBUSection2CheckboxAction = (payload) => ({
  type: ADD_BU_SECTION2_CHECKBOX_REQUEST,
  payload,
});

export const addBUSection2UploadMailApprovalAction = (payload) => ({
  type: ADD_BU_SECTION2_UPLOAD_MAIL_APPROVAL_REQUEST,
  payload,
});

export const addBUSection2LazyApproval = (payload) => ({
  type: ADD_BU_SECTION2_LAZY_APPROVAL_REQUEST,
  payload,
});

export const getBUSection3RBA_Data = (payload) => ({
  type: GET_BU_SECTION_3_RBA_DATA_REQUEST,
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

export const clearGetBUSection3RBA_Data = () => ({
  type: CLEAR_GET_BU_SECTION_3_RBA_DATA_REQUEST,
});

export const clearGetBUSection3Response = () => ({
  type: CLEAR_GET_BU_SECTION_3_RESPONSE_REQUEST,
});

export const getBUScopeData = (payload) => ({
  type: GET_BU_SCOPE_DATA_REQUEST,
  payload,
});

export const clearGetBUScopeData = () => ({
  type: CLEAR_BU_SCOPE_DATA,
});
export const getFunctionalScopeData = (payload) => ({
  type: GET_FUNCTIONAL_SCOPE_DATA_REQUEST,
  payload,
});

export const clearGetFunctionalScopeData = () => ({
  type: CLEAR_FUNCTIONAL_SCOPE_DATA,
});

export const addOrUpdateBUZoneDraftResponse = (payload) => ({
  type: ADD_OR_UPDATE_BU_ZONE_DRAFT_RESPONSE_REQUEST,
  payload,
});

export const getLatestBUZoneDraftResponse = (payload) => ({
  type: GET_LATEST_BU_ZONE_DRAFT_RESPONSE_REQUEST,
  payload,
});

export const clearLatestBUZoneDraftResponse = () => ({
  type: CLEAR_LATEST_BU_ZONE_DRAFT_RESPONSE,
});

export const getBUZoneSubmitResponse = (payload) => ({
  type: GET_BU_ZONE_SUBMIT_RESPONSE_REQUEST,
  payload,
});

export const addBUZoneSubmitResponse = (payload) => ({
  type: ADD_BU_ZONE_SUBMIT_RESPONSE_REQUEST,
  payload,
});

export const clearBUZoneSubmitResponse = () => ({
  type: CLEAR_BU_ZONE_SUBMIT_RESPONSE_REQUEST,
});

export const getBUZoneSection2SignatureResponseAction = (payload) => ({
  type: GET_BU_ZONE_SECTION2_SIGNATURE_RESPONSE_REQUEST,
  payload,
});

export const clearGetBUZoneSection2SignatureResponseAction = () => ({
  type: CLEAR_GET_BU_ZONE_SECTION2_SIGNATURE_RESPONSE_REQUEST,
});

export const addBUZoneSection2CheckboxAction = (payload) => ({
  type: ADD_BU_ZONE_SECTION2_CHECKBOX_REQUEST,
  payload,
});

export const addBUZoneSection2UploadMailApprovalAction = (payload) => ({
  type: ADD_BU_ZONE_SECTION2_UPLOAD_MAIL_APPROVAL_REQUEST,
  payload,
});

export const addBUZoneSection2LazyApproval = (payload) => ({
  type: ADD_BU_ZONE_SECTION2_LAZY_APPROVAL_REQUEST,
  payload,
});

export const getBUZoneScopeData = (payload) => ({
  type: GET_BU_ZONE_SCOPE_DATA_REQUEST,
  payload,
});

export const clearBUZoneScopeData = () => ({
  type: CLEAR_BU_ZONE_SCOPE_DATA,
});
