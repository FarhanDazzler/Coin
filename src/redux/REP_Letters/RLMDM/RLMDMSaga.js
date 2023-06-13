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
  ACTION_GET_RL_PARENT_ENTITY_DATA,
  ACTION_GET_RL_PARENT_ENTITY_DATA_FAILED,
  ACTION_GET_RL_PARENT_ENTITY_DATA_SUCCESS,
  ACTION_ADD_ORGANIZATIONAL_MD_DATA,
  ACTION_ADD_ORGANIZATIONAL_MD_DATA_FAILED,
  ACTION_ADD_ORGANIZATIONAL_MD_DATA_SUCCESS,
  ACTION_UPDATE_ORGANIZATIONAL_MD_DATA,
  ACTION_UPDATE_ORGANIZATIONAL_MD_DATA_FAILED,
  ACTION_UPDATE_ORGANIZATIONAL_MD_DATA_SUCCESS,
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

// Get Parent Entity
async function getRlParentEntityApi(params) {
  return await Axios.get('/get_parent_entity_rep', { params });
}
function* getRlParentEntityData({ payload }) {
  try {
    const response = yield call(getRlParentEntityApi, payload);
    if (response.success) {
      yield put({
        type: ACTION_GET_RL_PARENT_ENTITY_DATA_SUCCESS,
        payload: response.data,
      });
    } else {
    }
  } catch (error) {
    yield put({
      type: ACTION_GET_RL_PARENT_ENTITY_DATA_FAILED,
      // error: getSimplifiedError(error),
    });
  }
}

// Add Organizational MD
async function addOrganizationalMDApi(payload) {
  console.log('addOrganizationalMDApi', addOrganizationalMDApi);
  return await Axios.post('/add_organizational_md', payload);
}
function* addOrganizationalMDApiData({ payload }) {
  try {
    const response = yield call(addOrganizationalMDApi, payload);
    if (response.success) {
      yield put({
        type: ACTION_ADD_ORGANIZATIONAL_MD_DATA_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', response?.data[0], 'success');
      yield call(getRlOrgHierarchyApi);
      yield call(getRlOrgMdApi);
    } else {
      Swal.fire('Oops!', 'Somthing Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ACTION_ADD_ORGANIZATIONAL_MD_DATA_FAILED,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops!', 'Somthing Went Wrong', 'error');
  }
}

// Update Organizational MD
async function updateOrganizationalMDApi(payload) {
  return await Axios.post('/update_organizational_md', payload);
}
function* updateOrganizationalMDApiData({ payload }) {
  try {
    const response = yield call(updateOrganizationalMDApi, payload);
    if (response.success) {
      yield put({
        type: ACTION_UPDATE_ORGANIZATIONAL_MD_DATA_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', response?.data[0], 'success');
      yield call(getRlOrgHierarchyApi);
      yield call(getRlOrgMdApi);
    } else {
      Swal.fire('Oops!', 'Somthing Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ACTION_UPDATE_ORGANIZATIONAL_MD_DATA_FAILED,
      // error: getSimplifiedError(error),
    });
    console.log(error.response);
    if (error?.response?.data?.data?.message) {
      Swal.fire('Oops!', error?.response?.data?.data?.message, 'error');
    } else {
      Swal.fire('Oops!', 'Somthing Went Wrong', 'error');
    }
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
  takeLatest(ACTION_GET_RL_PARENT_ENTITY_DATA, getRlParentEntityData),
  takeLatest(ACTION_ADD_ORGANIZATIONAL_MD_DATA, addOrganizationalMDApiData),
  takeLatest(ACTION_UPDATE_ORGANIZATIONAL_MD_DATA, updateOrganizationalMDApiData),
  takeLatest(ASSIGN_RL_FUNCTIONAL_MASTERDATA_REQUEST, assignRlFunctionalMasterdata_Data),
]);
