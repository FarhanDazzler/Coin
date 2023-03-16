import {
  RESET_BLOCK_QUESTIONS,
  RESET_FLAGS_QUESTIONS,
  GET_SECTION_3_MICS_REQUEST,
  GET_SECTION_3_MICS_ADD_REQUEST,
  GET_SECTION_3_MICS_UPDATE_REQUEST,
  GET_SECTION_3_MICS_DELETE_REQUEST,
  GET_SECTION_1_MICS_REQUEST,
  UPDATE_SECTION_1_MICS_REQUEST,
  DELETE_SECTION_1_MICS_REQUEST,
} from './QuestionsReducer';

export const getSection1Questions = (payload) => ({
  type: GET_SECTION_1_MICS_REQUEST,
  payload,
});
export const updateSection1Questions = (payload) => ({
  type: UPDATE_SECTION_1_MICS_REQUEST,
  payload,
});
export const deleteSection1Questions = (payload) => ({
  type: DELETE_SECTION_1_MICS_REQUEST,
  payload,
});
export const getSection3Questions = (payload) => ({ type: GET_SECTION_3_MICS_REQUEST, payload });

export const addSection3Questions = (payload) => ({
  type: GET_SECTION_3_MICS_ADD_REQUEST,
  payload,
});
export const updateSection3Questions = (payload) => ({
  type: GET_SECTION_3_MICS_UPDATE_REQUEST,
  payload,
});
export const deleteSection3Questions = (payload) => ({
  type: GET_SECTION_3_MICS_DELETE_REQUEST,
  payload,
});

export const resetBlockQuestions = (payload) => ({
  type: RESET_BLOCK_QUESTIONS,
  payload,
});

export const resetFlagsQuestions = (payload) => ({
  type: RESET_FLAGS_QUESTIONS,
  payload,
});
