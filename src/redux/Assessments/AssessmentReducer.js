export const SAVE_ANS = 'RESET_BLOCK_ASSESSMENT';
export const SAVE_ANS_SUCCESS = 'SAVE_ANS_SUCCESS';
export const SAVE_ANS_ERROR = 'SAVE_ANS_ERROR';

export const GET_ASSESSMENT_RESPONSE_REQUEST = "GET_ASSESSMENT_RESPONSE_REQUEST";
export const GET_ASSESSMENT_RESPONSE_SUCCESS = "GET_ASSESSMENT_RESPONSE_SUCCESS";
export const GET_ASSESSMENT_RESPONSE_ERROR = "GET_ASSESSMENT_RESPONSE_ERROR";

export const UPDATE_ASSESSMENT_RESPONSE_REQUEST = "UPDATE_ASSESSMENT_RESPONSE_REQUEST";
export const UPDATE_ASSESSMENT_RESPONSE_SUCCESS = "UPDATE_ASSESSMENT_RESPONSE_SUCCESS";
export const UPDATE_ASSESSMENT_RESPONSE_ERROR = "UPDATE_ASSESSMENT_RESPONSE_ERROR";

export const ADD_ASSESSMENT_RESPONSE_REQUEST = "ADD_ASSESSMENT_RESPONSE_REQUEST";
export const ADD_ASSESSMENT_RESPONSE_SUCCESS = "ADD_ASSESSMENT_RESPONSE_SUCCESS";
export const ADD_ASSESSMENT_RESPONSE_ERROR = "ADD_ASSESSMENT_RESPONSE_ERROR";

export const RESET_BLOCK_ASSESSMENT = 'RESET_BLOCK_ASSESSMENT';
export const RESET_FLAGS_ASSESSMENT = 'RESET_FLAGS_ASSESSMENT';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  sectionAns: null,
  getResponse: { ...block },
  addResponse: { ...block },
  updateResponse: { ...block },
};

export const AssessmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_ANS:
      return {
        ...state,
        sectionAns: {
          ...state.sectionAns,
          ...payload
        },
      };

    case GET_ASSESSMENT_RESPONSE_REQUEST:
      return {
        ...state,
        getResponse: { ...state.getResponse, loading: true }
      }
    case GET_ASSESSMENT_RESPONSE_SUCCESS:
      return {
        ...state,
        getResponse: { ...state.getResponse, loading: false },
        sectionAns: payload.Response_Data
      }
    case GET_ASSESSMENT_RESPONSE_ERROR:
      return {
        ...state,
        getResponse: { ...state.getResponse, loading: false }
      }

    case UPDATE_ASSESSMENT_RESPONSE_REQUEST:
      return {
        ...state,
        updateResponse: { ...state.updateResponse, loading: true }
      }
    case UPDATE_ASSESSMENT_RESPONSE_SUCCESS:
      return {
        ...state,
        updateResponse: { ...state.updateResponse, loading: false }
      }
    case UPDATE_ASSESSMENT_RESPONSE_ERROR:
      return {
        ...state,
        updateResponse: { ...state.updateResponse, loading: false }
      }

    case ADD_ASSESSMENT_RESPONSE_REQUEST:
      return {
        ...state,
        addResponse: { ...state.addResponse, loading: true }
      }
    case ADD_ASSESSMENT_RESPONSE_SUCCESS:
      return {
        ...state,
        addResponse: { ...state.addResponse, loading: false }
      }
    case ADD_ASSESSMENT_RESPONSE_ERROR:
      return {
        ...state,
        addResponse: { ...state.addResponse, loading: false }
      }

    //reset block with flag and data
    case RESET_BLOCK_ASSESSMENT:
      return {
        ...state,
        [payload.blockType]: {
          ...state[payload.blockType],
          ...initialState[payload.blockType],
        },
      };

    //reset only flags(block)
    case RESET_FLAGS_ASSESSMENT:
      return {
        ...state,
        [payload.blockType]: {
          ...state[payload.blockType],
          ...block,
        },
      };

    default:
      return state;
  }
};
