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
  SUBMIT_KPI_DATA_KPI_MODULE_REQUEST,
  SUBMIT_KPI_DATA_KPI_MODULE_ERROR,
  SUBMIT_KPI_DATA_KPI_MODULE_SUCCESS,
} from './KPI_Reducer';
import { toast } from 'react-toastify';

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

// GET KPI Module KPI Data for IC
async function submit_KPI_data_KPI_ModuleAPI(params) {
  return await Axios.post('/submit_KPI_data_KPI_Module', params);
}
function* handle_Submit_KPI_data_KPI_Module({ payload: copyPayload }) {
  const { events, ...payload } = { ...copyPayload };
  try {
    const response = yield call(submit_KPI_data_KPI_ModuleAPI, payload);
    if (response.success) {
      if (events.onSuccess) {
        events.onSuccess();
      }
      yield put({
        type: SUBMIT_KPI_DATA_KPI_MODULE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: SUBMIT_KPI_DATA_KPI_MODULE_ERROR,
    });
    if (events.onError) {
      events.onError();
    }
    console.log('errorerror', error.message, error.data);
    toast.error(`Something went wrong, ${error.message}`);
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
    console.log('Error handle_Get_ControlOwner_KPIOwner_ControlOversight_KPI_dataApi: ', error);
    toast.error('Something went wrong, Please try again after sometime.');
  }
}

export default all([
  takeLatest(GET_IC_KPI_DATA_REQUEST, handle_Get_ic_KPI_dataApi),
  takeLatest(SUBMIT_KPI_DATA_KPI_MODULE_REQUEST, handle_Submit_KPI_data_KPI_Module),
  takeLatest(
    GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_REQUEST,
    handle_Get_ControlOwner_KPIOwner_ControlOversight_KPI_dataApi,
  ),
]);
