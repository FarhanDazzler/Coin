import {
  RESET_BLOCK_ASSESSMENT,
  RESET_FLAGS_ASSESSMENT,
  SAVE_ANS,
  GET_ASSESSMENT_RESPONSE_REQUEST,
  CLEAR_GET_ASSESSMENT_RESPONSE,
  ADD_ASSESSMENT_RESPONSE_REQUEST,
  UPDATE_ASSESSMENT_RESPONSE_REQUEST,
  GET_CONTROL_RESPONSE_REQUEST,
  GET_QUESTIONS_REQUEST,
  GET_KPI_RESULT_REQUEST,
  GET_DRAFT_RESPONSE_REQUEST,
  CLEAR_GET_LATEST_DRAFT_RESPONSE,
  ADD_UPDATE_DRAFT_RESPONSE_REQUEST,
  GET_FINAL_SUBMIT_RESPONSE_REQUEST,
  ADD_UPDATE_FINAL_SUBMIT_RESPONSE_REQUEST,
  GET_LATEST_DRAFT_REQUEST,
  ADD_OR_UPDATE_DRAFT_REQUEST,
  ADD_ASSESSMENT_SECTION_2_REQUEST,
  GET_ASSESSMENT_SECTION_2_REQUEST,
} from './AssessmentReducer';

export const saveAssessmentAns = (payload) => ({ type: SAVE_ANS, payload });

export const getQuestions = (payload) => ({ type: GET_QUESTIONS_REQUEST, payload });

export const getAssessmentAns = (payload) => ({ type: GET_ASSESSMENT_RESPONSE_REQUEST, payload });

export const clearAssessmentResponse = () => ({
  type: CLEAR_GET_ASSESSMENT_RESPONSE,
});

export const addAssessmentSection2Ans = (payload) => ({
  type: ADD_ASSESSMENT_SECTION_2_REQUEST,
  payload,
});
export const getAssessmentSection2Ans = (payload) => ({
  type: GET_ASSESSMENT_SECTION_2_REQUEST,
  payload,
});

export const addAssessmentAns = (payload) => ({ type: ADD_ASSESSMENT_RESPONSE_REQUEST, payload });

export const updateAssessmentAns = (payload) => ({
  type: UPDATE_ASSESSMENT_RESPONSE_REQUEST,
  payload,
});

export const addOrUpdateDraft = (payload) => ({
  type: ADD_OR_UPDATE_DRAFT_REQUEST,
  payload,
});

export const getLatestDraft = (payload) => ({
  type: GET_LATEST_DRAFT_REQUEST,
  payload,
});

export const clearLatestDraftResponse = () => ({
  type: CLEAR_GET_LATEST_DRAFT_RESPONSE,
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

export const getDraftResponse = (payload) => ({ type: GET_DRAFT_RESPONSE_REQUEST, payload });

export const addUpdateDraftResponse = (payload) => ({
  type: ADD_UPDATE_DRAFT_RESPONSE_REQUEST,
  payload,
});

export const getFinalSubmitResponse = (payload) => ({
  type: GET_FINAL_SUBMIT_RESPONSE_REQUEST,
  payload,
});

export const addUpdateFinalSubmitResponse = (payload) => ({
  type: ADD_UPDATE_FINAL_SUBMIT_RESPONSE_REQUEST,
  payload,
});
