import {
    ACTION_GET_CSV_TAMPRED_DATA,
   } from '../types';
   
   export function getCsvTampredDataAction(data) {
    console.log("action", data)
     let payload = {
       data: data,
     };
     return {
       type: ACTION_GET_CSV_TAMPRED_DATA,
       payload: payload,
     };
   }