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

    default:
      return state;
  }
};
