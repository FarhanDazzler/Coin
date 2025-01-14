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
  ACTION_UPDATE_ORG_STRUCTURE_DATA_SUCCESS,
  ADD_MEGA_AND_SUBPROCESS_REQUEST,
  ADD_MEGA_AND_SUBPROCESS_SUCCESS,
  ADD_MEGA_AND_SUBPROCESS_ERROR,
  GET_MEGA_PROCESS_PREFIX_REQUEST,
  GET_MEGA_PROCESS_PREFIX_SUCCESS,
  GET_MEGA_PROCESS_PREFIX_ERROR,
  GET_SUBPROCESS_PARENT_REQUEST,
  GET_SUBPROCESS_PARENT_SUCCESS,
  GET_SUBPROCESS_PARENT_ERROR,
  GET_SUBPROCESS_PREFIX_REQUEST,
  GET_SUBPROCESS_PREFIX_SUCCESS,
  GET_SUBPROCESS_PREFIX_ERROR,
  MODIFY_CONTROL_OWNER_AND_OVERSIGHT_REQUEST,
  MODIFY_CONTROL_OWNER_AND_OVERSIGHT_SUCCESS,
  MODIFY_CONTROL_OWNER_AND_OVERSIGHT_ERROR,
  UPDATE_MICS_FRAMEWORK_REQUEST,
  UPDATE_MICS_FRAMEWORK_SUCCESS,
  UPDATE_MICS_FRAMEWORK_ERROR,
  GET_MEGA_PROCESS_MICS_FRAMEWORK_REQUEST,
  GET_MEGA_PROCESS_MICS_FRAMEWORK_SUCCESS,
  GET_MEGA_PROCESS_MICS_FRAMEWORK_ERROR,
  GET_SUB_PROCESS_MICS_FRAMEWORK_REQUEST,
  GET_SUB_PROCESS_MICS_FRAMEWORK_SUCCESS,
  GET_SUB_PROCESS_MICS_FRAMEWORK_ERROR,
  UPDATE_MEGA_AND_SUBPROCESS_REQUEST,
  UPDATE_MEGA_AND_SUBPROCESS_SUCCESS,
  UPDATE_MEGA_AND_SUBPROCESS_ERROR,
  ASSIGN_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_REQUEST,
  ASSIGN_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_SUCCESS,
  ASSIGN_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_ERROR,
  GET_ALL_PROVIDER_ENTITIES_REQUEST,
  GET_ALL_PROVIDER_ENTITIES_SUCCESS,
  GET_ALL_PROVIDER_ENTITIES_ERROR,
  ACTION_GET_CONTROL_INSTANCE_HISTORY_DATA,
  ACTION_GET_CONTROL_INSTANCE_HISTORY_DATA_FAILED,
  ACTION_GET_CONTROL_INSTANCE_HISTORY_DATA_SUCCESS,
  GET_SITES_AND_PLANTS_MASTER_REQUEST,
  GET_SITES_AND_PLANTS_MASTER_SUCCESS,
  GET_SITES_AND_PLANTS_MASTER_ERROR,
} from './MDM_Reducer';
import Swal from 'sweetalert2';
import { ACTION_ADD_ERROR_NOTIFICATION_DATA } from '../ErrorNotification/ErrorNotificationReducer';
import { getApplicabilityAndAssignmentOfProviderOrganization } from './MDM_Action';

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
      // Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      yield put({
        type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
        payload: {
          data: { text: 'Duplicate Organization Found', type: 'danger' },
        },
      });
      yield put({
        type: ACTION_ADD_ORG_STRUCTURE_DATA_FAILED,
        // error: getSimplifiedError(error),
      });
    } else {
      yield put({
        type: ACTION_ADD_ORG_STRUCTURE_DATA_FAILED,
        // error: getSimplifiedError(error),
      });
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
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
      // Swal.fire('Oops...', 'Something Went Wrong', 'error');
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
        type: ADD_MICS_FRAMEWORK_ERROR,
        // error: getSimplifiedError(error),
      });
    } else {
      yield put({
        type: ADD_MICS_FRAMEWORK_ERROR,
        // error: getSimplifiedError(error),
      });
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  }
}

async function updateMicsFrameworkApi(payload) {
  return await Axios.post('/update_mics_framework_details', payload);
}
function* updateMicsFrameworkData({ payload }) {
  try {
    const response = yield call(updateMicsFrameworkApi, payload);
    if (response.success) {
      yield put({
        type: UPDATE_MICS_FRAMEWORK_SUCCESS,
        payload: response.data,
      });
      yield put({ type: GET_MICS_FRAMEWORK_REQUEST, payload: '' });
      Swal.fire('Done!', 'Updated Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: UPDATE_MICS_FRAMEWORK_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

async function getMegaProcessMicsFrameworkApi(params) {
  return await Axios.get('/get_mega_process_abv', { params });
}
function* handleGet_MegaProcessMicsFramework({ payload }) {
  try {
    const response = yield call(getMegaProcessMicsFrameworkApi, payload);
    if (response.success) {
      yield put({
        type: GET_MEGA_PROCESS_MICS_FRAMEWORK_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_MEGA_PROCESS_MICS_FRAMEWORK_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

async function getSubProcessMicsFrameworkApi(params) {
  return await Axios.get('/get_sub_process_abv', { params });
}
function* handleGet_SubProcessMicsFramework({ payload }) {
  try {
    const response = yield call(getSubProcessMicsFrameworkApi, payload);
    if (response.success) {
      yield put({
        type: GET_SUB_PROCESS_MICS_FRAMEWORK_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_SUB_PROCESS_MICS_FRAMEWORK_ERROR,
      // error: getSimplifiedError(error),
    });
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

async function addMegaAndSubprocessApi(payload) {
  return await Axios.post('/add_mega_sub_process', payload);
}
function* addMegaAndSubprocessData({ payload }) {
  try {
    const response = yield call(addMegaAndSubprocessApi, payload);
    if (response.success) {
      yield put({
        type: ADD_MEGA_AND_SUBPROCESS_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Added Successfully!', 'success');
    } else {
      // Swal.fire('Oops...', 'Something Went Wrong', 'error');
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
        type: ADD_MEGA_AND_SUBPROCESS_ERROR,
        // error: getSimplifiedError(error),
      });
    } else {
      yield put({
        type: ADD_MEGA_AND_SUBPROCESS_ERROR,
        // error: getSimplifiedError(error),
      });
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  }
}

// GET Mega Process prefix
async function getMegaProcessPrefixApi(params) {
  return await Axios.get('/get_mega_process_row', { params });
}
function* getMegaProcessPrefixData({ payload }) {
  try {
    const response = yield call(getMegaProcessPrefixApi, payload);
    if (response.success) {
      yield put({
        type: GET_MEGA_PROCESS_PREFIX_SUCCESS,
        payload: response.data,
      });
    } else {
    }
  } catch (error) {
    yield put({
      type: GET_MEGA_PROCESS_PREFIX_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// GET SubProcess Parent
async function getSubprocessParentApi(params) {
  return await Axios.get('/get_mega_process_parent', { params });
}
function* getSubprocessParentData({ payload }) {
  try {
    const response = yield call(getSubprocessParentApi, payload);
    if (response.success) {
      yield put({
        type: GET_SUBPROCESS_PARENT_SUCCESS,
        payload: response.data,
      });
    } else {
    }
  } catch (error) {
    yield put({
      type: GET_SUBPROCESS_PARENT_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// GET SubProcess prefix
async function getSubprocessPrefixApi(params) {
  return await Axios.get('get_mega_process_prefix', { params });
}
function* getSubprocessPrefixData({ payload }) {
  try {
    const response = yield call(getSubprocessPrefixApi, payload);
    if (response.success) {
      yield put({
        type: GET_SUBPROCESS_PREFIX_SUCCESS,
        payload: response.data,
      });
    } else {
    }
  } catch (error) {
    yield put({
      type: GET_SUBPROCESS_PREFIX_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

async function updateMegaAndSubprocessApi(payload) {
  return await Axios.post('/edit_mega_sub_process', payload);
}
function* updateMegaAndSubprocessData({ payload }) {
  try {
    const response = yield call(updateMegaAndSubprocessApi, payload);
    if (response.success) {
      yield put({
        type: UPDATE_MEGA_AND_SUBPROCESS_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Updated Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: UPDATE_MEGA_AND_SUBPROCESS_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
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

async function getControlInstanceHistoryApi(payload) {
  return await Axios.post('/get_control_instances_history', payload);
}
function* handleGet_ControlInstanceHistory({ payload }) {
  try {
    const response = yield call(getControlInstanceHistoryApi, payload);
    if (response.success) {
      yield put({
        type: ACTION_GET_CONTROL_INSTANCE_HISTORY_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
    // yield put({
    //   type: ACTION_GET_CONTROL_INSTANCE_HISTORY_DATA_FAILED,
    //   // error: getSimplifiedError(error),
    // });
  }
}

// Modify ControlOwner And Oversight
async function modifyControlOwnerAndOversightApi(payload) {
  return await Axios.post('/update_cowner_coversight', payload);
}
function* modifyControlOwnerAndOversightData({ payload }) {
  try {
    const response = yield call(modifyControlOwnerAndOversightApi, payload);
    if (response.success) {
      yield put({
        type: MODIFY_CONTROL_OWNER_AND_OVERSIGHT_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Modify Successfully!', 'success');
    } else {
      // Swal.fire('Oops...', 'Something Went Wrong', 'error');
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
        type: MODIFY_CONTROL_OWNER_AND_OVERSIGHT_ERROR,
        // error: getSimplifiedError(error),
      });
    } else {
      yield put({
        type: MODIFY_CONTROL_OWNER_AND_OVERSIGHT_ERROR,
        // error: getSimplifiedError(error),
      });
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
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

// Assign Applicability And Assignment Of Provider Organization
async function assignApplicabilityAndAssignmentOfProviderOrganizationApi(payload) {
  return await Axios.post('/update_receiver_universe', payload);
}
function* assignApplicabilityAndAssignmentOfProviderOrganizationData({ payload }) {
  try {
    const response = yield call(assignApplicabilityAndAssignmentOfProviderOrganizationApi, payload);
    if (response.success) {
      yield put({
        type: ASSIGN_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Updated Successfully!', 'success');
      //yield put(getApplicabilityAndAssignmentOfProviderOrganization());
    } else {
      // Swal.fire('Oops...', 'Something Went Wrong', 'error');
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
        type: ASSIGN_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_ERROR,
        // error: getSimplifiedError(error),
      });
    } else {
      yield put({
        type: ASSIGN_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_ERROR,
        // error: getSimplifiedError(error),
      });
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  }
}

// Get All Provider Entities
async function getAllProviderEntitiesApi(params) {
  return await Axios.get('/get_all_provider_entity', { params });
}
function* handleGet_AllProviderEntities({ payload }) {
  try {
    const response = yield call(getAllProviderEntitiesApi, payload);
    if (response.success) {
      yield put({
        type: GET_ALL_PROVIDER_ENTITIES_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ALL_PROVIDER_ENTITIES_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

async function getSitesAndPlantApi(params) {
  return await Axios.get('/get_sites_and_plants_master_data', { params });
}
function* handleGetSitesAndPlantData({ payload }) {
  try {
    const response = yield call(getSitesAndPlantApi, payload);
    if (response.success) {
      yield put({
        type: GET_SITES_AND_PLANTS_MASTER_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_SITES_AND_PLANTS_MASTER_ERROR,
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
  takeLatest(GET_MEGA_PROCESS_MICS_FRAMEWORK_REQUEST, handleGet_MegaProcessMicsFramework),
  takeLatest(GET_SUB_PROCESS_MICS_FRAMEWORK_REQUEST, handleGet_SubProcessMicsFramework),
  takeLatest(UPDATE_MICS_FRAMEWORK_REQUEST, updateMicsFrameworkData),
  takeLatest(GET_MEGA_AND_SUBPROCESS_VIEW_REQUEST, handleGet_MegaAndSubprocessView),
  takeLatest(GET_MEGA_AND_SUBPROCESS_REQUEST, handleGet_MegaAndSubprocess),
  takeLatest(ADD_MEGA_AND_SUBPROCESS_REQUEST, addMegaAndSubprocessData),
  takeLatest(GET_MEGA_PROCESS_PREFIX_REQUEST, getMegaProcessPrefixData),
  takeLatest(GET_SUBPROCESS_PARENT_REQUEST, getSubprocessParentData),
  takeLatest(GET_SUBPROCESS_PREFIX_REQUEST, getSubprocessPrefixData),
  takeLatest(UPDATE_MEGA_AND_SUBPROCESS_REQUEST, updateMegaAndSubprocessData),
  takeLatest(GET_CONTROL_OWNER_AND_OVERSIGHT_REQUEST, handleGet_ControlOwnerAndOversight),
  takeLatest(GET_SITES_AND_PLANTS_MASTER_REQUEST, handleGetSitesAndPlantData),
  takeLatest(ACTION_GET_CONTROL_INSTANCE_HISTORY_DATA, handleGet_ControlInstanceHistory),
  takeLatest(MODIFY_CONTROL_OWNER_AND_OVERSIGHT_REQUEST, modifyControlOwnerAndOversightData),
  takeLatest(
    GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_REQUEST,
    handleGet_ApplicabilityAndAssignmentOfProviderOrganization,
  ),
  takeLatest(
    ASSIGN_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_REQUEST,
    assignApplicabilityAndAssignmentOfProviderOrganizationData,
  ),
  takeLatest(GET_ALL_PROVIDER_ENTITIES_REQUEST, handleGet_AllProviderEntities),
]);
