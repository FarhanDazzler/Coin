// ============ ERROR NOTIFICATION DATA ===================//
export const ACTION_ADD_ERROR_NOTIFICATION_DATA = 'GET_ADD_ERROR_NOTIFICATION_DATA';
export const ACTION_REMOVE_ERROR_NOTIFICATION_DATA = 'GET_REMOVE_ERROR_NOTIFICATION_DATA';
// ============ ERROR NOTIFICATION DATA ENDS ===================//

const block = {
  text: '',
  type: '',
};

const initialState = {
  errorNotification: { ...block, data: [] },
};

export const ErrorNotificationReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case ACTION_ADD_ERROR_NOTIFICATION_DATA:
      return {
        ...state,
        errorNotification: { ...state.errorNotification, data: payload },
      };
    case ACTION_REMOVE_ERROR_NOTIFICATION_DATA:
      return {
        ...state,
        errorNotification: { ...state.errorNotification, data: payload },
      };
    default:
      return state;
  }
};
