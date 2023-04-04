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
  GET_DRAFT_RESPONSE_REQUEST,
  GET_DRAFT_RESPONSE_SUCCESS,
  GET_DRAFT_RESPONSE_ERROR,
  ADD_UPDATE_DRAFT_RESPONSE_REQUEST,
  ADD_UPDATE_DRAFT_RESPONSE_SUCCESS,
  ADD_UPDATE_DRAFT_RESPONSE_ERROR,
  GET_FINAL_SUBMIT_RESPONSE_REQUEST,
  GET_FINAL_SUBMIT_RESPONSE_SUCCESS,
  GET_FINAL_SUBMIT_RESPONSE_ERROR,
  ADD_UPDATE_FINAL_SUBMIT_RESPONSE_REQUEST,
  ADD_UPDATE_FINAL_SUBMIT_RESPONSE_SUCCESS,
  ADD_UPDATE_FINAL_SUBMIT_RESPONSE_ERROR,
  GET_LATEST_DRAFT_REQUEST,
  ADD_OR_UPDATE_DRAFT_REQUEST,
  GET_LATEST_DRAFT_SUCCESS,
  GET_LATEST_DRAFT_ERROR,
  ADD_OR_UPDATE_DRAFT_SUCCESS,
  ADD_OR_UPDATE_DRAFT_ERROR,
} from './AssessmentReducer';
import Swal from 'sweetalert2';

async function GetLatestDraftApi(params) {
  return await Axios.get('/get_latest_draft', { params });
}
function* handleGetLatestDraft({ payload }) {
  try {
    const response = yield call(GetLatestDraftApi, payload);
    if (response.success) {
      yield put({
        type: GET_LATEST_DRAFT_SUCCESS,
        payload: { data: response.data },
      });
    }
  } catch (error) {
    yield put({
      type: GET_LATEST_DRAFT_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function AddOrUpdateDraftApi(payload) {
  return await Axios.post('/add_or_update_draft/', payload);
}
function* handleAddOrUpdateDraft({ payload }) {
  try {
    const response = yield call(AddOrUpdateDraftApi, payload);
    if (response.success) {
      yield put({
        type: ADD_OR_UPDATE_DRAFT_SUCCESS,
        payload: { data: response.data, Control_ID: payload.Control_ID },
      });
    }
  } catch (error) {
    yield put({
      type: ADD_OR_UPDATE_DRAFT_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

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

// API needs to be added
async function getDraftResponseApi(params) {
  return await Axios.get('/', { params });
}
function* handleGet_draftResponse({ payload }) {
  try {
    const response = yield call(getDraftResponseApi, payload);
    if (response.success) {
      yield put({
        type: GET_DRAFT_RESPONSE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_DRAFT_RESPONSE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// API needs to be added
async function addUpdateDraftResponseApi(params) {
  return await Axios.get('/', { params });
}
function* handle_addUpdateDraftResponse({ payload }) {
  try {
    const response = yield call(addUpdateDraftResponseApi, payload);
    if (response.success) {
      yield put({
        type: ADD_UPDATE_DRAFT_RESPONSE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: ADD_UPDATE_DRAFT_RESPONSE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// API needs to be added
async function getFinalSubmitResponseApi(params) {
  return await Axios.get('/', { params });
}
function* handleGet_FinalSubmitResponse({ payload }) {
  try {
    const response = yield call(getFinalSubmitResponseApi, payload);
    if (response.success) {
      yield put({
        type: GET_FINAL_SUBMIT_RESPONSE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_FINAL_SUBMIT_RESPONSE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// API needs to be added
async function addUpdateFinalSubmitResponseApi(params) {
  return await Axios.get('/', { params });
}
function* handle_addUpdateFinalSubmitResponse({ payload }) {
  try {
    const response = yield call(addUpdateFinalSubmitResponseApi, payload);
    if (response.success) {
      yield put({
        type: ADD_UPDATE_FINAL_SUBMIT_RESPONSE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: ADD_UPDATE_FINAL_SUBMIT_RESPONSE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

export default all([
  takeLatest(GET_LATEST_DRAFT_REQUEST, handleGetLatestDraft),
  takeLatest(ADD_OR_UPDATE_DRAFT_REQUEST, handleAddOrUpdateDraft),
  takeLatest(GET_ASSESSMENT_RESPONSE_REQUEST, handleGetAssessmentAns),
  takeLatest(ADD_ASSESSMENT_RESPONSE_REQUEST, handleAddAssessmentAns),
  takeLatest(UPDATE_ASSESSMENT_RESPONSE_REQUEST, handleUpdateAssessmentAns),
  takeLatest(GET_QUESTIONS_REQUEST, handleGetQuestions),
  takeLatest(GET_KPI_RESULT_REQUEST, handleGetKPIData),
  takeLatest(GET_DRAFT_RESPONSE_REQUEST, handleGet_draftResponse),
  takeLatest(ADD_UPDATE_DRAFT_RESPONSE_REQUEST, handle_addUpdateDraftResponse),
  takeLatest(GET_FINAL_SUBMIT_RESPONSE_REQUEST, handleGet_FinalSubmitResponse),
  takeLatest(ADD_UPDATE_FINAL_SUBMIT_RESPONSE_REQUEST, handle_addUpdateFinalSubmitResponse),
]);
