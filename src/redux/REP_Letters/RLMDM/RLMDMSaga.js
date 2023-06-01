import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import {
    GET_RL_ORG_HIERARCHY_REQUEST,
    GET_RL_ORG_HIERARCHY_ERROR,
    GET_RL_ORG_HIERARCHY_SUCCESS
} from "./RLMDMReducer";
import Swal from 'sweetalert2';

async function getRlOrgHierarchyApi(params) {
    console.log('getRlOrgHierarchyApi=>>>>>>>>>>>>>>>>>>', params);
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

export default all([
    takeLatest(GET_RL_ORG_HIERARCHY_REQUEST, handleGet_Rl_org_hierarchy)
])