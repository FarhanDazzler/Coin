import {
  GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
} from './RL_HomePageReducer';

export const getFunctionRecipientHomePageData = (payload) => ({
  type: GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_REQUEST,
  payload,
});
export const getFunctionGlobalPersonaHomePageData = (payload) => ({
  type: GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  payload,
});
