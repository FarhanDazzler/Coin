import { all, call, put, takeLatest } from 'redux-saga/effects';
import Cookies from 'js-cookie';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from './AuthReducer';
import { toast } from 'react-toastify';

async function signup(payload) {
  return await Axios.post('/signup/', payload);
}
function* handleSignup({ payload }) {
  try {
    const response = yield call(signup, payload);
    if (response) {
      yield put({
        type: SIGNUP_SUCCESS,
      });
      toast('Signup Successful ', {
        type: 'success',
        position: 'top-right',
        toastId: 'Select_platform',
      });
    }
  } catch (error) {
    yield put({
      type: SIGNUP_ERROR,
      error: getSimplifiedError(error),
    });
    toast(getSimplifiedError(error), {
      type: 'error',
      position: 'top-right',
      toastId: 'Select_platform',
    });
  }
}

async function login(payload) {
  return await Axios.post('/login/', payload);
}
function* handleLogin({ payload }) {
  try {
    const response = yield call(login, payload);
    if (response.token) {
      const options = { path: '/' };
      Cookies.set('token', response.token, options);
      yield put({
        type: LOGIN_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: LOGIN_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

export default all([
  takeLatest(SIGNUP_REQUEST, handleSignup),
  takeLatest(LOGIN_REQUEST, handleLogin),
]);
