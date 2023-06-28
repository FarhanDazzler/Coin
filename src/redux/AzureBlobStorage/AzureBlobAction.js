import { GET_INSTRUCTIONS_REQUEST, MODIFY_INSTRUCTIONS_REQUEST } from './AzureBlobReducer';

export const getInstructions = (payload) => ({ type: GET_INSTRUCTIONS_REQUEST, payload });
export const modifyInstructions = (payload) => ({ type: MODIFY_INSTRUCTIONS_REQUEST, payload });
