import {
  GET_IC_KPI_DATA_REQUEST,
  CLEAR_IC_KPI_DATA,
  GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_REQUEST,
  CLEAR_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA,
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

export const clear_ControlOwner_KPIOwner_ControlOversight_KPI_data = (payload) => ({
  type: CLEAR_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA,
  payload,
});
