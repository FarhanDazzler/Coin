export const GET_RL_FUNCTION_DATA_REQUEST = 'GET_RL_FUNCTION_DATA_REQUEST';
export const GET_RL_FUNCTION_DATA_SUCCESS = 'GET_RL_FUNCTION_DATA_SUCCESS';
export const GET_RL_FUNCTION_DATA_ERROR = 'GET_RL_FUNCTION_DATA_ERROR';

export const GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST = 'GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST';
export const GET_RL_FUNCTIONAL_PAGE1_DATA_SUCCESS = 'GET_RL_FUNCTIONAL_PAGE1_DATA_SUCCESS';
export const GET_RL_FUNCTIONAL_PAGE1_DATA_ERROR = 'GET_RL_FUNCTIONAL_PAGE1_DATA_ERROR';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  rlFunctionData: { ...block, data: [] },
  rlFunctionalPage1Data: { ...block, data: [] },
};
export const RLSchedulingAndTriggeringReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    // Function Dropdown data
    case GET_RL_FUNCTION_DATA_REQUEST:
      return {
        ...state,
        rlFunctionData: { ...state.rlFunctionData, loading: true },
      };
    case GET_RL_FUNCTION_DATA_SUCCESS:
      return {
        ...state,
        rlFunctionData: { ...state.rlFunctionData, data: payload, loading: false },
      };
    case GET_RL_FUNCTION_DATA_ERROR:
      return {
        ...state,
        rlFunctionData: { ...state.rlFunctionData, loading: false },
      };
    // Functional Page1 data
    case GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST:
      return {
        ...state,
        rlFunctionalPage1Data: { ...state.rlFunctionalPage1Data, loading: true },
      };
    case GET_RL_FUNCTIONAL_PAGE1_DATA_SUCCESS:
      return {
        ...state,
        rlFunctionalPage1Data: { ...state.rlFunctionalPage1Data, data: payload, loading: false },
      };
    case GET_RL_FUNCTIONAL_PAGE1_DATA_ERROR:
      return {
        ...state,
        rlFunctionalPage1Data: { ...state.rlFunctionalPage1Data, loading: false },
      };
    default:
      return state;
  }
};
