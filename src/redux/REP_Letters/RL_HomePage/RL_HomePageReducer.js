// ============= GET Functional Recipient home page table data ===============//
export const GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_REQUEST =
  'GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_REQUEST';
export const GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_SUCCESS =
  'GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_SUCCESS';
export const GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_ERROR =
  'GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_ERROR';
// ============= GET Functional Recipient home page table data ===============//

// ============= GET Functional Global Persona home page table data ===============//
export const GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST =
  'GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST';
export const GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS =
  'GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS';
export const GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR =
  'GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR';
// ============= GET Functional Global PErsona home page table data ===============//

// ============= GET BU Global Persona home page table data ===============//
export const GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST =
  'GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST';
export const GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS =
  'GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS';
export const GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR =
  'GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR';
// ============= GET BU Global PErsona home page table data ===============//

// ============= GET BU BU Head home page table data ===============//
export const GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_REQUEST =
  'GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_REQUEST';
export const GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_SUCCESS =
  'GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_SUCCESS';
export const GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_ERROR =
  'GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_ERROR';
// ============= GET BU BU Head home page table data ===============//

// ============= GET BU Disclosure Processor home page table data ===============//
export const GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_REQUEST =
  'GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_REQUEST';
export const GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_SUCCESS =
  'GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_SUCCESS';
export const GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_ERROR =
  'GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_ERROR';
// ============= GET BU Disclosure Processor home page table data ===============//

// ============= GET BU Finance Director home page table data ===============//
export const GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_REQUEST =
  'GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_REQUEST';
export const GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_SUCCESS =
  'GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_SUCCESS';
export const GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_ERROR =
  'GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_ERROR';
// ============= GET BU Finance Director home page table data ===============//

// ============= GET BU Zone VP home page table data ===============//
export const GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_REQUEST =
  'GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_REQUEST';
export const GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_SUCCESS =
  'GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_SUCCESS';
export const GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_ERROR =
  'GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_ERROR';
// ============= GET BU Zone VP home page table data ===============//

// ============= GET BU Zone Control home page table data ===============//
export const GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_REQUEST =
  'GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_REQUEST';
export const GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_SUCCESS =
  'GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_SUCCESS';
export const GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_ERROR =
  'GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_ERROR';
// ============= GET BU Zone Control home page table data ===============//

// ============= ADD OR UPDATE FUNCTION DRAFT RESPONSE data ===============//
export const ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_REQUEST =
  'ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_REQUEST';
export const ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_SUCCESS =
  'ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_SUCCESS';
export const ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_ERROR =
  'ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_ERROR';
// ============= ADD OR UPDATE FUNCTION DRAFT RESPONSE data ===============//

// ============= GET LATEST FUNCTION DRAFT RESPONSE data ===============//
export const GET_LATEST_FUNCTION_DRAFT_RESPONSE_REQUEST =
  'GET_LATEST_FUNCTION_DRAFT_RESPONSE_REQUEST';
export const GET_LATEST_FUNCTION_DRAFT_RESPONSE_SUCCESS =
  'GET_LATEST_FUNCTION_DRAFT_RESPONSE_SUCCESS';
export const GET_LATEST_FUNCTION_DRAFT_RESPONSE_ERROR = 'GET_LATEST_FUNCTION_DRAFT_RESPONSE_ERROR';
// ============= GET LATEST FUNCTION DRAFT RESPONSE data ===============//

// ============= GET FUNCTION SUBMIT RESPONSE data ===============//
export const GET_FUNCTION_SUBMIT_RESPONSE_REQUEST = 'GET_FUNCTION_SUBMIT_RESPONSE_REQUEST';
export const GET_FUNCTION_SUBMIT_RESPONSE_SUCCESS = 'GET_FUNCTION_SUBMIT_RESPONSE_SUCCESS';
export const GET_FUNCTION_SUBMIT_RESPONSE_ERROR = 'GET_FUNCTION_SUBMIT_RESPONSE_ERROR';
// ============= GET FUNCTION SUBMIT RESPONSE data ===============//

// ============= ADD FUNCTION SUBMIT RESPONSE data ===============//
export const ADD_FUNCTION_SUBMIT_RESPONSE_REQUEST = 'ADD_FUNCTION_SUBMIT_RESPONSE_REQUEST';
export const ADD_FUNCTION_SUBMIT_RESPONSE_SUCCESS = 'ADD_FUNCTION_SUBMIT_RESPONSE_SUCCESS';
export const ADD_FUNCTION_SUBMIT_RESPONSE_ERROR = 'ADD_FUNCTION_SUBMIT_RESPONSE_ERROR';
// ============= ADD FUNCTION SUBMIT RESPONSE data ===============//

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  getFunctionRecipientHomePageData: { ...block, data: [] },
  getFunctionGlobalPersonaHomePageData: { ...block, data: [] },
  get_BU_GlobalPersonaHomePageData: { ...block, data: [] },
  get_BU_BU_HeadHomePageData: { ...block, data: [] },
  get_BU_Disclosure_ProcessorHomePageData: { ...block, data: [] },
  get_BU_Finance_DirectorHomePageData: { ...block, data: [] },
  get_BU_Zone_ControlHomePageData: { ...block, data: [] },
  get_BU_Zone_VPHomePageData: { ...block, data: [] },
  addOrUpdateFunctionDraftResponse: { ...block, data: [] },
  getLatestFunctionDraftResponse: { ...block, data: [] },
  getFunctionSubmitResponse: { ...block, data: [] },
  addFunctionSubmitResponse: { ...block, data: [] },
};

export const RL_HomePageReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    // GET Functional Recipient home page table data
    case GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_REQUEST:
      return {
        ...state,
        getFunctionRecipientHomePageData: {
          ...state.getFunctionRecipientHomePageData,
          loading: true,
        },
      };
    case GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_SUCCESS:
      return {
        ...state,
        getFunctionRecipientHomePageData: {
          ...state.getFunctionRecipientHomePageData,
          data: payload,
          loading: false,
        },
      };
    case GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_ERROR:
      return {
        ...state,
        getFunctionRecipientHomePageData: {
          ...state.getFunctionRecipientHomePageData,
          loading: false,
        },
      };

    // GET Functional Global Persona home page table data
    case GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST:
      return {
        ...state,
        getFunctionGlobalPersonaHomePageData: {
          ...state.getFunctionGlobalPersonaHomePageData,
          loading: true,
        },
      };
    case GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS:
      return {
        ...state,
        getFunctionGlobalPersonaHomePageData: {
          ...state.getFunctionGlobalPersonaHomePageData,
          data: payload,
          loading: false,
        },
      };
    case GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR:
      return {
        ...state,
        getFunctionGlobalPersonaHomePageData: {
          ...state.getFunctionGlobalPersonaHomePageData,
          loading: false,
        },
      };

    // GET BU Global Persona home page table data
    case GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST:
      return {
        ...state,
        get_BU_GlobalPersonaHomePageData: {
          ...state.get_BU_GlobalPersonaHomePageData,
          loading: true,
        },
      };
    case GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS:
      return {
        ...state,
        get_BU_GlobalPersonaHomePageData: {
          ...state.get_BU_GlobalPersonaHomePageData,
          data: payload,
          loading: false,
        },
      };
    case GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR:
      return {
        ...state,
        get_BU_GlobalPersonaHomePageData: {
          ...state.get_BU_GlobalPersonaHomePageData,
          loading: false,
        },
      };

    // GET BU BU Head home page table data
    case GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_REQUEST:
      return {
        ...state,
        get_BU_BU_HeadHomePageData: {
          ...state.get_BU_BU_HeadHomePageData,
          loading: true,
        },
      };
    case GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_SUCCESS:
      return {
        ...state,
        get_BU_BU_HeadHomePageData: {
          ...state.get_BU_BU_HeadHomePageData,
          data: payload,
          loading: false,
        },
      };
    case GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_ERROR:
      return {
        ...state,
        get_BU_BU_HeadHomePageData: {
          ...state.get_BU_BU_HeadHomePageData,
          loading: false,
        },
      };

    // GET BU Disclosure Processor home page table data
    case GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_REQUEST:
      return {
        ...state,
        get_BU_Disclosure_ProcessorHomePageData: {
          ...state.get_BU_Disclosure_ProcessorHomePageData,
          loading: true,
        },
      };
    case GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_SUCCESS:
      return {
        ...state,
        get_BU_Disclosure_ProcessorHomePageData: {
          ...state.get_BU_Disclosure_ProcessorHomePageData,
          data: payload,
          loading: false,
        },
      };
    case GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_ERROR:
      return {
        ...state,
        get_BU_Disclosure_ProcessorHomePageData: {
          ...state.get_BU_Disclosure_ProcessorHomePageData,
          loading: false,
        },
      };

    // GET BU Finance Director home page table data
    case GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_REQUEST:
      return {
        ...state,
        get_BU_Finance_DirectorHomePageData: {
          ...state.get_BU_Finance_DirectorHomePageData,
          loading: true,
        },
      };
    case GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_SUCCESS:
      return {
        ...state,
        get_BU_Finance_DirectorHomePageData: {
          ...state.get_BU_Finance_DirectorHomePageData,
          data: payload,
          loading: false,
        },
      };
    case GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_ERROR:
      return {
        ...state,
        get_BU_Finance_DirectorHomePageData: {
          ...state.get_BU_Finance_DirectorHomePageData,
          loading: false,
        },
      };

    // GET BU Zone VP home page table data
    case GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_REQUEST:
      return {
        ...state,
        get_BU_Zone_VPHomePageData: {
          ...state.get_BU_Zone_VPHomePageData,
          loading: true,
        },
      };
    case GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_SUCCESS:
      return {
        ...state,
        get_BU_Zone_VPHomePageData: {
          ...state.get_BU_Zone_VPHomePageData,
          data: payload,
          loading: false,
        },
      };
    case GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_ERROR:
      return {
        ...state,
        get_BU_Zone_VPHomePageData: {
          ...state.get_BU_Zone_VPHomePageData,
          loading: false,
        },
      };

    // GET BU Zone Control home page table data
    case GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_REQUEST:
      return {
        ...state,
        get_BU_Zone_ControlHomePageData: {
          ...state.get_BU_Zone_ControlHomePageData,
          loading: true,
        },
      };
    case GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_SUCCESS:
      return {
        ...state,
        get_BU_Zone_ControlHomePageData: {
          ...state.get_BU_Zone_ControlHomePageData,
          data: payload,
          loading: false,
        },
      };
    case GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_ERROR:
      return {
        ...state,
        get_BU_Zone_ControlHomePageData: {
          ...state.get_BU_Zone_ControlHomePageData,
          loading: false,
        },
      };

    // ADD OR UPDATE FUNCTION DRAFT RESPONSE data
    case ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_REQUEST:
      return {
        ...state,
        addOrUpdateFunctionDraftResponse: {
          ...state.addOrUpdateFunctionDraftResponse,
          loading: true,
        },
      };
    case ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_SUCCESS:
      return {
        ...state,
        addOrUpdateFunctionDraftResponse: {
          ...state.addOrUpdateFunctionDraftResponse,
          data: payload,
          loading: false,
        },
      };
    case ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_ERROR:
      return {
        ...state,
        addOrUpdateFunctionDraftResponse: {
          ...state.addOrUpdateFunctionDraftResponse,
          loading: false,
        },
      };

    // GET LATEST FUNCTION DRAFT RESPONSE data
    case GET_LATEST_FUNCTION_DRAFT_RESPONSE_REQUEST:
      return {
        ...state,
        getLatestFunctionDraftResponse: {
          ...state.getLatestFunctionDraftResponse,
          loading: true,
        },
      };
    case GET_LATEST_FUNCTION_DRAFT_RESPONSE_SUCCESS:
      return {
        ...state,
        getLatestFunctionDraftResponse: {
          ...state.getLatestFunctionDraftResponse,
          data: payload,
          loading: false,
        },
      };
    case GET_LATEST_FUNCTION_DRAFT_RESPONSE_ERROR:
      return {
        ...state,
        getLatestFunctionDraftResponse: {
          ...state.getLatestFunctionDraftResponse,
          loading: false,
        },
      };

    // GET FUNCTION SUBMIT RESPONSE data
    case GET_FUNCTION_SUBMIT_RESPONSE_REQUEST:
      return {
        ...state,
        getFunctionSubmitResponse: {
          ...state.getFunctionSubmitResponse,
          loading: true,
        },
      };
    case GET_FUNCTION_SUBMIT_RESPONSE_SUCCESS:
      return {
        ...state,
        getFunctionSubmitResponse: {
          ...state.getFunctionSubmitResponse,
          data: payload,
          loading: false,
        },
      };
    case GET_FUNCTION_SUBMIT_RESPONSE_ERROR:
      return {
        ...state,
        getFunctionSubmitResponse: {
          ...state.getFunctionSubmitResponse,
          loading: false,
        },
      };

    // ADD FUNCTION SUBMIT RESPONSE data
    case ADD_FUNCTION_SUBMIT_RESPONSE_REQUEST:
      return {
        ...state,
        addFunctionSubmitResponse: {
          ...state.addFunctionSubmitResponse,
          loading: true,
        },
      };
    case ADD_FUNCTION_SUBMIT_RESPONSE_SUCCESS:
      return {
        ...state,
        addFunctionSubmitResponse: {
          ...state.addFunctionSubmitResponse,
          data: payload,
          loading: false,
        },
      };
    case ADD_FUNCTION_SUBMIT_RESPONSE_ERROR:
      return {
        ...state,
        addFunctionSubmitResponse: {
          ...state.addFunctionSubmitResponse,
          loading: false,
        },
      };

    default:
      return state;
  }
};
