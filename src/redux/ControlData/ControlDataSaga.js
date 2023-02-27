import { put, takeEvery } from 'redux-saga/effects';
import {
  ACTION_GET_CONTROL_DATA,
  ACTION_GET_CONTROL_DATA_SUCCESS,
  ACTION_GET_CONTROL_DATA_FAILED,
} from '../types';
import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';

function getControlDataApiCall(data) {
    console.log("saga", data.payload.data);
    let params = data.payload.data
  return Axios.get('/get_control_scope?ControlID=' + params.controlId + '&coOwner=' + "40107970@ab-inbev.com");
}

function* getControlData(payload) {
  try {
    const response = yield getControlDataApiCall(payload);
    console.log("response", response);
    if (response?.success === true) {
      yield put({
        type: ACTION_GET_CONTROL_DATA_SUCCESS,
        data: response?.data,
      });
    } else {
      yield put({
        type: ACTION_GET_CONTROL_DATA_FAILED,
        message: "Somthing went wrong",
      });
    }
  } catch (e) {
    yield put({ type: ACTION_GET_CONTROL_DATA_FAILED, error: getSimplifiedError(e) });
  }
}

function* controlData() {
  yield takeEvery(ACTION_GET_CONTROL_DATA, getControlData);
}

export default controlData;
