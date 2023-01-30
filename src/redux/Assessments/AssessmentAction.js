import {
    RESET_BLOCK_ASSESSMENT,
    RESET_FLAGS_ASSESSMENT,
    SAVE_ANS
  } from './AssessmentReducer';
  
  export const saveAssessmentAns = (payload) => ({ type: SAVE_ANS, payload });
  
  export const resetBlockAssessment = (payload) => ({
    type: RESET_BLOCK_ASSESSMENT,
    payload,
  });
  
  export const resetFlagsAssessment = (payload) => ({
    type: RESET_FLAGS_ASSESSMENT,
    payload,
  });
  
 