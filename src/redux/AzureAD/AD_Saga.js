import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';

import {
  GET_USER_FROM_AD_REQUEST,
  GET_USER_FROM_AD_SUCCESS,
  GET_USER_FROM_AD_ERROR,
  ID_EMAIL_VALID_AD_REQUEST,
  ID_EMAIL_VALID_AD_SUCCESS,
  ID_EMAIL_VALID_AD_ERROR,
  RESET_FLAGS_ASSESSMENT,
} from './AD_Reducer';

// Azure get user from AD data
async function getUserFromADApi(payload) {
  const { isValidEmail, ...params } = payload;
  if (isValidEmail) {
    return await Axios.get('/is_valid_email_ad', { params: { email: params.username } });
  }
  return await Axios.get('/get_users_from_ad', { params });
}

function* handleGet_UserFromAD({ payload }) {
  try {
    const response = yield call(getUserFromADApi, payload);
    if (response) {
      yield put({
        type: GET_USER_FROM_AD_SUCCESS,
        payload: { users: response.users, emailCheck: response.isValid },
      });
      yield put({
        type: RESET_FLAGS_ASSESSMENT,
        payload: { blockType: 'userFromAD' },
      });
    }
  } catch (error) {
    yield put({
      type: GET_USER_FROM_AD_ERROR,
    });
  }
}

// Azure IS user email valid from AD

async function isEmailValidADApi(params) {
  return await Axios.get('/is_valid_email_ad', { params });
}
function* handle_isEmailValidAD({ payload }) {
  try {
    const response = yield call(isEmailValidADApi, payload);
    if (response.isValid) {
      yield put({
        type: ID_EMAIL_VALID_AD_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: ID_EMAIL_VALID_AD_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

export default all([
  takeLatest(GET_USER_FROM_AD_REQUEST, handleGet_UserFromAD),
  takeLatest(ID_EMAIL_VALID_AD_REQUEST, handle_isEmailValidAD),
]);
