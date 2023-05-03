import {
  RESET_BLOCK_DASHBOARD,
  RESET_FLAGS_DASHBOARD,
  GET_DASHBOARD_REQUEST} from './DashBoardReducer';

export const getDashBoardData = (payload) => ({ type: GET_DASHBOARD_REQUEST, payload });



export const resetBlockAssessment = (payload) => ({
  type: RESET_BLOCK_DASHBOARD,
  payload,
});

export const resetFlagsAssessment = (payload) => ({
  type: RESET_FLAGS_DASHBOARD,
  payload,
});