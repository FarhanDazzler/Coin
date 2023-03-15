import {
    ACTION_GET_SECTION1_QUESTIONS_DATA,
   } from '../types';
   
   export function getSection1QuestionDataAction(data) {
    console.log("action", data)
     let payload = {
       data: data,
     };
     return {
       type: ACTION_GET_SECTION1_QUESTIONS_DATA,
       payload: payload,
     };
   }