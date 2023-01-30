import { all, call, put, takeLatest } from 'redux-saga/effects';
import Cookies from 'js-cookie';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';


// async function login(payload) {
//   return await Axios.post('/login/', payload);
// }
// function* handleLogin({ payload }) {
//   try {
//     const response = yield call(login, payload);
//     if (response.token) {
//       const options = { path: '/' };
//       Cookies.set('token', response.token, options);
//       yield put({
//         type: LOGIN_SUCCESS,
//       });
//     }
//   } catch (error) {
//     yield put({
//       type: LOGIN_ERROR,
//       error: getSimplifiedError(error),
//     });
//   }
// }

export default all([
  // takeLatest(SIGNUP_REQUEST, handleSignup),
]);
