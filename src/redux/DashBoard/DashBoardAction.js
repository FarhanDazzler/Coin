import {
  RESET_BLOCK_DASHBOARD,
  RESET_FLAGS_DASHBOARD,
  GET_INTERNAL_CONTROL_TABLE_REQUEST,
  GET_CONTROL_OWNER_TABLE_REQUEST,
} from './DashBoardReducer';

export const getInternalControlTableData = (payload) => ({
  type: GET_INTERNAL_CONTROL_TABLE_REQUEST,
  payload,
});

export const getControlOwnerTableData = (payload) => ({
  type: GET_CONTROL_OWNER_TABLE_REQUEST,
  payload,
});

export const resetBlockAssessment = (payload) => ({
  type: RESET_BLOCK_DASHBOARD,
  payload,
});

export const resetFlagsAssessment = (payload) => ({
  type: RESET_FLAGS_DASHBOARD,
  payload,
});
