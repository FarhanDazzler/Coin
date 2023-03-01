import {
   ACTION_GET_CONTROL_DATA,
   ACTION_GET_CONTROL_DATA_GCD
  } from '../types';
  
  export function getControlDataAction(data) {
    let payload = {
      data: data,
    };
    return {
      type: ACTION_GET_CONTROL_DATA,
      payload: payload,
    };
  }
  export function getControlDataGcdAction(data) {
    let payload = {
      data: data,
    };
    return {
      type: ACTION_GET_CONTROL_DATA_GCD,
      payload: payload,
    };
  }