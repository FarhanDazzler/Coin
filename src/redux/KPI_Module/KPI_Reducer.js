// Redux || Reducer setup of KPI Module

// ============== Get KPI Data for IC =============================//
export const GET_IC_KPI_DATA_REQUEST = 'GET_IC_KPI_DATA_REQUEST';
export const GET_IC_KPI_DATA_SUCCESS = 'GET_IC_KPI_DATA_SUCCESS';
export const GET_IC_KPI_DATA_ERROR = 'GET_IC_KPI_DATA_ERROR';
export const CLEAR_IC_KPI_DATA = 'CLEAR_IC_KPI_DATA';

// ========= Get KPI Data for Control Owner and KPI Owner and Control Oversight ========//
export const GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_REQUEST =
  'GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_REQUEST';
export const GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_SUCCESS =
  'GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_SUCCESS';
export const GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_ERROR =
  'GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_ERROR';
export const CLEAR_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA =
  'CLEAR_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA';

export const SUBMIT_KPI_DATA_KPI_MODULE_REQUEST = 'SUBMIT_KPI_DATA_KPI_MODULE_REQUEST';
export const SUBMIT_KPI_DATA_KPI_MODULE_SUCCESS = 'SUBMIT_KPI_DATA_KPI_MODULE_SUCCESS';
export const SUBMIT_KPI_DATA_KPI_MODULE_ERROR = 'SUBMIT_KPI_DATA_KPI_MODULE_ERROR';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  get_ic_KPI_data: { ...block, data: [] },
  get_ControlOwner_KPIOwner_ControlOversight_KPI_data: { ...block, data: [] },
  submit_KPI_data_KPI_Module: { ...block, data: [] },
};

export const KPI_ModuleReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    // GET IC KPI Data
    case GET_IC_KPI_DATA_REQUEST:
      return {
        ...state,
        get_ic_KPI_data: {
          ...state.get_ic_KPI_data,
          loading: true,
        },
      };
    case GET_IC_KPI_DATA_SUCCESS:
      return {
        ...state,
        get_ic_KPI_data: {
          ...state.get_ic_KPI_data,
          data: payload,
          loading: false,
        },
      };
    case GET_IC_KPI_DATA_ERROR:
      return {
        ...state,
        get_ic_KPI_data: {
          ...state.get_ic_KPI_data,
          loading: false,
        },
      };
    case CLEAR_IC_KPI_DATA:
      return {
        ...state,
        get_ic_KPI_data: {
          ...state.get_ic_KPI_data,
          data: [],
          loading: false,
        },
      };

    // GET Control Owner, KPI Owner and Control Oversight KPI Data
    case GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_REQUEST:
      return {
        ...state,
        get_ControlOwner_KPIOwner_ControlOversight_KPI_data: {
          ...state.get_ControlOwner_KPIOwner_ControlOversight_KPI_data,
          loading: true,
        },
      };
    case GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_SUCCESS:
      return {
        ...state,
        get_ControlOwner_KPIOwner_ControlOversight_KPI_data: {
          ...state.get_ControlOwner_KPIOwner_ControlOversight_KPI_data,
          data: payload,
          loading: false,
        },
      };
    case GET_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA_ERROR:
      return {
        ...state,
        get_ControlOwner_KPIOwner_ControlOversight_KPI_data: {
          ...state.get_ControlOwner_KPIOwner_ControlOversight_KPI_data,
          loading: false,
        },
      };
    case CLEAR_CONTROL_OWNER_KPI_OWNER_CONTROL_OVERSIGHT_KPI_DATA:
      return {
        ...state,
        get_ControlOwner_KPIOwner_ControlOversight_KPI_data: {
          ...state.get_ControlOwner_KPIOwner_ControlOversight_KPI_data,
          data: [],
          loading: false,
        },
      };

    case SUBMIT_KPI_DATA_KPI_MODULE_REQUEST:
      return {
        ...state,
        submit_KPI_data_KPI_Module: {
          ...state.submit_KPI_data_KPI_Module,
          loading: true,
        },
      };
    case SUBMIT_KPI_DATA_KPI_MODULE_SUCCESS:
      return {
        ...state,
        submit_KPI_data_KPI_Module: {
          ...state.submit_KPI_data_KPI_Module,
          data: payload,
          loading: false,
          success: true,
        },
      };
    case SUBMIT_KPI_DATA_KPI_MODULE_ERROR:
      return {
        ...state,
        submit_KPI_data_KPI_Module: {
          ...state.submit_KPI_data_KPI_Module,
          loading: false,
          success: false,
        },
      };

    default:
      return state;
  }
};
