import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';

import {
  GET_ALL_ZONE_REQUEST,
  GET_ALL_ZONE_SUCCESS,
  GET_ALL_ZONE_ERROR,
  GET_ALL_BU_FROM_ZONE_REQUEST,
  GET_ALL_BU_FROM_ZONE_SUCCESS,
  GET_ALL_BU_FROM_ZONE_ERROR,
  GET_ALL_ENTITY_FROM_BU_REQUEST,
  GET_ALL_ENTITY_FROM_BU_SUCCESS,
  GET_ALL_ENTITY_FROM_BU_ERROR,
  GET_ALL_PROVIDER_FROM_ENTITY_REQUEST,
  GET_ALL_PROVIDER_FROM_ENTITY_SUCCESS,
  GET_ALL_PROVIDER_FROM_ENTITY_ERROR,
  GET_SCHEDULE_SURVEY_PAGE_2_TABLE_REQUEST,
  GET_SCHEDULE_SURVEY_PAGE_2_TABLE_SUCCESS,
  GET_SCHEDULE_SURVEY_PAGE_2_TABLE_ERROR,
  GET_SCHEDULE_SURVEY_PAGE_3_TABLE_REQUEST,
  GET_SCHEDULE_SURVEY_PAGE_3_TABLE_SUCCESS,
  GET_SCHEDULE_SURVEY_PAGE_3_TABLE_ERROR,
} from './AssessmentBankReducer';
import Swal from 'sweetalert2';

// get All Zone Api
async function getAllZoneApi(params) {
  return await Axios.get('/get_all_zones', { params });
}
function* handleGet_AllZone({ payload }) {
  try {
    const response = yield call(getAllZoneApi, payload);
    if (response.success) {
      yield put({
        type: GET_ALL_ZONE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ALL_ZONE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// get All BU From Zone
async function getAll_BU_FromZoneApi(params) {
  return await Axios.post('/get_all_bu', params);
}
function* getAll_BU_FromZoneData({ payload }) {
  try {
    const response = yield call(getAll_BU_FromZoneApi, payload);
    if (response.success) {
      yield put({
        type: GET_ALL_BU_FROM_ZONE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ALL_BU_FROM_ZONE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// get All Entity From BU
async function getAllEntityFromBUApi(params) {
  return await Axios.post('/get_all_entities', params);
}
function* getAllEntityFromBUData({ payload }) {
  try {
    const response = yield call(getAllEntityFromBUApi, payload);
    if (response.success) {
      yield put({
        type: GET_ALL_ENTITY_FROM_BU_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ALL_ENTITY_FROM_BU_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// get All Provider From Entity
async function getAllProviderFromEntityApi(params) {
  return await Axios.post('/get_all_providers', params);
}
function* getAllProviderFromEntityData({ payload }) {
  try {
    const response = yield call(getAllProviderFromEntityApi, payload);
    if (response.success) {
      yield put({
        type: GET_ALL_PROVIDER_FROM_ENTITY_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ALL_PROVIDER_FROM_ENTITY_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// Get Schedule Survey Page 2 table Data
async function getScheduleSurveyPage_2_tableApi(params) {
  return await Axios.post('/get_all_control_instances', params);
}
function* getScheduleSurveyPage_2_tableData({ payload }) {
  try {
    const response = yield call(getScheduleSurveyPage_2_tableApi, payload);
    if (response.success) {
      yield put({
        type: GET_SCHEDULE_SURVEY_PAGE_2_TABLE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_SCHEDULE_SURVEY_PAGE_2_TABLE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// Get Schedule Survey Page 3 table Data
async function getScheduleSurveyPage_3_tableApi(params) {
  return await Axios.post('/get_all_controls_filter', params);
}
function* getScheduleSurveyPage_3_tableData({ payload }) {
  try {
    const response = yield call(getScheduleSurveyPage_3_tableApi, payload);
    if (response.success) {
      yield put({
        type: GET_SCHEDULE_SURVEY_PAGE_3_TABLE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_SCHEDULE_SURVEY_PAGE_3_TABLE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

export default all([
  takeLatest(GET_ALL_ZONE_REQUEST, handleGet_AllZone),
  takeLatest(GET_ALL_BU_FROM_ZONE_REQUEST, getAll_BU_FromZoneData),
  takeLatest(GET_ALL_ENTITY_FROM_BU_REQUEST, getAllEntityFromBUData),
  takeLatest(GET_ALL_PROVIDER_FROM_ENTITY_REQUEST, getAllProviderFromEntityData),
  takeLatest(GET_SCHEDULE_SURVEY_PAGE_2_TABLE_REQUEST, getScheduleSurveyPage_2_tableData),
  takeLatest(GET_SCHEDULE_SURVEY_PAGE_3_TABLE_REQUEST, getScheduleSurveyPage_3_tableData),
]);
