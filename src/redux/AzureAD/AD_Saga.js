import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';

import {
  GET_USER_FROM_AD_REQUEST,
  GET_USER_FROM_AD_SUCCESS,
  GET_USER_FROM_AD_ERROR,
  RESET_BLOCK_ASSESSMENT,
  RESET_FLAGS_ASSESSMENT,
} from './AD_Reducer';

async function getUserFromADApi(params) {
  return await Axios.get('/get_users_from_ad', { params });
}
function* handleGet_UserFromAD({ payload }) {
  try {
    const response = yield call(getUserFromADApi, payload);
    if (response.success) {
      yield put({
        type: GET_USER_FROM_AD_SUCCESS,
        payload: response.data,
      });
      yield put({
        type: RESET_FLAGS_ASSESSMENT,
        payload: { blockType: 'userFromAD' },
      });
    }
  } catch (error) {
    yield put({
      type: GET_USER_FROM_AD_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

export default all([takeLatest(GET_USER_FROM_AD_REQUEST, handleGet_UserFromAD)]);
