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
  UPDATE_LATEST_DRAFT,
  GET_MICS_OPEN_ACTION_PLAN_REQUEST,
  GET_MICS_OPEN_ACTION_PLAN_DATA_REQUEST,
  CLEAR_MICS_OPEN_ACTION_PLAN_DATA,
  GET_PREVIOUS_ASSESSMENT_RESULT_REQUEST,
  CLEAR_PREVIOUS_ASSESSMENT_RESULT,
  GET_PREVIOUS_ASSESSMENT_RESULT_LAST_CALL_ID,
} from './AssessmentReducer';

export const saveAssessmentAns = (payload) => ({ type: SAVE_ANS, payload });

export const getQuestions = (payload) => ({ type: GET_QUESTIONS_REQUEST, payload });

export const getAssessmentAns = (payload) => ({ type: GET_ASSESSMENT_RESPONSE_REQUEST, payload });

export const getMicsOpenActionPlan = (payload) => ({
  type: GET_MICS_OPEN_ACTION_PLAN_REQUEST,
  payload,
});

export const updateLastAccess = () => ({
  type: UPDATE_LATEST_DRAFT,
});

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

export const get_MICS_OpenActionPlan = (payload) => ({
  type: GET_MICS_OPEN_ACTION_PLAN_DATA_REQUEST,
  payload,
});

export const clear_MICS_OpenActionPlan = () => ({
  type: CLEAR_MICS_OPEN_ACTION_PLAN_DATA,
});

export const get_previous_assessment_result = (payload) => ({
  type: GET_PREVIOUS_ASSESSMENT_RESULT_REQUEST,
  payload,
});

export const get_previous_assessment_result_last_id = (payload) => ({
  type: GET_PREVIOUS_ASSESSMENT_RESULT_LAST_CALL_ID,
  payload,
});

export const clear_previous_assessment_result = (payload) => ({
  type: CLEAR_PREVIOUS_ASSESSMENT_RESULT,
  payload,
});
