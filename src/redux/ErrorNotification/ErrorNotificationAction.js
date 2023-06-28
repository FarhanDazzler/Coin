import {
  ACTION_ADD_ERROR_NOTIFICATION_DATA,
  ACTION_REMOVE_ERROR_NOTIFICATION_DATA,
} from './ErrorNotificationReducer';

export const addErrorNotificationAction = (payload) => ({
    type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
    payload,
  });

  export const removeErrorNotificationAction = (payload) => ({
    type: ACTION_REMOVE_ERROR_NOTIFICATION_DATA,
    payload,
  });