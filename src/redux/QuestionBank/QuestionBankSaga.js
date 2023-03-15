import { put, takeEvery } from 'redux-saga/effects';
import {
  ACTION_GET_SECTION1_QUESTIONS_DATA,
  ACTION_GET_SECTION1_QUESTIONS_DATA_SUCCESS,
  ACTION_GET_SECTION1_QUESTIONS_DATA_FAILED,
} from '../types';
import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';

function getQuestionBankDataApiCall(data) {
  console.log("saga", data.payload.data);
  let params = data.payload.data
  return Axios.get('/get_Section1_Question?Control_ID=' + params.controlId);
}

function* getQuestionBankData(payload) {
  try {
    const response = yield getQuestionBankDataApiCall(payload);
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

function* questionBankData() {
  yield takeEvery(ACTION_GET_SECTION1_QUESTIONS_DATA, getQuestionBankData);
}

export default questionBankData;
