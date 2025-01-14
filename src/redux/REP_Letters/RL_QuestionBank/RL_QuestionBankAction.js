import {
  GET_BU_QUESTIONS_REQUEST,
  ADD_BU_QUESTIONS_REQUEST,
  EDIT_BU_QUESTIONS_REQUEST,
  DELETE_BU_QUESTIONS_REQUEST,
  GET_BU_QUESTIONS_WITH_COMMENT_REQUEST,
  CLEAR_BU_QUESTIONS_WITH_COMMENT_REQUEST,
  GET_FUNCTION_QUESTIONS_REQUEST,
  ADD_FUNCTION_QUESTIONS_REQUEST,
  EDIT_FUNCTION_QUESTIONS_REQUEST,
  DELETE_FUNCTION_QUESTIONS_REQUEST,
  CREATE_NEW_FUNCTION_LETTER_REQUEST,
  GET_LETTER_NAME_FROM_FUNCTION_REQUEST,
  CLEAR_GET_FUNCTION_QUESTIONS_REQUEST,
  GET_INSTRUCTIONS_REQUEST,
  MODIFY_INSTRUCTIONS_REQUEST,
  GET_FUNCTIONAL_INSTRUCTIONS_REQUEST,
  MODIFY_FUNCTIONAL_INSTRUCTIONS_REQUEST,
} from './RL_QuestionBankReducer';

export const get_BU_Questions = (payload) => ({ type: GET_BU_QUESTIONS_REQUEST, payload });
export const get_BU_Questions_With_Comments = (payload) => ({
  type: GET_BU_QUESTIONS_WITH_COMMENT_REQUEST,
  payload,
});
export const clear_BU_Questions_With_Comments = () => ({
  type: CLEAR_BU_QUESTIONS_WITH_COMMENT_REQUEST,
});
export const add_BU_Questions = (payload) => ({ type: ADD_BU_QUESTIONS_REQUEST, payload });
export const edit_BU_Questions = (payload) => ({ type: EDIT_BU_QUESTIONS_REQUEST, payload });
export const delete_BU_Questions = (payload) => ({
  type: DELETE_BU_QUESTIONS_REQUEST,
  payload,
});

export const createNewFunctionRequest = (payload) => ({
  type: CREATE_NEW_FUNCTION_LETTER_REQUEST,
  payload,
});
export const getLetterNameFromFunction = (payload) => ({
  type: GET_LETTER_NAME_FROM_FUNCTION_REQUEST,
  payload,
});
export const get_Function_Questions = (payload) => ({
  type: GET_FUNCTION_QUESTIONS_REQUEST,
  payload,
});
export const clear_get_Function_Questions = () => ({
  type: CLEAR_GET_FUNCTION_QUESTIONS_REQUEST,
});
export const add_Function_Questions = (payload) => ({
  type: ADD_FUNCTION_QUESTIONS_REQUEST,
  payload,
});
export const edit_Function_Questions = (payload) => ({
  type: EDIT_FUNCTION_QUESTIONS_REQUEST,
  payload,
});
export const delete_Function_Questions = (payload) => ({
  type: DELETE_FUNCTION_QUESTIONS_REQUEST,
  payload,
});

export const getInstructions = (payload) => ({ type: GET_INSTRUCTIONS_REQUEST, payload });
export const modifyInstructions = (payload) => ({ type: MODIFY_INSTRUCTIONS_REQUEST, payload });
export const getFunctionalInstructions = (payload) => ({
  type: GET_FUNCTIONAL_INSTRUCTIONS_REQUEST,
  payload,
});
export const modifyFunctionalInstructions = (payload) => ({
  type: MODIFY_FUNCTIONAL_INSTRUCTIONS_REQUEST,
  payload,
});
