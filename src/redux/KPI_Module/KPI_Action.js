import {
  GET_IC_KPI_DATA_REQUEST,
  CLEAR_IC_KPI_DATA,
  GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_REQUEST,
  CLEAR_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA,
  SUBMIT_KPI_DATA_KPI_MODULE_REQUEST,
  RESET_SUBMIT_KPI_DATA_SUCCESS,
} from './KPI_Reducer';

export const get_ic_KPI_data = (payload) => ({
  type: GET_IC_KPI_DATA_REQUEST,
  payload,
});

export const clear_ic_KPI_data = (payload) => ({
  type: CLEAR_IC_KPI_DATA,
  payload,
});

export const get_ControlOwner_KPIOwner_ControlOversight_KPI_data = (payload) => ({
  type: GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_REQUEST,
  payload,
});

export const submit_KPI_data_KPI_Module = (payload) => ({
  type: SUBMIT_KPI_DATA_KPI_MODULE_REQUEST,
  payload,
});

export const clear_ControlOwner_KPIOwner_ControlOversight_KPI_data = (payload) => ({
  type: CLEAR_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA,
  payload,
});

export const reset_submit_kpi_data_success = (payload) => ({
  type: RESET_SUBMIT_KPI_DATA_SUCCESS,
  payload
});
