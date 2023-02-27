import {
   ACTION_GET_CONTROL_DATA
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