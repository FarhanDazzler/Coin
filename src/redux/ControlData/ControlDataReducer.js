import {
  ACTION_GET_CONTROL_DATA,
  ACTION_GET_CONTROL_DATA_SUCCESS,
  ACTION_GET_CONTROL_DATA_FAILED,
  ACTION_GET_CONTROL_DATA_GCD,
  ACTION_GET_CONTROL_DATA_GCD_FAILED,
  ACTION_GET_CONTROL_DATA_GCD_SUCCESS,
} from '../types';

const initialState = {
  controlData: {
    data: {},
    loading: false,
    error: null,
    success: null,
  },
  gcd: {
    data: {},
    loading: false,
    error: null,
    success: null,
  },
};

function getInitialState() {
  return initialState;
}

export default function controlDataReducer(state = getInitialState(), action) {
  switch (action.type) {
    case ACTION_GET_CONTROL_DATA:
      return {
        ...state,
        controlData: {
          data: {},
          loading: true,
          error: '',
          success: '',
        },
      };
    case ACTION_GET_CONTROL_DATA_SUCCESS:
      return {
        ...state,
        controlData: {
          data: action.data,
          loading: false,
          error: '',
          success: 'Control Data fetched successfully',
        },
      };
    case ACTION_GET_CONTROL_DATA_FAILED:
      return {
        ...state,
        controlData: {
          data: {},
          loading: false,
          error: 'Failed',
          success: '',
        },
      };
    case ACTION_GET_CONTROL_DATA_GCD:
      return {
        ...state,
        gcd: {
          data: {},
          loading: true,
          error: '',
          success: '',
        },
      };
    case ACTION_GET_CONTROL_DATA_GCD_SUCCESS:
      return {
        ...state,
        gcd: {
          data: action.data,
          loading: false,
          error: '',
          success: 'Control Data GCD fetched successfully',
        },
      };
    case ACTION_GET_CONTROL_DATA_GCD_FAILED:
      return {
        ...state,
        gcd: {
          data: {},
          loading: false,
          error: 'Failed',
          success: '',
        },
      };
    default:
      return state;
  }
}
