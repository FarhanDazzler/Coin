import {
  GET_RL_FUNCTION_DATA_REQUEST,
  GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST,
  ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA,
  GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA,
  GET_RL_FUNCTION_ASSESSMENT_DATA_REQUEST,
  RECALL_FUNCTION_ASSESSMENT_REQUEST,
  RE_TRIGGER_FUNCTION_ASSESSMENT_REQUEST,
  GET_RL_BU_PAGE1_DATA_REQUEST,
  GET_RL_BU_BU_REQUEST,
  GET_RL_BU_ZONE_REQUEST,
  ACTION_ADD_RL_BU_LETTER_DATA,
  GET_RL_ALL_BU_LETTER_DATA,
  GET_RL_BU_LETTER_DATA_REQUEST,
  RECALL_BU_LETTER_REQUEST,
  RE_TRIGGER_BU_LETTER_REQUEST,
  GET_RL_ALL_BU_MDM_DATA
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

// ***** BU *********** //
export const getRlBUPage1Data = (payload) => ({
  type: GET_RL_BU_PAGE1_DATA_REQUEST,
  payload,
});
export const getRlBUZoneData = (payload) => ({
  type: GET_RL_BU_ZONE_REQUEST,
  payload,
});
export const getRlBUBUData = (payload) => ({
  type: GET_RL_BU_BU_REQUEST,
  payload,
});
export const getRlAllBuMdmData = (payload) => ({
  type: GET_RL_ALL_BU_MDM_DATA,
  payload,
});
export const addRlBuLetterData = (payload) => ({
  type: ACTION_ADD_RL_BU_LETTER_DATA,
  payload,
});

export const getRlAllBuLetterData = (payload) => ({
  type: GET_RL_ALL_BU_LETTER_DATA,
  payload,
});
export const getRlBuLetterData = (payload) => ({
  type: GET_RL_BU_LETTER_DATA_REQUEST,
  payload,
});
export const recallBuLetter = (payload) => ({
  type: RECALL_BU_LETTER_REQUEST,
  payload,
});

export const reTriggerBuLetter = (payload) => ({
  type: RE_TRIGGER_BU_LETTER_REQUEST,
  payload,
});
