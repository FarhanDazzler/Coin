import {
  GET_RL_FUNCTION_DATA_REQUEST,
  GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST,
  ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA,
  GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA,
  GET_RL_FUNCTION_ASSESSMENT_DATA_REQUEST,
  RECALL_FUNCTION_ASSESSMENT_REQUEST,
  RE_TRIGGER_FUNCTION_ASSESSMENT_REQUEST,
} from './RL_SchedulingAndTriggeringReducer';

export const getRlFunctionData = (payload) => ({ type: GET_RL_FUNCTION_DATA_REQUEST, payload });
export const getRlFunctionalPage1Data = (payload) => ({
  type: GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST,
  payload,
});
export const addRlFunctionalAssessmentData = (payload) => ({
  type: ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA,
  payload,
});
export const getRlAllFunctionalAssessmentData = (payload) => ({
  type: GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA,
  payload,
});
export const getRlFunctionAssessmentData = (payload) => ({
  type: GET_RL_FUNCTION_ASSESSMENT_DATA_REQUEST,
  payload,
});
export const recallFunctionAssessment = (payload) => ({
  type: RECALL_FUNCTION_ASSESSMENT_REQUEST,
  payload,
});

export const reTriggerFunctionAssessment = (payload) => ({
  type: RE_TRIGGER_FUNCTION_ASSESSMENT_REQUEST,
  payload,
});
