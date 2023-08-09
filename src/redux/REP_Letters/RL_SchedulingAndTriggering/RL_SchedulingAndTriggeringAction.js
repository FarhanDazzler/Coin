import { GET_RL_FUNCTION_DATA_REQUEST, GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST } from "./RL_SchedulingAndTriggeringReducer";

export const getRlFunctionData = (payload) => ({ type: GET_RL_FUNCTION_DATA_REQUEST, payload });
export const getRlFunctionalPage1Data = (payload) => ({ type: GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST, payload });