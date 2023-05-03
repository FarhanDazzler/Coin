import { all, call, put, takeLatest } from 'redux-saga/effects';
import Cookies from 'js-cookie';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import {
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_ERROR,
  GET_DASHBOARD_REQUEST,
} from './DashBoardReducer';
import Swal from 'sweetalert2';

async function getDashboardApi(payload) {
  return await Axios.get('/get_control_owner_oversight_data', { params: payload });
}
function* handleGetDashboard({ payload: copyPayload }) {
  try {
    const { events = {}, ...payload } = copyPayload;
    const response = yield call(getDashboardApi, payload);
    if (response.success) {
      yield put({
        type: GET_DASHBOARD_SUCCESS,
        payload: { data: response.data, Control_ID: payload.Control_ID },
      });
      if (events?.onSeccess) {
        events.onSeccess();
      }
    }
  } catch (error) {
    yield put({
      type: GET_DASHBOARD_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

export default all([takeLatest(GET_DASHBOARD_REQUEST, handleGetDashboard)]);
