import { all, call, put, takeLatest } from 'redux-saga/effects';
import Cookies from 'js-cookie';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import {
  SAVE_ANS,
  SAVE_ANS_ERROR,
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
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  GET_KPI_RESULT_REQUEST,
  GET_KPI_RESULT_SUCCESS,
  GET_KPI_RESULT_ERROR,
} from './AssessmentReducer';
import Swal from 'sweetalert2';

async function AssessmentAnsGetApi(params) {
  return await Axios.get('/get_user_response', { params });
}
function* handleGetAssessmentAns({ payload }) {
  try {
    const response = yield call(AssessmentAnsGetApi, payload);
    if (response.success) {
      yield put({
        type: GET_ASSESSMENT_RESPONSE_SUCCESS,
        payload: { data: response.data, Control_ID: payload.Control_ID },
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
    if (response.token) {
      yield put({
        type: ADD_ASSESSMENT_RESPONSE_SUCCESS,
      });
      Swal.fire('Done!', 'You are now being redirected to the mainpage', 'success');
    }
  } catch (error) {
    yield put({
      type: ADD_ASSESSMENT_RESPONSE_ERROR,
      error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Internal Server Error: Please refresh page', 'error');
  }
}

async function AssessmentAnsUpdateApi(payload) {
  return await Axios.post('/update_user_response', payload);
}
function* handleUpdateAssessmentAns({ payload }) {
  try {
    const response = yield call(AssessmentAnsUpdateApi, payload);
    if (response) {
      yield put({
        type: UPDATE_ASSESSMENT_RESPONSE_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: UPDATE_ASSESSMENT_RESPONSE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

async function getQuestionsApi(params) {
  return await Axios.get('/get_Section1_Question', { params });
}
function* handleGetQuestions({ payload }) {
  try {
    const response = yield call(getQuestionsApi, payload);
    if (response.success) {
      yield put({
        type: GET_QUESTIONS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_QUESTIONS_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

async function getKPIApi(params) {
  return await Axios.get('/get_KPIs_for_section_2', { params });
}
function* handleGetKPIData({ payload }) {
  try {
    const response = yield call(getKPIApi, payload);
    if (response.success) {
      yield put({
        type: GET_KPI_RESULT_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_KPI_RESULT_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

export default all([
  takeLatest(GET_ASSESSMENT_RESPONSE_REQUEST, handleGetAssessmentAns),
  takeLatest(ADD_ASSESSMENT_RESPONSE_REQUEST, handleAddAssessmentAns),
  takeLatest(UPDATE_ASSESSMENT_RESPONSE_REQUEST, handleUpdateAssessmentAns),
  takeLatest(GET_QUESTIONS_REQUEST, handleGetQuestions),
  takeLatest(GET_KPI_RESULT_REQUEST, handleGetKPIData),
]);
