import { put, takeEvery } from 'redux-saga/effects';
import {
  ACTION_GET_CSV_TAMPRED_DATA,
  ACTION_GET_CSV_TAMPRED_DATA_SUCCESS,
  ACTION_GET_CSV_TAMPRED_DATA_FAILED,
} from '../types';
import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import Swal from 'sweetalert2';

function getCsvTampredApiCall(payload) {
  return Axios.post('/is_csv_tampered', payload);
}

function* getCsvTampredData({ payload }) {
  try {
    const response = yield getCsvTampredApiCall(payload?.data);
    // if (response.data) {
    //   Swal.fire('Oops...', 'Please dont change the existing values from excel file!!', 'error');
    // }
    if (response?.success === true) {
      yield put({
        type: ACTION_GET_CSV_TAMPRED_DATA_SUCCESS,
        data: response,
      });
    } else {
      yield put({
        type: ACTION_GET_CSV_TAMPRED_DATA_FAILED,
        message: 'Somthing went wrong',
      });
    }
  } catch (e) {
    yield put({ type: ACTION_GET_CSV_TAMPRED_DATA_FAILED, error: getSimplifiedError(e) });
  }
}

function* csvTampredData() {
  yield takeEvery(ACTION_GET_CSV_TAMPRED_DATA, getCsvTampredData);
}

export default csvTampredData;
