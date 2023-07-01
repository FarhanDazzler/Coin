import {
  GET_BU_QUESTIONS_REQUEST,
  ADD_BU_QUESTIONS_REQUEST,
  EDIT_BU_QUESTIONS_REQUEST,
  DELETE_BU_QUESTIONS_REQUEST,
  GET_FUNCTION_QUESTIONS_REQUEST,
  ADD_FUNCTION_QUESTIONS_REQUEST,
  EDIT_FUNCTION_QUESTIONS_REQUEST,
  DELETE_FUNCTION_QUESTIONS_REQUEST,
} from './RL_QuestionBankReducer';

export const get_BU_Questions = (payload) => ({ type: GET_BU_QUESTIONS_REQUEST, payload });
export const add_BU_Questions = (payload) => ({ type: ADD_BU_QUESTIONS_REQUEST, payload });
export const edit_BU_Questions = (payload) => ({ type: EDIT_BU_QUESTIONS_REQUEST, payload });
export const delete_BU_Questions = (payload) => ({
  type: DELETE_BU_QUESTIONS_REQUEST,
  payload,
});
export const get_Function_Questions = (payload) => ({
  type: GET_FUNCTION_QUESTIONS_REQUEST,
  payload,
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
