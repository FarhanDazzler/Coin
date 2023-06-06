import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';

import {
  GET__ALL_ROLES_REQUEST,
  GET__ALL_ROLES_SUCCESS,
  GET__ALL_ROLES_ERROR,
} from './AdminPageReducer';
import Swal from 'sweetalert2';

//GET All Self Assessmnet module ROLE Data

async function getAll_RolesApi(params) {
  return await Axios.get('/get_adminstrational_persona', { params });
}
function* handle_Get_All_Roles({ payload }) {
  try {
    const response = yield call(getAll_RolesApi, payload);
    if (response.success) {
      yield put({
        type: GET__ALL_ROLES_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET__ALL_ROLES_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

export default all([takeLatest(GET__ALL_ROLES_REQUEST, handle_Get_All_Roles)]);
