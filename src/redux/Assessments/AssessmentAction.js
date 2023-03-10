import {
  RESET_BLOCK_ASSESSMENT,
  RESET_FLAGS_ASSESSMENT,
  SAVE_ANS,
  GET_ASSESSMENT_RESPONSE_REQUEST,
  ADD_ASSESSMENT_RESPONSE_REQUEST,
  UPDATE_ASSESSMENT_RESPONSE_REQUEST,
  GET_CONTROL_RESPONSE_REQUEST,
  GET_QUESTIONS_REQUEST,
  GET_KPI_RESULT_REQUEST,
} from './AssessmentReducer';

export const saveAssessmentAns = (payload) => ({ type: SAVE_ANS, payload });

export const getQuestions = (payload) => ({ type: GET_QUESTIONS_REQUEST, payload });

export const getAssessmentAns = (payload) => ({ type: GET_ASSESSMENT_RESPONSE_REQUEST, payload });

export const addAssessmentAns = (payload) => ({ type: ADD_ASSESSMENT_RESPONSE_REQUEST, payload });

export const updateAssessmentAns = (payload) => ({
  type: UPDATE_ASSESSMENT_RESPONSE_REQUEST,
  payload,
});

export const getKPIData = (payload) => ({
  type: GET_KPI_RESULT_REQUEST,
  payload,
});

export const controlData = (payload) => ({ type: GET_CONTROL_RESPONSE_REQUEST, payload });

export const resetBlockAssessment = (payload) => ({
  type: RESET_BLOCK_ASSESSMENT,
  payload,
});

export const resetFlagsAssessment = (payload) => ({
  type: RESET_FLAGS_ASSESSMENT,
  payload,
});