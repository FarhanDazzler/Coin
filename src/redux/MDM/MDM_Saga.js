import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';

import {
  GET_ORG_STRUCTURES_REQUEST,
  GET_ORG_STRUCTURES_SUCCESS,
  GET_ORG_STRUCTURES_ERROR,
  GET_ORG_HIERARCHY_REQUEST,
  GET_ORG_HIERARCHY_SUCCESS,
  GET_ORG_HIERARCHY_ERROR,
  GET_MICS_FRAMEWORK_REQUEST,
  GET_MICS_FRAMEWORK_SUCCESS,
  GET_MICS_FRAMEWORK_ERROR,
  GET_MEGA_AND_SUBPROCESS_VIEW_REQUEST,
  GET_MEGA_AND_SUBPROCESS_VIEW_SUCCESS,
  GET_MEGA_AND_SUBPROCESS_VIEW_ERROR,
  GET_MEGA_AND_SUBPROCESS_REQUEST,
  GET_MEGA_AND_SUBPROCESS_SUCCESS,
  GET_MEGA_AND_SUBPROCESS_ERROR,
  GET_CONTROL_OWNER_AND_OVERSIGHT_REQUEST,
  GET_CONTROL_OWNER_AND_OVERSIGHT_SUCCESS,
  GET_CONTROL_OWNER_AND_OVERSIGHT_ERROR,
  GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_REQUEST,
  GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_SUCCESS,
  GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_ERROR,
  ACTION_ADD_ORG_STRUCTURE_DATA,
  ACTION_ADD_ORG_STRUCTURE_DATA_SUCCESS,
  ACTION_ADD_ORG_STRUCTURE_DATA_FAILED,
  ADD_MICS_FRAMEWORK_REQUEST,
  ADD_MICS_FRAMEWORK_SUCCESS,
  ADD_MICS_FRAMEWORK_ERROR,
  ACTION_GET_PARENT_ENTITY_DATA,
  ACTION_GET_PARENT_ENTITY_DATA_FAILED,
  ACTION_GET_PARENT_ENTITY_DATA_SUCCESS,
  ACTION_UPDATE_ORG_STRUCTURE_DATA,
  ACTION_UPDATE_ORG_STRUCTURE_DATA_FAILED,
  ACTION_UPDATE_ORG_STRUCTURE_DATA_SUCCESS
} from './MDM_Reducer';
import Swal from 'sweetalert2';

async function getOrgStructuresApi(params) {
  return await Axios.get('/get_org_structures', { params });
}
function* handleGet_org_structures({ payload }) {
  try {
    const response = yield call(getOrgStructuresApi, payload);
    if (response.success) {
      yield put({
        type: GET_ORG_STRUCTURES_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ORG_STRUCTURES_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// Add Org Structure
async function addOrgStructuresApi(payload) {
  return await Axios.post('/add_org_structure', payload);
}
function* addOrgStructureData({ payload }) {
  try {
    const response = yield call(addOrgStructuresApi, payload);
    if (response.success) {
      yield put({
        type: ACTION_ADD_ORG_STRUCTURE_DATA_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Added Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ACTION_ADD_ORG_STRUCTURE_DATA_FAILED,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}


// Update Org Structure
async function updateOrgStructuresApi(payload) {
  return await Axios.post('/update_org_structure', payload);
}
function* updateOrgStructureData({ payload }) {
  try {
    const response = yield call(updateOrgStructuresApi, payload);
    if (response.success) {
      yield put({
        type: ACTION_UPDATE_ORG_STRUCTURE_DATA_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Updated Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ACTION_UPDATE_ORG_STRUCTURE_DATA_FAILED,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}


// Get Parent Entity
async function getParentEntityApi(params) {
  return await Axios.get('/get_parent_entity', { params });
}
function* getParentEntityData({ payload }) {
  try {
    const response = yield call(getParentEntityApi, payload);
    if (response.success) {
      yield put({
        type: ACTION_GET_PARENT_ENTITY_DATA_SUCCESS,
        payload: response.data,
      });
     
    } else {
    
    }
  } catch (error) {
    yield put({
      type: ACTION_GET_PARENT_ENTITY_DATA_FAILED,
      // error: getSimplifiedError(error),
    });
  }
}

async function getOrgHierarchyApi(params) {
  console.log("getOrgHierarchyApi=>>>>>>>>>>>>>>>>>>",params)
  return await Axios.get('/get_hierarchy', { params });
}
function* handleGet_org_hierarchy({ payload }) {
  try {
    const response = yield call(getOrgHierarchyApi, payload);
    if (response.success) {
      yield put({
        type: GET_ORG_HIERARCHY_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ORG_HIERARCHY_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

async function getMicsFrameworkApi(params) {
  return await Axios.get('/get_mics_framework_details', { params });
}
function* handleGet_MicsFramework({ payload }) {
  try {
    const response = yield call(getMicsFrameworkApi, payload);
    if (response.success) {
      yield put({
        type: GET_MICS_FRAMEWORK_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_MICS_FRAMEWORK_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

async function addMicsFrameworkApi(payload) {
  return await Axios.post('/add_mics_framework_details', payload);
}
function* addMicsFrameworkData({ payload }) {
  try {
    const response = yield call(addMicsFrameworkApi, payload);
    if (response.success) {
      yield put({
        type: ADD_MICS_FRAMEWORK_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Added Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ADD_MICS_FRAMEWORK_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

async function getMegaAndSubprocessViewApi(params) {
  return await Axios.get('/get_mega_and_subprocess_view', { params });
}
function* handleGet_MegaAndSubprocessView({ payload }) {
  try {
    const response = yield call(getMegaAndSubprocessViewApi, payload);
    if (response.success) {
      yield put({
        type: GET_MEGA_AND_SUBPROCESS_VIEW_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_MEGA_AND_SUBPROCESS_VIEW_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

async function getMegaAndSubprocessApi(params) {
  return await Axios.get('/get_mega_and_subprocess', { params });
}
function* handleGet_MegaAndSubprocess({ payload }) {
  try {
    const response = yield call(getMegaAndSubprocessApi, payload);
    if (response.success) {
      yield put({
        type: GET_MEGA_AND_SUBPROCESS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_MEGA_AND_SUBPROCESS_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

async function getControlOwnerAndOversightApi(params) {
  return await Axios.get('/get_control_instances', { params });
}
function* handleGet_ControlOwnerAndOversight({ payload }) {
  try {
    const response = yield call(getControlOwnerAndOversightApi, payload);
    if (response.success) {
      yield put({
        type: GET_CONTROL_OWNER_AND_OVERSIGHT_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_CONTROL_OWNER_AND_OVERSIGHT_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

async function getApplicabilityAndAssignmentOfProviderOrganizationApi(params) {
  return await Axios.get('/get_receiver_universe', { params });
}
function* handleGet_ApplicabilityAndAssignmentOfProviderOrganization({ payload }) {
  try {
    const response = yield call(getApplicabilityAndAssignmentOfProviderOrganizationApi, payload);
    if (response.success) {
      yield put({
        type: GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

export default all([
  takeLatest(GET_ORG_STRUCTURES_REQUEST, handleGet_org_structures),
  takeLatest(ACTION_ADD_ORG_STRUCTURE_DATA, addOrgStructureData),
  takeLatest(ACTION_UPDATE_ORG_STRUCTURE_DATA, updateOrgStructureData),
  takeLatest(ACTION_GET_PARENT_ENTITY_DATA, getParentEntityData),
  takeLatest(GET_ORG_HIERARCHY_REQUEST, handleGet_org_hierarchy),
  takeLatest(GET_MICS_FRAMEWORK_REQUEST, handleGet_MicsFramework),
  takeLatest(ADD_MICS_FRAMEWORK_REQUEST, addMicsFrameworkData),
  takeLatest(GET_MEGA_AND_SUBPROCESS_VIEW_REQUEST, handleGet_MegaAndSubprocessView),
  takeLatest(GET_MEGA_AND_SUBPROCESS_REQUEST, handleGet_MegaAndSubprocess),
  takeLatest(GET_CONTROL_OWNER_AND_OVERSIGHT_REQUEST, handleGet_ControlOwnerAndOversight),
  takeLatest(
    GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_REQUEST,
    handleGet_ApplicabilityAndAssignmentOfProviderOrganization,
  ),
]);
