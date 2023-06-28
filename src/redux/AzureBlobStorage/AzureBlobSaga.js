import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import {
  GET_INSTRUCTIONS_REQUEST,
  GET_INSTRUCTIONS_SUCCESS,
  GET_INSTRUCTIONS_ERROR,
  MODIFY_INSTRUCTIONS_REQUEST,
  MODIFY_INSTRUCTIONS_SUCCESS,
  MODIFY_INSTRUCTIONS_ERROR,
} from './AzureBlobReducer';
import Swal from 'sweetalert2';

// GET Rep Letter INSTRUCTIONS DATA
async function getInstructionsApi(params) {
  return await Axios.get('/', { params });
}
function* handle_getInstructions({ payload }) {
  try {
    const response = yield call(getInstructionsApi, payload);
    if (response.success) {
      yield put({
        type: GET_INSTRUCTIONS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_INSTRUCTIONS_ERROR,
    });
  }
}

// MODIFY Rep Letter INSTRUCTIONS Data
async function modifyInstructionsApi(payload) {
  return await Axios.post('/', payload);
}
function* modifyInstructions_Data({ payload }) {
  try {
    const response = yield call(modifyInstructionsApi, payload);

    if (response.success) {
      yield put({
        type: MODIFY_INSTRUCTIONS_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Instruction Modified Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: MODIFY_INSTRUCTIONS_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

export default all([
  takeLatest(GET_INSTRUCTIONS_REQUEST, handle_getInstructions),
  takeLatest(MODIFY_INSTRUCTIONS_REQUEST, modifyInstructions_Data),
]);
