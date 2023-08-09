import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../../api/axios';
import { getSimplifiedError } from '../../../utils/error';
import {
  GET_RL_FUNCTION_DATA_REQUEST,
  GET_RL_FUNCTION_DATA_ERROR,
  GET_RL_FUNCTION_DATA_SUCCESS,
  GET_RL_FUNCTIONAL_PAGE1_DATA_ERROR,
  GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST,
  GET_RL_FUNCTIONAL_PAGE1_DATA_SUCCESS
} from './RL_SchedulingAndTriggeringReducer';

import Swal from 'sweetalert2';

async function getRlFunctionDataApi(params) {
    return await Axios.get('/get_rep_functions', { params });
  }
  function* handleGet_Rl_functiona_data({ payload }) {
    try {
      const response = yield call(getRlFunctionDataApi, payload);
      if (response.success) {
        yield put({
          type: GET_RL_FUNCTION_DATA_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      yield put({
        type: GET_RL_FUNCTION_DATA_ERROR,
        // error: getSimplifiedError(error),
      });
    }
  }

  async function getRlFunctionalPage1DataApi(params) {
    return await Axios.get('/get_functional_page1_data', { params });
  }
  function* handleGet_Rl_functional_page1_data({ payload }) {
    try {
      const response = yield call(getRlFunctionalPage1DataApi, payload);
      if (response.success) {
        yield put({
          type: GET_RL_FUNCTIONAL_PAGE1_DATA_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      yield put({
        type: GET_RL_FUNCTIONAL_PAGE1_DATA_ERROR,
        // error: getSimplifiedError(error),
      });
    }
  }

  export default all([
    takeLatest(GET_RL_FUNCTION_DATA_REQUEST, handleGet_Rl_functiona_data),
    takeLatest(GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST, handleGet_Rl_functional_page1_data),
  
  ]);