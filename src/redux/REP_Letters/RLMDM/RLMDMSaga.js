import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../../api/axios';
import { getSimplifiedError } from '../../../utils/error';
import {
  GET_RL_ORG_HIERARCHY_REQUEST,
  GET_RL_ORG_HIERARCHY_ERROR,
  GET_RL_ORG_HIERARCHY_SUCCESS,
  GET_RL_ORG_MD_ERROR,
  GET_RL_ORG_MD_REQUEST,
  GET_RL_ORG_MD_SUCCESS,
  GET_RL_BU_MASTERDATA_ERROR,
  GET_RL_BU_MASTERDATA_REQUEST,
  GET_RL_BU_MASTERDATA_SUCCESS,
  GET_RL_FUNCTIONAL_MASTERDATA_ERROR,
  GET_RL_FUNCTIONAL_MASTERDATA_REQUEST,
  GET_RL_FUNCTIONAL_MASTERDATA_SUCCESS,
  ASSIGN_RL_BU_MASTERDATA_REQUEST,
  ASSIGN_RL_BU_MASTERDATA_SUCCESS,
  ASSIGN_RL_BU_MASTERDATA_ERROR,
  ASSIGN_RL_FUNCTIONAL_MASTERDATA_REQUEST,
  ASSIGN_RL_FUNCTIONAL_MASTERDATA_SUCCESS,
  ASSIGN_RL_FUNCTIONAL_MASTERDATA_ERROR,
} from './RLMDMReducer';
import Swal from 'sweetalert2';

async function getRlOrgHierarchyApi(params) {
  //console.log('getRlOrgHierarchyApi=>>>>>>>>>>>>>>>>>>', params);
  return await Axios.get('/get_organizational_hierachy_rep', { params });
}
function* handleGet_Rl_org_hierarchy({ payload }) {
  try {
    const response = yield call(getRlOrgHierarchyApi, payload);
    if (response.success) {
      yield put({
        type: GET_RL_ORG_HIERARCHY_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_RL_ORG_HIERARCHY_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

async function getRlOrgMdApi(params) {
  //console.log('getRlOrgMdApi=>>>>>>>>>>>>>>>>>>', params);
  return await Axios.get('/get_organizational_md', { params });
}
function* handleGet_Rl_org_md({ payload }) {
  try {
    const response = yield call(getRlOrgMdApi, payload);
    if (response.success) {
      yield put({
        type: GET_RL_ORG_MD_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_RL_ORG_MD_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

async function getRlBuMasterdataApi(params) {
  //console.log('getRlBuMasterdataApi=>>>>>>>>>>>>>>>>>>', params);
  return await Axios.get('/get_bu_master_data', { params });
}
function* handleGet_Rl_Bu_masterdata({ payload }) {
  try {
    const response = yield call(getRlBuMasterdataApi, payload);
    if (response.success) {
      yield put({
        type: GET_RL_BU_MASTERDATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_RL_BU_MASTERDATA_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

//Assign BU Master data
async function assignRlBuMasterdataApi(payload) {
  return await Axios.post('/update_bu_master_data', payload);
}
function* assignRlBuMaster_Data({ payload }) {
  try {
    const response = yield call(assignRlBuMasterdataApi, payload);

    if (response.success) {
      yield put({
        type: ASSIGN_RL_BU_MASTERDATA_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Assigned Successfully!', 'success');
      yield call(getRlBuMasterdataApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ASSIGN_RL_BU_MASTERDATA_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

async function getRlFunctionalMasterdataApi(params) {
  //console.log('getRlFunctionalMasterdataApi=>>>>>>>>>>>>>>>>>>', params);
  return await Axios.get('/get_functional_master_data', { params });
}
function* handleGet_Rl_Functional_masterdata({ payload }) {
  try {
    const response = yield call(getRlFunctionalMasterdataApi, payload);
    if (response.success) {
      yield put({
        type: GET_RL_FUNCTIONAL_MASTERDATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_RL_FUNCTIONAL_MASTERDATA_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

//Assign Functional Master data
async function assignRlFunctionalMasterdataApi(payload) {
  return await Axios.post('/update_functional_master_data', payload);
}
function* assignRlFunctionalMasterdata_Data({ payload }) {
  try {
    const response = yield call(assignRlFunctionalMasterdataApi, payload);

    if (response.success) {
      yield put({
        type: ASSIGN_RL_FUNCTIONAL_MASTERDATA_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Assigned Successfully!', 'success');
      yield call(getRlFunctionalMasterdataApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ASSIGN_RL_FUNCTIONAL_MASTERDATA_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

export default all([
  takeLatest(GET_RL_ORG_HIERARCHY_REQUEST, handleGet_Rl_org_hierarchy),
  takeLatest(GET_RL_ORG_MD_REQUEST, handleGet_Rl_org_md),
  takeLatest(GET_RL_BU_MASTERDATA_REQUEST, handleGet_Rl_Bu_masterdata),
  takeLatest(ASSIGN_RL_BU_MASTERDATA_REQUEST, assignRlBuMaster_Data),
  takeLatest(GET_RL_FUNCTIONAL_MASTERDATA_REQUEST, handleGet_Rl_Functional_masterdata),
  takeLatest(ASSIGN_RL_FUNCTIONAL_MASTERDATA_REQUEST, assignRlFunctionalMasterdata_Data),
]);
