import { all, call, put, takeLatest } from 'redux-saga/effects';
import Cookies from 'js-cookie';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import {
  GET_INTERNAL_CONTROL_TABLE_SUCCESS,
  GET_INTERNAL_CONTROL_TABLE_ERROR,
  GET_INTERNAL_CONTROL_TABLE_REQUEST,
  GET_CONTROL_OWNER_TABLE_REQUEST,
  GET_CONTROL_OWNER_TABLE_SUCCESS,
  GET_CONTROL_OWNER_TABLE_ERROR,
} from './DashBoardReducer';
import Swal from 'sweetalert2';

async function getInternalControlDashboardApi(payload) {
  return await Axios.get('/get_ic_control_owner_oversight_data', { params: payload });
}
function* handleGetInternalControlData({ payload: copyPayload }) {
  try {
    const { events = {}, ...payload } = copyPayload;
    const response = yield call(getInternalControlDashboardApi, payload);
    if (response.success) {
      yield put({
        type: GET_INTERNAL_CONTROL_TABLE_SUCCESS,
        payload: { data: response.data, Control_ID: payload.Control_ID },
      });
      if (events?.onSuccess) {
        events.onSuccess();
      }
    }
  } catch (error) {
    yield put({
      type: GET_INTERNAL_CONTROL_TABLE_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function getControlOwnerDataApi(payload) {
  return await Axios.get('/get_control_owner_oversight_data', { params: payload });
}
function* handleGetControlOwnerData({ payload: copyPayload }) {
  try {
    const { events = {}, ...payload } = copyPayload;
    const response = yield call(getControlOwnerDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_CONTROL_OWNER_TABLE_SUCCESS,
        payload: { data: response.data, Control_ID: payload.Control_ID },
      });
      if (events?.onSuccess) {
        events.onSuccess();
      }
    }
  } catch (error) {
    yield put({
      type: GET_CONTROL_OWNER_TABLE_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

export default all([
  takeLatest(GET_INTERNAL_CONTROL_TABLE_REQUEST, handleGetInternalControlData),
  takeLatest(GET_CONTROL_OWNER_TABLE_REQUEST, handleGetControlOwnerData),
]);
