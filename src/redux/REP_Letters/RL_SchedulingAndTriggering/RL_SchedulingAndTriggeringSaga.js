import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../../api/axios';
import { getSimplifiedError } from '../../../utils/error';
import {
  GET_RL_FUNCTION_DATA_REQUEST,
  GET_RL_FUNCTION_DATA_ERROR,
  GET_RL_FUNCTION_DATA_SUCCESS,
  GET_RL_FUNCTIONAL_PAGE1_DATA_ERROR,
  GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST,
  GET_RL_FUNCTIONAL_PAGE1_DATA_SUCCESS,
  ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA,
  ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA_FAILED,
  ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA_SUCCESS,
  GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA,
  GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA_FAILED,
  GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA_SUCCESS,
  GET_RL_FUNCTION_ASSESSMENT_DATA_ERROR,
  GET_RL_FUNCTION_ASSESSMENT_DATA_REQUEST,
  GET_RL_FUNCTION_ASSESSMENT_DATA_SUCCESS,
  RECALL_FUNCTION_ASSESSMENT_ERROR,
  RECALL_FUNCTION_ASSESSMENT_REQUEST,
  RECALL_FUNCTION_ASSESSMENT_SUCCESS,
  RE_TRIGGER_FUNCTION_ASSESSMENT_ERROR,
  RE_TRIGGER_FUNCTION_ASSESSMENT_REQUEST,
  RE_TRIGGER_FUNCTION_ASSESSMENT_SUCCESS
} from './RL_SchedulingAndTriggeringReducer';

import Swal from 'sweetalert2';

async function getRlFunctionDataApi(params) {
    return await Axios.get('/get_rep_functions', { params });
  }
  function* handleGet_Rl_functiona_data({ payload }) {
    try {
      const response = yield call(getRlFunctionDataApi, payload);
      if (response.success) {
        yield put({
          type: GET_RL_FUNCTION_DATA_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      yield put({
        type: GET_RL_FUNCTION_DATA_ERROR,
        // error: getSimplifiedError(error),
      });
    }
  }

  async function getRlFunctionalPage1DataApi(params) {
    return await Axios.get('/get_functional_page1_data', { params });
  }
  function* handleGet_Rl_functional_page1_data({ payload }) {
    try {
      const response = yield call(getRlFunctionalPage1DataApi, payload);
      if (response.success) {
        yield put({
          type: GET_RL_FUNCTIONAL_PAGE1_DATA_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      yield put({
        type: GET_RL_FUNCTIONAL_PAGE1_DATA_ERROR,
        // error: getSimplifiedError(error),
      });
    }
  }

//Add Functional Assessment Data
async function addRlFunctionalAssessmentdataApi(payload) {
  return await Axios.post('/add_functional_assessment_data', payload);
}
function* handle_addRlFunctionalAssessment_data({ payload }) {
  try {
    const response = yield call(addRlFunctionalAssessmentdataApi, payload);

    if (response.success) {
      yield put({
        type: ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Function Assessment Data added Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA_FAILED,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

//get All Functional Assessment Data
async function getRlAllFunctionalAssessmentdataApi(params) {
  return await Axios.get('/get_all_function_assessment_data', { params });
}
function* handle_getRlAllFunctionalAssessment_data({ payload }) {
  try {
    const response = yield call(getRlAllFunctionalAssessmentdataApi, payload);

    if (response.success) {
      yield put({
        type: GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA_FAILED,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

//get Functional Assessment Data
async function getRlFunctionAssessmentdataApi(payload) {
  return await Axios.post('/get_function_assessment_data', payload);
}
function* handle_getRlFunctionAssessment_data({ payload }) {
  try {
    const response = yield call(getRlFunctionAssessmentdataApi, payload);

    if (response.success) {
      yield put({
        type: GET_RL_FUNCTION_ASSESSMENT_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_RL_FUNCTION_ASSESSMENT_DATA_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// Recall Function Assessment
async function recallFunctionAssessmentApi(payload) {
  return await Axios.post('/recall_function_assessment', payload);
}
function* recallFunctionAssessmentData({ payload }) {
  try {
    const response = yield call(recallFunctionAssessmentApi, payload);
    if (response.success) {
      yield put({
        type: RECALL_FUNCTION_ASSESSMENT_SUCCESS,
        payload: response.data,
      });
      yield put({
        type: GET_RL_FUNCTION_ASSESSMENT_DATA_REQUEST,
        payload: payload,
      });
      Swal.fire('Done!', 'Function Assessment Recalled Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: RECALL_FUNCTION_ASSESSMENT_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// Re-Trigger Assessment
async function reTriggerFunctionAssessmentApi(payload) {
  return await Axios.post('/retrigger_assessment', payload);
}
function* reTriggerFunctionAssessmentData({ payload }) {
  try {
    const response = yield call(reTriggerFunctionAssessmentApi, payload);
    if (response.success) {
      yield put({
        type: RE_TRIGGER_FUNCTION_ASSESSMENT_SUCCESS,
        payload: response.data,
      });
      yield put({
        type: GET_RL_FUNCTION_ASSESSMENT_DATA_REQUEST,
        payload: payload,
      });
      Swal.fire('Done!', 'Function Assessment Re-Triggered Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: RE_TRIGGER_FUNCTION_ASSESSMENT_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}
  export default all([
    takeLatest(GET_RL_FUNCTION_DATA_REQUEST, handleGet_Rl_functiona_data),
    takeLatest(GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST, handleGet_Rl_functional_page1_data),
    takeLatest(ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA, handle_addRlFunctionalAssessment_data),
    takeLatest(GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA, handle_getRlAllFunctionalAssessment_data),
    takeLatest(GET_RL_FUNCTION_ASSESSMENT_DATA_REQUEST, handle_getRlFunctionAssessment_data),
    takeLatest(RECALL_FUNCTION_ASSESSMENT_REQUEST, recallFunctionAssessmentData),
    takeLatest(RE_TRIGGER_FUNCTION_ASSESSMENT_REQUEST, reTriggerFunctionAssessmentData),
  
  ]);