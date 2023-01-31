import { all, call, put, takeLatest } from 'redux-saga/effects';
import Cookies from 'js-cookie';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import {
  SAVE_ANS, SAVE_ANS_ERROR,
  SAVE_ANS_SUCCESS,
  GET_ASSESSMENT_RESPONSE_REQUEST,
  ADD_ASSESSMENT_RESPONSE_REQUEST,
  UPDATE_ASSESSMENT_RESPONSE_REQUEST,
  GET_ASSESSMENT_RESPONSE_SUCCESS,
  GET_ASSESSMENT_RESPONSE_ERROR,
  UPDATE_ASSESSMENT_RESPONSE_SUCCESS,
  UPDATE_ASSESSMENT_RESPONSE_ERROR,
  ADD_ASSESSMENT_RESPONSE_SUCCESS,
  ADD_ASSESSMENT_RESPONSE_ERROR,
} from './AssessmentReducer';


async function AssessmentAnsGetApi(params) {
  return await Axios.get('/get_user_response', { params });
}
function* handleGetAssessmentAns({ payload }) {
  try {
    const response = yield call(AssessmentAnsGetApi, payload);
    if (response.success) {
      yield put({
        type: GET_ASSESSMENT_RESPONSE_SUCCESS,
        payload: response.data
      });
    }
  } catch (error) {
    yield put({
      type: GET_ASSESSMENT_RESPONSE_ERROR,
      error: getSimplifiedError(error),
    });
  }
}


async function AssessmentAnsAddApi(payload) {
  return await Axios.post('/add_user_response/', payload);
}
function* handleAddAssessmentAns({ payload }) {
  try {
    const response = yield call(AssessmentAnsAddApi, payload);
    debugger
    if (response.token) {
      yield put({
        type: ADD_ASSESSMENT_RESPONSE_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: ADD_ASSESSMENT_RESPONSE_ERROR,
      error: getSimplifiedError(error),
    });
  }
}


async function AssessmentAnsUpdateApi(payload) {
  return await Axios.post('/update_user_response', payload);
}
function* handleUpdateAssessmentAns({ payload }) {
  try {
    const response = yield call(AssessmentAnsUpdateApi, payload);
    debugger
    if (response.token) {
      yield put({
        type: UPDATE_ASSESSMENT_RESPONSE_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: UPDATE_ASSESSMENT_RESPONSE_ERROR,
      error: getSimplifiedError(error),
    });
  }
}


export default all([
  takeLatest(GET_ASSESSMENT_RESPONSE_REQUEST, handleGetAssessmentAns),
  takeLatest(ADD_ASSESSMENT_RESPONSE_REQUEST, handleAddAssessmentAns),
  takeLatest(UPDATE_ASSESSMENT_RESPONSE_REQUEST, handleUpdateAssessmentAns),
]);
