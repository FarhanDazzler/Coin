// =================== GET Rep Letter INSTRUCTIONS DATA ========================//
export const GET_INSTRUCTIONS_REQUEST = 'GET_INSTRUCTIONS_REQUEST';
export const GET_INSTRUCTIONS_SUCCESS = 'GET_INSTRUCTIONS_SUCCESS';
export const GET_INSTRUCTIONS_ERROR = 'GET_INSTRUCTIONS_ERROR';
// =================== GET Rep Letter INSTRUCTIONS DATA ========================//

// =================== MODIFY Rep Letter INSTRUCTIONS Data ========================//
export const MODIFY_INSTRUCTIONS_REQUEST = 'MODIFY_INSTRUCTIONS_REQUEST';
export const MODIFY_INSTRUCTIONS_SUCCESS = 'MODIFY_INSTRUCTIONS_SUCCESS';
export const MODIFY_INSTRUCTIONS_ERROR = 'MODIFY_INSTRUCTIONS_ERROR';

// =================== MODIFY Rep Letter INSTRUCTIONS Data ========================//

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  getInstructions: { ...block, data: [] },
  modifyInstructions: { ...block, data: [] },
};

export const AzureBlobStorageReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    // GET Rep Letter INSTRUCTIONS DATA
    case GET_INSTRUCTIONS_REQUEST:
      return {
        ...state,
        getInstructions: { ...state.getInstructions, loading: true },
      };
    case GET_INSTRUCTIONS_SUCCESS:
      return {
        ...state,
        getInstructions: { ...state.getInstructions, data: payload, loading: false },
      };
    case GET_INSTRUCTIONS_ERROR:
      return {
        ...state,
        getInstructions: { ...state.getInstructions, loading: false },
      };

    // MODIFY Rep Letter INSTRUCTIONS Data
    case MODIFY_INSTRUCTIONS_REQUEST:
      return {
        ...state,
        modifyInstructions: { ...state.modifyInstructions, loading: true },
      };
    case MODIFY_INSTRUCTIONS_SUCCESS:
      return {
        ...state,
        modifyInstructions: { ...state.modifyInstructions, data: payload, loading: false },
      };
    case MODIFY_INSTRUCTIONS_ERROR:
      return {
        ...state,
        modifyInstructions: { ...state.modifyInstructions, loading: false },
      };

    default:
      return state;
  }
};
