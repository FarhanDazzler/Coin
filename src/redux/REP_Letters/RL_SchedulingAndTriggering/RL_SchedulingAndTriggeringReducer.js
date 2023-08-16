export const GET_RL_FUNCTION_DATA_REQUEST = 'GET_RL_FUNCTION_DATA_REQUEST';
export const GET_RL_FUNCTION_DATA_SUCCESS = 'GET_RL_FUNCTION_DATA_SUCCESS';
export const GET_RL_FUNCTION_DATA_ERROR = 'GET_RL_FUNCTION_DATA_ERROR';

export const GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST = 'GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST';
export const GET_RL_FUNCTIONAL_PAGE1_DATA_SUCCESS = 'GET_RL_FUNCTIONAL_PAGE1_DATA_SUCCESS';
export const GET_RL_FUNCTIONAL_PAGE1_DATA_ERROR = 'GET_RL_FUNCTIONAL_PAGE1_DATA_ERROR';

export const ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA = 'ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA';
export const ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA_SUCCESS =
  'ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA_SUCCESS';
export const ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA_FAILED =
  'ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA_FAILED';

export const GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA = 'GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA';
export const GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA_SUCCESS =
  'GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA_SUCCESS';
export const GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA_FAILED =
  'GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA_FAILED';

export const GET_RL_FUNCTION_ASSESSMENT_DATA_REQUEST = 'GET_RL_FUNCTION_ASSESSMENT_DATA_REQUEST';
export const GET_RL_FUNCTION_ASSESSMENT_DATA_SUCCESS = 'GET_RL_FUNCTION_ASSESSMENT_DATA_SUCCESS';
export const GET_RL_FUNCTION_ASSESSMENT_DATA_ERROR = 'GET_RL_FUNCTION_ASSESSMENT_DATA_ERROR';

// =================== RECALL_FUNCTION Assessment ========================//

export const RECALL_FUNCTION_ASSESSMENT_REQUEST = 'RECALL_FUNCTION_ASSESSMENT_REQUEST';
export const RECALL_FUNCTION_ASSESSMENT_SUCCESS = 'RECALL_FUNCTION_ASSESSMENT_SUCCESS';
export const RECALL_FUNCTION_ASSESSMENT_ERROR = 'RECALL_FUNCTION_ASSESSMENT_ERROR';

// =================== RECALL_FUNCTION Assessment ========================//

// =================== Re-Trigger Assessment ========================//

export const RE_TRIGGER_FUNCTION_ASSESSMENT_REQUEST = 'RE_TRIGGER_FUNCTION_ASSESSMENT_REQUEST';
export const RE_TRIGGER_FUNCTION_ASSESSMENT_SUCCESS = 'RE_TRIGGER_FUNCTION_ASSESSMENT_SUCCESS';
export const RE_TRIGGER_FUNCTION_ASSESSMENT_ERROR = 'RE_TRIGGER_FUNCTION_ASSESSMENT_ERROR';

// =================== Re-Trigger Assessment ========================//

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  rlFunctionData: { ...block, data: [] },
  rlFunctionalPage1Data: { ...block, data: [] },
  rlAddFunctionalAssessmentData: { ...block, data: [] },
  rlGetAllFunctionalAssessmentData: { ...block, data: [] },
  rlGetFunctionalAssessmentData: { ...block, data: [] },
  recallFunctionAssessment: { ...block, data: [] },
  reTriggerFunctionAssessment: { ...block, data: [] },
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

    // Add Functional Assessment Data
    case ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA:
      return {
        ...state,
        rlAddFunctionalAssessmentData: {
          ...state.rlAddFunctionalAssessmentData,
          loading: true,
        },
      };
    case ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA_SUCCESS:
      return {
        ...state,
        rlAddFunctionalAssessmentData: {
          ...state.rlAddFunctionalAssessmentData,
          data: payload,
          loading: false,
        },
      };
    case ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA_FAILED:
      return {
        ...state,
        rlAddFunctionalAssessmentData: {
          ...state.rlAddFunctionalAssessmentData,
          loading: false,
        },
      };

    // Get All Functional Assessment Data
    case GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA:
      return {
        ...state,
        rlGetAllFunctionalAssessmentData: {
          ...state.rlGetAllFunctionalAssessmentData,
          loading: true,
        },
      };
    case GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA_SUCCESS:
      return {
        ...state,
        rlGetAllFunctionalAssessmentData: {
          ...state.rlGetAllFunctionalAssessmentData,
          data: payload,
          loading: false,
        },
      };
    case GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA_FAILED:
      return {
        ...state,
        rlGetAllFunctionalAssessmentData: {
          ...state.rlGetAllFunctionalAssessmentData,
          loading: false,
        },
      };

    // Get Functional Assessment Data
    case GET_RL_FUNCTION_ASSESSMENT_DATA_REQUEST:
      return {
        ...state,
        rlGetFunctionalAssessmentData: {
          ...state.rlGetFunctionalAssessmentData,
          loading: true,
        },
      };
    case GET_RL_FUNCTION_ASSESSMENT_DATA_SUCCESS:
      return {
        ...state,
        rlGetFunctionalAssessmentData: {
          ...state.rlGetFunctionalAssessmentData,
          data: payload,
          loading: false,
        },
      };
    case GET_RL_FUNCTION_ASSESSMENT_DATA_ERROR:
      return {
        ...state,
        rlGetFunctionalAssessmentData: {
          ...state.rlGetFunctionalAssessmentData,
          loading: false,
        },
      };

    //RECALL_FUNCTION Assessment
    case RECALL_FUNCTION_ASSESSMENT_REQUEST:
      return {
        ...state,
        recallFunctionAssessment: {
          ...state.recallFunctionAssessment,
          loading: true,
        },
      };
    case RECALL_FUNCTION_ASSESSMENT_SUCCESS:
      return {
        ...state,
        recallFunctionAssessment: {
          ...state.recallFunctionAssessment,
          data: payload,
          loading: false,
        },
      };
    case RECALL_FUNCTION_ASSESSMENT_ERROR:
      return {
        ...state,
        recallFunctionAssessment: {
          ...state.recallFunctionAssessment,
          loading: false,
        },
      };

    //Re-Trigger Assessment
    case RE_TRIGGER_FUNCTION_ASSESSMENT_REQUEST:
      return {
        ...state,
        reTriggerFunctionAssessment: {
          ...state.reTriggerFunctionAssessment,
          loading: true,
        },
      };
    case RE_TRIGGER_FUNCTION_ASSESSMENT_SUCCESS:
      return {
        ...state,
        reTriggerFunctionAssessment: {
          ...state.reTriggerFunctionAssessment,
          data: payload,
          loading: false,
        },
      };
    case RE_TRIGGER_FUNCTION_ASSESSMENT_ERROR:
      return {
        ...state,
        reTriggerFunctionAssessment: {
          ...state.reTriggerFunctionAssessment,
          loading: false,
        },
      };
    default:
      return state;
  }
};
