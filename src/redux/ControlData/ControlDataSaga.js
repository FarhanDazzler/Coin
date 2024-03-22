import { put, takeEvery } from 'redux-saga/effects';
import {
  ACTION_GET_CONTROL_DATA,
  ACTION_GET_CONTROL_DATA_SUCCESS,
  ACTION_GET_CONTROL_DATA_FAILED,
  ACTION_GET_CONTROL_DATA_GCD,
  ACTION_GET_CONTROL_DATA_GCD_FAILED,
  ACTION_GET_CONTROL_DATA_GCD_SUCCESS,
} from '../types';
import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';

function getControlDataApiCall(data) {
  let params = data?.payload?.data || {};

  const encodedControlId = encodeURIComponent(params.controlId);
  const encodedCoOwner = encodeURIComponent(params.coOwner);
  const encodedProvider = encodeURIComponent(params.provider);

  return Axios.get(
    '/get_control_scope?ControlID=' +
      encodedControlId +
      '&coOwner=' +
      encodedCoOwner +
      '&provider=' +
      encodedProvider,
  );
}

function* getControlData(payload) {
  try {
    const response = yield getControlDataApiCall(payload);
    if (response?.success === true) {
      yield put({
        type: ACTION_GET_CONTROL_DATA_SUCCESS,
        data: { ...response?.data, ...payload.payload.data.ownerData },
      });
    } else {
      yield put({
        type: ACTION_GET_CONTROL_DATA_FAILED,
        message: 'Somthing went wrong',
      });
    }
  } catch (e) {
    yield put({ type: ACTION_GET_CONTROL_DATA_FAILED, error: getSimplifiedError(e) });
  }
}

function getControlDataGcdApiCall(data) {
  let params = data.payload.data;
  let encodedControlId = encodeURIComponent(params.controlId);
  return Axios.get('/get_gcd?ControlID=' + encodedControlId);
}

function* getControlDataGcd(payload) {
  try {
    const response = yield getControlDataGcdApiCall(payload);
    if (response?.success === true) {
      yield put({
        type: ACTION_GET_CONTROL_DATA_GCD_SUCCESS,
        data: response?.data,
      });
    } else {
      yield put({
        type: ACTION_GET_CONTROL_DATA_GCD_FAILED,
        message: 'Somthing went wrong',
      });
    }
  } catch (e) {
    yield put({ type: ACTION_GET_CONTROL_DATA_GCD_FAILED, error: getSimplifiedError(e) });
  }
}

function* controlData() {
  yield takeEvery(ACTION_GET_CONTROL_DATA, getControlData);
  yield takeEvery(ACTION_GET_CONTROL_DATA_GCD, getControlDataGcd);
}

export default controlData;
