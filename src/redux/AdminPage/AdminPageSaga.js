import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';

import {
  GET__ALL_ROLES_REQUEST,
  GET__ALL_ROLES_SUCCESS,
  GET__ALL_ROLES_ERROR,
  ADD_ADMIN_ROLE_REQUEST,
  ADD_ADMIN_ROLE_SUCCESS,
  ADD_ADMIN_ROLE_ERROR,
  MODIFY_ADMIN_ROLE_REQUEST,
  MODIFY_ADMIN_ROLE_SUCCESS,
  MODIFY_ADMIN_ROLE_ERROR,
  DELETE_ADMIN_ROLE_REQUEST,
  DELETE_ADMIN_ROLE_SUCCESS,
  DELETE_ADMIN_ROLE_ERROR,
  GET_BU_ZONE_ROLES_REQUEST,
  GET_BU_ZONE_ROLES_SUCCESS,
  GET_BU_ZONE_ROLES_ERROR,
  ADD_BU_ZONE_ADMIN_ROLE_REQUEST,
  ADD_BU_ZONE_ADMIN_ROLE_SUCCESS,
  ADD_BU_ZONE_ADMIN_ROLE_ERROR,
  MODIFY_BU_ZONE_ADMIN_ROLE_REQUEST,
  MODIFY_BU_ZONE_ADMIN_ROLE_SUCCESS,
  MODIFY_BU_ZONE_ADMIN_ROLE_ERROR,
  DELETE_BU_ZONE_ADMIN_ROLE_REQUEST,
  DELETE_BU_ZONE_ADMIN_ROLE_SUCCESS,
  DELETE_BU_ZONE_ADMIN_ROLE_ERROR,
  GET_FUNCTION_ZONE_ROLES_REQUEST,
  GET_FUNCTION_ZONE_ROLES_SUCCESS,
  GET_FUNCTION_ZONE_ROLES_ERROR,
  ADD_FUNCTION_ZONE_ADMIN_ROLE_REQUEST,
  ADD_FUNCTION_ZONE_ADMIN_ROLE_SUCCESS,
  ADD_FUNCTION_ZONE_ADMIN_ROLE_ERROR,
  MODIFY_FUNCTION_ZONE_ADMIN_ROLE_REQUEST,
  MODIFY_FUNCTION_ZONE_ADMIN_ROLE_SUCCESS,
  MODIFY_FUNCTION_ZONE_ADMIN_ROLE_ERROR,
  DELETE_FUNCTION_ZONE_ADMIN_ROLE_REQUEST,
  DELETE_FUNCTION_ZONE_ADMIN_ROLE_SUCCESS,
  DELETE_FUNCTION_ZONE_ADMIN_ROLE_ERROR,
} from './AdminPageReducer';
import { ACTION_ADD_ERROR_NOTIFICATION_DATA } from '../ErrorNotification/ErrorNotificationReducer';
import Swal from 'sweetalert2';

//GET All module Admin ROLE Data

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

//ADD Admin ROLE Data
async function addAdminRoleApi(payload) {
  return await Axios.post('/add_adminstrational_persona', payload);
}
function* addAdminRoleData({ payload }) {
  try {
    const response = yield call(addAdminRoleApi, payload);

    if (response.success) {
      yield put({
        type: ADD_ADMIN_ROLE_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Added Successfully!', 'success');
      yield call(getAll_RolesApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      yield put({
        type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
        payload: {
          data: { text: error?.response?.data?.data, type: 'danger' },
        },
      });
      yield put({
        type: ADD_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
    } else {
      yield put({
        type: ADD_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
      Swal.fire('Oops...', 'Something Went Wrong11', 'error');
    }
  }
}

//Modify Admin ROLE Data
async function modifyAdminRoleApi(payload) {
  return await Axios.post('/update_adminstrational_persona', payload);
}
function* modifyAdminRoleData({ payload }) {
  try {
    const response = yield call(modifyAdminRoleApi, payload);
    if (response.success) {
      yield put({
        type: MODIFY_ADMIN_ROLE_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Updated Successfully!', 'success');
      yield call(getAll_RolesApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      yield put({
        type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
        payload: {
          data: { text: error?.response?.data?.data, type: 'danger' },
        },
      });
      yield put({
        type: MODIFY_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
    } else {
      yield put({
        type: MODIFY_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  }
}

//Delete Admin ROLE Data
async function deleteAdminRoleApi(payload) {
  return await Axios.post('/delete_adminstrational_persona', payload);
}
function* deleteAdminRoleData({ payload }) {
  try {
    const response = yield call(deleteAdminRoleApi, payload);
    if (response.success) {
      yield put({
        type: DELETE_ADMIN_ROLE_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Deleted Successfully!', 'success');
      yield call(getAll_RolesApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      yield put({
        type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
        payload: {
          data: { text: error?.response?.data?.data, type: 'danger' },
        },
      });
      yield put({
        type: DELETE_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
    } else {
      yield put({
        type: DELETE_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  }
}

//GET BU Zone Admin ROLE Data
async function get_BU_Zone_RolesApi(params) {
  return await Axios.get('/get_bu_zic_data', { params });
}
function* get_BU_Zone_Roles({ payload }) {
  try {
    const response = yield call(get_BU_Zone_RolesApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_ZONE_ROLES_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_ZONE_ROLES_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

//ADD BU Zone Admin ROLE Data
async function add_BU_Zone_AdminRoleApi(payload) {
  return await Axios.post('/add_bu_zic_data', payload);
}
function* add_BU_Zone_AdminRoleData({ payload }) {
  try {
    const response = yield call(add_BU_Zone_AdminRoleApi, payload);
    if (response.success) {
      yield put({
        type: ADD_BU_ZONE_ADMIN_ROLE_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Added Successfully!', 'success');
      yield call(get_BU_Zone_RolesApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      yield put({
        type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
        payload: {
          data: { text: error?.response?.data?.data, type: 'danger' },
        },
      });
      yield put({
        type: ADD_BU_ZONE_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
    } else {
      yield put({
        type: ADD_BU_ZONE_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  }
}

//Modify BU Zone Admin ROLE Data
async function modify_BU_Zone_AdminRoleApi(payload) {
  return await Axios.post('/update_bu_zic_data', payload);
}
function* modify_BU_Zone_AdminRoleData({ payload }) {
  try {
    const response = yield call(modify_BU_Zone_AdminRoleApi, payload);
    if (response.success) {
      yield put({
        type: MODIFY_BU_ZONE_ADMIN_ROLE_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Updated Successfully!', 'success');
      yield call(get_BU_Zone_RolesApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      yield put({
        type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
        payload: {
          data: { text: error?.response?.data?.data, type: 'danger' },
        },
      });
      yield put({
        type: MODIFY_BU_ZONE_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
    } else {
      yield put({
        type: MODIFY_BU_ZONE_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  }
}

//Delete BU Zone Admin ROLE Data
async function delete_BU_Zone_AdminRoleApi(payload) {
  return await Axios.post('/delete_bu_zic_data', payload);
}
function* delete_BU_Zone_AdminRoleData({ payload }) {
  try {
    const response = yield call(delete_BU_Zone_AdminRoleApi, payload);
    if (response.success) {
      yield put({
        type: DELETE_BU_ZONE_ADMIN_ROLE_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Deleted Successfully!', 'success');
      yield call(get_BU_Zone_RolesApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      yield put({
        type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
        payload: {
          data: { text: error?.response?.data?.data, type: 'danger' },
        },
      });
      yield put({
        type: DELETE_BU_ZONE_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
    } else {
      yield put({
        type: DELETE_BU_ZONE_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  }
}

//GET Function Zone Admin ROLE Data
async function get_Function_Zone_RolesApi(params) {
  return await Axios.get('/get_functional_zic_data', { params });
}
function* get_Function_Zone_Roles({ payload }) {
  try {
    const response = yield call(get_Function_Zone_RolesApi, payload);
    if (response.success) {
      yield put({
        type: GET_FUNCTION_ZONE_ROLES_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_FUNCTION_ZONE_ROLES_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

//ADD Function Zone Admin ROLE Data
async function add_Function_Zone_AdminRoleApi(payload) {
  return await Axios.post('/add_functional_zic_data', payload);
}
function* add_Function_Zone_AdminRoleData({ payload }) {
  try {
    const response = yield call(add_Function_Zone_AdminRoleApi, payload);
    if (response.success) {
      yield put({
        type: ADD_FUNCTION_ZONE_ADMIN_ROLE_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Added Successfully!', 'success');
      yield call(get_Function_Zone_RolesApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      yield put({
        type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
        payload: {
          data: { text: error?.response?.data?.data, type: 'danger' },
        },
      });
      yield put({
        type: ADD_FUNCTION_ZONE_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
    } else {
      yield put({
        type: ADD_FUNCTION_ZONE_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  }
}

//Modify Function Zone Admin ROLE Data
async function modify_Function_Zone_AdminRoleApi(payload) {
  return await Axios.post('/update_functional_zic_data', payload);
}
function* modify_Function_Zone_AdminRoleData({ payload }) {
  try {
    const response = yield call(modify_Function_Zone_AdminRoleApi, payload);
    if (response.success) {
      yield put({
        type: MODIFY_FUNCTION_ZONE_ADMIN_ROLE_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Updated Successfully!', 'success');
      yield call(get_Function_Zone_RolesApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      yield put({
        type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
        payload: {
          data: { text: error?.response?.data?.data, type: 'danger' },
        },
      });
      yield put({
        type: MODIFY_FUNCTION_ZONE_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
    } else {
      yield put({
        type: MODIFY_FUNCTION_ZONE_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  }
}

//Delete Function Zone Admin ROLE Data
async function delete_Function_Zone_AdminRoleApi(payload) {
  return await Axios.post('/delete_functional_zic_data', payload);
}
function* delete_Function_Zone_AdminRoleData({ payload }) {
  try {
    const response = yield call(delete_Function_Zone_AdminRoleApi, payload);
    if (response.success) {
      yield put({
        type: DELETE_FUNCTION_ZONE_ADMIN_ROLE_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Deleted Successfully!', 'success');
      yield call(get_Function_Zone_RolesApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      yield put({
        type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
        payload: {
          data: { text: error?.response?.data?.data, type: 'danger' },
        },
      });
      yield put({
        type: DELETE_FUNCTION_ZONE_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
    } else {
      yield put({
        type: DELETE_FUNCTION_ZONE_ADMIN_ROLE_ERROR,
        // error: getSimplifiedError(error),
      });
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  }
}

export default all([
  takeLatest(GET__ALL_ROLES_REQUEST, handle_Get_All_Roles),
  takeLatest(ADD_ADMIN_ROLE_REQUEST, addAdminRoleData),
  takeLatest(MODIFY_ADMIN_ROLE_REQUEST, modifyAdminRoleData),
  takeLatest(DELETE_ADMIN_ROLE_REQUEST, deleteAdminRoleData),
  takeLatest(GET_BU_ZONE_ROLES_REQUEST, get_BU_Zone_Roles),
  takeLatest(ADD_BU_ZONE_ADMIN_ROLE_REQUEST, add_BU_Zone_AdminRoleData),
  takeLatest(MODIFY_BU_ZONE_ADMIN_ROLE_REQUEST, modify_BU_Zone_AdminRoleData),
  takeLatest(DELETE_BU_ZONE_ADMIN_ROLE_REQUEST, delete_BU_Zone_AdminRoleData),
  takeLatest(GET_FUNCTION_ZONE_ROLES_REQUEST, get_Function_Zone_Roles),
  takeLatest(ADD_FUNCTION_ZONE_ADMIN_ROLE_REQUEST, add_Function_Zone_AdminRoleData),
  takeLatest(MODIFY_FUNCTION_ZONE_ADMIN_ROLE_REQUEST, modify_Function_Zone_AdminRoleData),
  takeLatest(DELETE_FUNCTION_ZONE_ADMIN_ROLE_REQUEST, delete_Function_Zone_AdminRoleData),
]);
