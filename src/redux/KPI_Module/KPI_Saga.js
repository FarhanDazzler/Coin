import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import { push } from 'connected-react-router';
import Swal from 'sweetalert2';

import {
  GET_IC_KPI_DATA_REQUEST,
  GET_IC_KPI_DATA_SUCCESS,
  GET_IC_KPI_DATA_ERROR,
  GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_REQUEST,
  GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_SUCCESS,
  GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_ERROR,
} from './KPI_Reducer';

// GET KPI Module KPI Data for IC
async function get_ic_KPI_dataApi(params) {
  return await Axios.post('/get_ic_KPI_data', params);
}
function* handle_Get_ic_KPI_dataApi({ payload }) {
  try {
    const response = yield call(get_ic_KPI_dataApi, payload);
    if (response.success) {
      yield put({
        type: GET_IC_KPI_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_IC_KPI_DATA_ERROR,
    });
  }
}

// GET KPI Module KPI Data for Control Owner, KPI Owner, Control Oversight
async function get_ControlOwner_KPIOwner_ControlOversight_KPI_dataApi(params) {
  return await Axios.post('/get_ControlOwner_KPIOwner_ControlOversight_KPI_data', params);
}
function* handle_Get_ControlOwner_KPIOwner_ControlOversight_KPI_dataApi({ payload }) {
  try {
    const response = yield call(get_ControlOwner_KPIOwner_ControlOversight_KPI_dataApi, payload);
    if (response.success) {
      yield put({
        type: GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_ERROR,
    });
  }
}

export default all([
  takeLatest(GET_IC_KPI_DATA_REQUEST, handle_Get_ic_KPI_dataApi),
  takeLatest(
    GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_REQUEST,
    handle_Get_ControlOwner_KPIOwner_ControlOversight_KPI_dataApi,
  ),
]);
