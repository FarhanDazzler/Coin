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
  GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_ERROR,
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

// GET BU Global PErsona home page table data
async function get_BU_GlobalPersonaHomePageDataApi(params) {
  return await Axios.get('/get_bu_home_page_data_for_global', { params });
}
function* handle_Get_BU_GlobalPersonaHomePageData({ payload }) {
  try {
    const response = yield call(get_BU_GlobalPersonaHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

// GET BU BU HEAD home page table data
async function get_BU_BU_HeadHomePageDataApi(params) {
  return await Axios.get('/get_bu_home_page_data_for_bu_head', { params });
}
function* handle_Get_BU_BU_HeadHomePageData({ payload }) {
  try {
    const response = yield call(get_BU_BU_HeadHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

// GET BU Disclosure Processor home page table data
async function get_BU_Disclosure_ProcessorHomePageDataApi(params) {
  return await Axios.get('/get_bu_home_page_data_for_disclosure_processor', { params });
}
function* handle_Get_BU_Disclosure_ProcessorHomePageData({ payload }) {
  try {
    const response = yield call(get_BU_Disclosure_ProcessorHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

// GET BU Finance Director home page table data
async function get_BU_Finance_DirectorHomePageDataApi(params) {
  return await Axios.get('/get_bu_home_page_data_for_finance_director', { params });
}
function* handle_Get_BU_Finance_DirectorHomePageData({ payload }) {
  try {
    const response = yield call(get_BU_Finance_DirectorHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

// GET BU ZONE CONTROL home page table data
async function get_BU_Zone_ControlHomePageDataApi(params) {
  return await Axios.get('/get_bu_home_page_data_for_zone_control', { params });
}
function* handle_Get_BU_Zone_ControlHomePageData({ payload }) {
  try {
    const response = yield call(get_BU_Zone_ControlHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

// GET BU Zone VP home page table data
async function get_BU_Zone_VPHomePageDataApi(params) {
  return await Axios.get('/get_bu_home_page_data_for_zone_vp', { params });
}
function* handle_Get_BU_Zone_VPHomePageData({ payload }) {
  try {
    const response = yield call(get_BU_Zone_VPHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_ERROR,
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
  takeLatest(
    GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_Get_BU_GlobalPersonaHomePageData,
  ),
  takeLatest(GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_REQUEST, handle_Get_BU_BU_HeadHomePageData),
  takeLatest(
    GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_Get_BU_Disclosure_ProcessorHomePageData,
  ),
  takeLatest(
    GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_Get_BU_Finance_DirectorHomePageData,
  ),
  takeLatest(
    GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_Get_BU_Zone_ControlHomePageData,
  ),
  takeLatest(GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_REQUEST, handle_Get_BU_Zone_VPHomePageData),
]);
