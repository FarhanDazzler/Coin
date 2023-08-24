import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../../api/axios';
import { getSimplifiedError } from '../../../utils/error';
import {
  GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_ERROR,
  GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR,
} from './RL_HomePageReducer';
import Swal from 'sweetalert2';

// GET Functional Recipient home page table data
async function getFunctionRecipientHomePageDataApi(params) {
  return await Axios.get('/get_function_home_page_data_for_recipient', { params });
}
function* handle_GetFunctionRecipientHomePageData({ payload }) {
  try {
    const response = yield call(getFunctionRecipientHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

// GET Functional Global PErsona home page table data
async function getFunctionGlobalPersonaHomePageDataApi(params) {
  return await Axios.get('/get_function_home_page_data_for_global', { params });
}
function* handle_GetFunctionGlobalPersonaHomePageData({ payload }) {
  try {
    const response = yield call(getFunctionGlobalPersonaHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

export default all([
  takeLatest(
    GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_GetFunctionRecipientHomePageData,
  ),
  takeLatest(
    GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_GetFunctionGlobalPersonaHomePageData,
  ),
]);
