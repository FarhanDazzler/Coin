import { put, takeEvery } from 'redux-saga/effects';
import {
  ACTION_GET_SECTION1_QUESTIONS_DATA,
    ACTION_GET_SECTION1_QUESTIONS_DATA_SUCCESS,
    ACTION_GET_SECTION1_QUESTIONS_DATA_FAILED,
    ACTION_GET_SECTION1_OPTIONS_DATA,
    ACTION_GET_SECTION1_OPTIONS_DATA_SUCCESS,
    ACTION_GET_SECTION1_OPTIONS_DATA_FAILED,
    ACTION_ADD_SECTION1_OPTIONS_DATA,
    ACTION_ADD_SECTION1_OPTIONS_DATA_FAILED,
    ACTION_ADD_SECTION1_OPTIONS_DATA_SUCCESS,
    ACTION_ADD_SECTION1_QUESTIONS_DATA,
    ACTION_ADD_SECTION1_QUESTIONS_DATA_FAILED,
    ACTION_ADD_SECTION1_QUESTIONS_DATA_SUCCESS,
} from '../types';
import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import Swal from 'sweetalert2';

function getSection1QuestionDataApiCall(data) {
  console.log("saga", data.payload.data);
  let params = data.payload.data
  return Axios.get('/get_Section1_Question?Control_ID=' + params.controlId);
}

function* getSection1QuestionData(payload) {
  try {
    const response = yield getSection1QuestionDataApiCall(payload);
    console.log("response", response);
    if (response?.success === true) {
      yield put({
        type: ACTION_GET_SECTION1_QUESTIONS_DATA_SUCCESS,
        data: response?.data,
      });
    } else {
      yield put({
        type: ACTION_GET_SECTION1_QUESTIONS_DATA_FAILED,
        message: "Somthing went wrong",
      });
    }
  } catch (e) {
    yield put({ type: ACTION_GET_SECTION1_QUESTIONS_DATA_FAILED, error: getSimplifiedError(e) });
  }
}

// get option Api call

function getSection1OptionDataApiCall(data) {
  console.log("saga", data.payload.data);
  let params = data.payload.data
  return Axios.get('/get_Section1_Question?Control_ID=' + params.controlId);
}

function* getSection1OptionData(payload) {
  try {
    const response = yield getSection1OptionDataApiCall(payload);
    console.log("response", response);
    if (response?.success === true) {
      yield put({
        type: ACTION_GET_SECTION1_OPTIONS_DATA_SUCCESS,
        data: response?.data,
      });
    } else {
      yield put({
        type: ACTION_GET_SECTION1_OPTIONS_DATA_FAILED,
        message: "Somthing went wrong",
      });
    }
  } catch (e) {
    yield put({ type: ACTION_GET_SECTION1_OPTIONS_DATA_FAILED, error: getSimplifiedError(e) });
  }
}

// section1 Add Api call

function addSection1QuestionDataApiCall(payload) {
  console.log("saga", payload);

  return Axios.post('/add_Section1_Question', payload?.payload?.data);
}

function* addSection1QuestionData(payload) {
  try {
    const response = yield addSection1QuestionDataApiCall(payload);
    console.log("response", response);
    if (response?.success === true) {
      yield put({
        type: ACTION_ADD_SECTION1_QUESTIONS_DATA_SUCCESS,
        data: response?.data,
      });
      Swal.fire('Done!', 'Question Addedd Successfully!', 'success');
    } else {
      yield put({
        type: ACTION_ADD_SECTION1_QUESTIONS_DATA_FAILED,
        message: "Somthing went wrong",
      });
    }
  } catch (e) {
    yield put({ type: ACTION_ADD_SECTION1_QUESTIONS_DATA_FAILED, error: getSimplifiedError(e) });
  }
}

// Add option Api call

function addSection1OptionDataApiCall(payload) {
  console.log("saga", payload);
  return Axios.get('/add_Section1_Options', payload);
}

function* addSection1OptionData(payload) {
  try {
    const response = yield addSection1OptionDataApiCall(payload);
    console.log("response", response);
    if (response?.success === true) {
      yield put({
        type: ACTION_ADD_SECTION1_OPTIONS_DATA_SUCCESS,
        data: response?.data,
      });
    } else {
      yield put({
        type: ACTION_ADD_SECTION1_OPTIONS_DATA_FAILED,
        message: "Somthing went wrong",
      });
    }
  } catch (e) {
    yield put({ type: ACTION_ADD_SECTION1_OPTIONS_DATA_FAILED, error: getSimplifiedError(e) });
  }
}

function* questionBankData() {
  yield takeEvery(ACTION_GET_SECTION1_QUESTIONS_DATA, getSection1QuestionData);
  yield takeEvery(ACTION_GET_SECTION1_OPTIONS_DATA, getSection1OptionData);
  yield takeEvery(ACTION_ADD_SECTION1_QUESTIONS_DATA, addSection1QuestionData);
  yield takeEvery(ACTION_ADD_SECTION1_OPTIONS_DATA, addSection1OptionData);
}

export default questionBankData;
