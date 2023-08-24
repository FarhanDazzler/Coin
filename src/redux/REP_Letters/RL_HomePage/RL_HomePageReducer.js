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

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  getFunctionRecipientHomePageData: { ...block, data: [] },
  getFunctionGlobalPersonaHomePageData: { ...block, data: [] },
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

    default:
      return state;
  }
};
