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
  ADD_SECTION_1_MICS_REQUEST,
  UPDATE_SECTION_1_MICS_OPTION_REQUEST,
  DELETE_OPTION_SECTION_1_MICS_REQUEST,
  ADD_SECTION_1_OPTION_MICS_REQUEST,
  GET_REPOSITORY_OF_CONTROL_ID_DATA_REQUEST,
  RESET_SECTION_3_REQUEST,
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

export const resetSection3 = (payload) => ({
  type: RESET_SECTION_3_REQUEST,
  payload,
});

export const addSection1OptionQuestions = (payload) => ({
  type: ADD_SECTION_1_OPTION_MICS_REQUEST,
  payload,
});

export const updateOptionSection1Questions = (payload) => ({
  type: UPDATE_SECTION_1_MICS_OPTION_REQUEST,
  payload,
});

export const deleteSection1QuestionsOption = (payload) => ({
  type: DELETE_OPTION_SECTION_1_MICS_REQUEST,
  payload,
});

export const addSection1Questions = (payload) => ({
  type: ADD_SECTION_1_MICS_REQUEST,
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

export const getRepositoryOfControlID = (payload) => ({
  type: GET_REPOSITORY_OF_CONTROL_ID_DATA_REQUEST,
  payload,
});
