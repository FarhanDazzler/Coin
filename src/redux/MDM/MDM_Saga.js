import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';

import {
  GET_ORG_STRUCTURES_REQUEST,
  GET_ORG_STRUCTURES_SUCCESS,
  GET_ORG_STRUCTURES_ERROR,
  GET_ORG_HIERARCHY_REQUEST,
  GET_ORG_HIERARCHY_SUCCESS,
  GET_ORG_HIERARCHY_ERROR,
  GET_MICS_FRAMEWORK_REQUEST,
  GET_MICS_FRAMEWORK_SUCCESS,
  GET_MICS_FRAMEWORK_ERROR,
} from './MDM_Reducer';

async function getOrgStructuresApi(params) {
  return await Axios.get('/get_org_structures', { params });
}
function* handleGet_org_structures({ payload }) {
  try {
    const response = yield call(getOrgStructuresApi, payload);
    if (response.success) {
      yield put({
        type: GET_ORG_STRUCTURES_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ORG_STRUCTURES_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

async function getOrgHierarchyApi(params) {
  return await Axios.get('/get_hierarchy', { params });
}
function* handleGet_org_hierarchy({ payload }) {
  try {
    const response = yield call(getOrgHierarchyApi, payload);
    if (response.success) {
      yield put({
        type: GET_ORG_HIERARCHY_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ORG_HIERARCHY_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

async function getMicsFrameworkApi(params) {
  return await Axios.get('/get_mics_framework_details', { params });
}
function* handleGet_MicsFramework({ payload }) {
  try {
    const response = yield call(getMicsFrameworkApi, payload);
    if (response.success) {
      yield put({
        type: GET_MICS_FRAMEWORK_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_MICS_FRAMEWORK_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

export default all([
  takeLatest(GET_ORG_STRUCTURES_REQUEST, handleGet_org_structures),
  takeLatest(GET_ORG_HIERARCHY_REQUEST, handleGet_org_hierarchy),
  takeLatest(GET_MICS_FRAMEWORK_REQUEST, handleGet_MicsFramework),
]);
