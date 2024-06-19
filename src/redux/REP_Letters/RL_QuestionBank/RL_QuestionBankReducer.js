// =================== GET BU QUESTIONS ========================//
export const GET_BU_QUESTIONS_REQUEST = 'GET_BU_QUESTIONS_REQUEST';
export const GET_BU_QUESTIONS_ERROR = 'GET_BU_QUESTIONS_ERROR';
export const GET_BU_QUESTIONS_SUCCESS = 'GET_BU_QUESTIONS_SUCCESS';
// =================== GET BU QUESTIONS ========================//

// =================== ADD BU QUESTIONS ========================//
export const ADD_BU_QUESTIONS_REQUEST = 'ADD_BU_QUESTIONS_REQUEST';
export const ADD_BU_QUESTIONS_ERROR = 'ADD_BU_QUESTIONS_ERROR';
export const ADD_BU_QUESTIONS_SUCCESS = 'ADD_BU_QUESTIONS_SUCCESS';

// =================== ADD BU QUESTIONS ========================//

// =================== EDIT BU QUESTIONS ========================//
export const EDIT_BU_QUESTIONS_REQUEST = 'EDIT_BU_QUESTIONS_REQUEST';
export const EDIT_BU_QUESTIONS_ERROR = 'EDIT_BU_QUESTIONS_ERROR';
export const EDIT_BU_QUESTIONS_SUCCESS = 'EDIT_BU_QUESTIONS_SUCCESS';
// =================== EDIT BU QUESTIONS ========================//

// =================== DELETE BU QUESTIONS ========================//

export const DELETE_BU_QUESTIONS_REQUEST = 'DELETE_BU_QUESTIONS_REQUEST';
export const DELETE_BU_QUESTIONS_ERROR = 'DELETE_BU_QUESTIONS_ERROR';
export const DELETE_BU_QUESTIONS_SUCCESS = 'DELETE_BU_QUESTIONS_SUCCESS';

// =================== DELETE BU QUESTIONS ========================//

// =================== GET BU QUESTIONS ========================//
export const GET_BU_QUESTIONS_WITH_COMMENT_REQUEST = 'GET_BU_QUESTIONS_WITH_COMMENT_REQUEST';
export const GET_BU_QUESTIONS_WITH_COMMENT_SUCCESS = 'GET_BU_QUESTIONS_WITH_COMMENT_SUCCESS';
export const GET_BU_QUESTIONS_WITH_COMMENT_ERROR = 'GET_BU_QUESTIONS_WITH_COMMENT_ERROR';
export const CLEAR_BU_QUESTIONS_WITH_COMMENT_REQUEST = 'CLEAR_BU_QUESTIONS_WITH_COMMENT_REQUEST';
// =================== GET BU QUESTIONS ========================//

// =================== CREATE NEW FUNCTION_LETTER ========================//
export const CREATE_NEW_FUNCTION_LETTER_REQUEST = 'CREATE_NEW_FUNCTION_LETTER_REQUEST';
export const CREATE_NEW_FUNCTION_LETTER_SUCCESS = 'CREATE_NEW_FUNCTION_LETTER_SUCCESS';
export const CREATE_NEW_FUNCTION_LETTER_ERROR = 'CREATE_NEW_FUNCTION_LETTER_ERROR';
// =================== CREATE NEW FUNCTION LETTER ========================//

// =================== GET LETTER NAME_FROM FUNCTION REQUEST ========================//

export const GET_LETTER_NAME_FROM_FUNCTION_REQUEST = 'GET_LETTER_NAME_FROM_FUNCTION_REQUEST';
export const GET_LETTER_NAME_FROM_FUNCTION_SUCCESS = 'GET_LETTER_NAME_FROM_FUNCTION_SUCCESS';
export const GET_LETTER_NAME_FROM_FUNCTION_ERROR = 'GET_LETTER_NAME_FROM_FUNCTION_ERROR';

// =================== GET LETTER NAME FROM FUNCTION REQUEST ========================//

// =================== GET FUNCTION QUESTIONS ========================//
export const CLEAR_GET_FUNCTION_QUESTIONS_REQUEST = 'CLEAR_GET_FUNCTION_QUESTIONS_REQUEST';
export const GET_FUNCTION_QUESTIONS_REQUEST = 'GET_FUNCTION_QUESTIONS_REQUEST';
export const GET_FUNCTION_QUESTIONS_ERROR = 'GET_FUNCTION_QUESTIONS_ERROR';
export const GET_FUNCTION_QUESTIONS_SUCCESS = 'GET_FUNCTION_QUESTIONS_SUCCESS';
// =================== GET FUNCTION QUESTIONS ========================//

// =================== ADD FUNCTION QUESTIONS ========================//
export const ADD_FUNCTION_QUESTIONS_REQUEST = 'ADD_FUNCTION_QUESTIONS_REQUEST';
export const ADD_FUNCTION_QUESTIONS_ERROR = 'ADD_FUNCTION_QUESTIONS_ERROR';
export const ADD_FUNCTION_QUESTIONS_SUCCESS = 'ADD_FUNCTION_QUESTIONS_SUCCESS';

// =================== ADD FUNCTION QUESTIONS ========================//

// =================== EDIT FUNCTION QUESTIONS ========================//
export const EDIT_FUNCTION_QUESTIONS_REQUEST = 'EDIT_FUNCTION_QUESTIONS_REQUEST';
export const EDIT_FUNCTION_QUESTIONS_ERROR = 'EDIT_FUNCTION_QUESTIONS_ERROR';
export const EDIT_FUNCTION_QUESTIONS_SUCCESS = 'EDIT_FUNCTION_QUESTIONS_SUCCESS';
// =================== EDIT FUNCTION QUESTIONS ========================//

// =================== DELETE FUNCTION QUESTIONS ========================//

export const DELETE_FUNCTION_QUESTIONS_REQUEST = 'DELETE_FUNCTION_QUESTIONS_REQUEST';
export const DELETE_FUNCTION_QUESTIONS_ERROR = 'DELETE_FUNCTION_QUESTIONS_ERROR';
export const DELETE_FUNCTION_QUESTIONS_SUCCESS = 'DELETE_FUNCTION_QUESTIONS_SUCCESS';

// =================== DELETE FUNCTION QUESTIONS ========================//

// =================== Question Bank Get Instructions ========================//
export const GET_INSTRUCTIONS_REQUEST = 'GET_INSTRUCTIONS_REQUEST';
export const GET_INSTRUCTIONS_SUCCESS = 'GET_INSTRUCTIONS_SUCCESS';
export const GET_INSTRUCTIONS_ERROR = 'GET_INSTRUCTIONS_ERROR';
// =================== Question Bank Get Instructions ========================//

// =================== Question Bank Modify Instructions ========================//

export const MODIFY_INSTRUCTIONS_REQUEST = 'MODIFY_INSTRUCTIONS_REQUEST';
export const MODIFY_INSTRUCTIONS_SUCCESS = 'MODIFY_INSTRUCTIONS_SUCCESS';
export const MODIFY_INSTRUCTIONS_ERROR = 'MODIFY_INSTRUCTIONS_ERROR';

// =================== Question Bank Modify Instructions ========================//

// =================== FUNCTIONAL_Question Bank Get Instructions ========================//
export const GET_FUNCTIONAL_INSTRUCTIONS_REQUEST = 'GET_FUNCTIONAL_INSTRUCTIONS_REQUEST';
export const GET_FUNCTIONAL_INSTRUCTIONS_SUCCESS = 'GET_FUNCTIONAL_INSTRUCTIONS_SUCCESS';
export const GET_FUNCTIONAL_INSTRUCTIONS_ERROR = 'GET_FUNCTIONAL_INSTRUCTIONS_ERROR';
// =================== Question Bank Get Instructions ========================//

// =================== FUNCTIONAL_Question Bank Modify Instructions ========================//

export const MODIFY_FUNCTIONAL_INSTRUCTIONS_REQUEST = 'MODIFY_FUNCTIONAL_INSTRUCTIONS_REQUEST';
export const MODIFY_FUNCTIONAL_INSTRUCTIONS_SUCCESS = 'MODIFY_FUNCTIONAL_INSTRUCTIONS_SUCCESS';
export const MODIFY_FUNCTIONAL_INSTRUCTIONS_ERROR = 'MODIFY_FUNCTIONAL_INSTRUCTIONS_ERROR';

// =================== FUNCTIONAL_Question Bank Modify Instructions ========================//

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  get_BU_Questions: { ...block, data: [] },
  add_BU_Questions: { ...block, data: [] },
  edit_BU_Questions: { ...block, data: [] },
  delete_BU_Questions: { ...block, data: [] },
  get_BU_Questions_With_Comments: { ...block, data: [] },
  createNewFunctionRequest: { ...block, data: [] },
  getLetterNameFromFunction: { ...block, data: [] },
  get_Function_Questions: { ...block, data: [] },
  add_Function_Questions: { ...block, data: [] },
  edit_Function_Questions: { ...block, data: [] },
  delete_Function_Questions: { ...block, data: [] },
  getInstructions: { ...block, data: [] },
  modifyInstructions: { ...block, data: [] },
  getFunctionalInstructions: { ...block, data: [] },
  modifyFunctionalInstructions: { ...block, data: [] },
};

export const RL_QuestionBankReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    // Get BU Questions
    case GET_BU_QUESTIONS_REQUEST:
      return {
        ...state,
        get_BU_Questions: { ...state.get_BU_Questions, loading: true },
      };
    case GET_BU_QUESTIONS_SUCCESS:
      return {
        ...state,
        get_BU_Questions: { ...state.get_BU_Questions, data: payload, loading: false },
      };
    case GET_BU_QUESTIONS_ERROR:
      return {
        ...state,
        get_BU_Questions: { ...state.get_BU_Questions, loading: false },
      };

    // Add BU Questions
    case ADD_BU_QUESTIONS_REQUEST:
      return {
        ...state,
        add_BU_Questions: { ...state.add_BU_Questions, loading: true },
      };
    case ADD_BU_QUESTIONS_SUCCESS:
      return {
        ...state,
        add_BU_Questions: { ...state.add_BU_Questions, data: payload, loading: false },
      };
    case ADD_BU_QUESTIONS_ERROR:
      return {
        ...state,
        add_BU_Questions: { ...state.add_BU_Questions, loading: false },
      };

    // Edit BU Questions
    case EDIT_BU_QUESTIONS_REQUEST:
      return {
        ...state,
        edit_BU_Questions: { ...state.edit_BU_Questions, loading: true },
      };
    case EDIT_BU_QUESTIONS_SUCCESS:
      return {
        ...state,
        edit_BU_Questions: { ...state.edit_BU_Questions, data: payload, loading: false },
      };
    case EDIT_BU_QUESTIONS_ERROR:
      return {
        ...state,
        edit_BU_Questions: { ...state.edit_BU_Questions, loading: false },
      };

    // Delete BU Questions
    case DELETE_BU_QUESTIONS_REQUEST:
      return {
        ...state,
        delete_BU_Questions: { ...state.delete_BU_Questions, loading: true },
      };
    case DELETE_BU_QUESTIONS_SUCCESS:
      return {
        ...state,
        delete_BU_Questions: { ...state.delete_BU_Questions, data: payload, loading: false },
      };
    case DELETE_BU_QUESTIONS_ERROR:
      return {
        ...state,
        delete_BU_Questions: { ...state.delete_BU_Questions, loading: false },
      };

    // Get BU Questions With Comments
    case GET_BU_QUESTIONS_WITH_COMMENT_REQUEST:
      return {
        ...state,
        get_BU_Questions_With_Comments: { ...state.get_BU_Questions_With_Comments, loading: true },
      };
    case GET_BU_QUESTIONS_WITH_COMMENT_SUCCESS:
      return {
        ...state,
        get_BU_Questions_With_Comments: {
          ...state.get_BU_Questions_With_Comments,
          data: payload,
          loading: false,
        },
      };
    case GET_BU_QUESTIONS_WITH_COMMENT_ERROR:
      return {
        ...state,
        get_BU_Questions_With_Comments: { ...state.get_BU_Questions_With_Comments, loading: false },
      };
    case CLEAR_BU_QUESTIONS_WITH_COMMENT_REQUEST:
      return {
        ...state,
        get_BU_Questions_With_Comments: { ...state.get_BU_Questions_With_Comments, data: [] },
      };

    // CREATE NEW FUNCTION LETTER
    case CREATE_NEW_FUNCTION_LETTER_REQUEST:
      return {
        ...state,
        createNewFunctionRequest: { ...state.createNewFunctionRequest, loading: true },
      };
    case CREATE_NEW_FUNCTION_LETTER_SUCCESS:
      return {
        ...state,
        createNewFunctionRequest: {
          ...state.createNewFunctionRequest,
          data: payload,
          loading: false,
        },
      };
    case CREATE_NEW_FUNCTION_LETTER_ERROR:
      return {
        ...state,
        createNewFunctionRequest: { ...state.createNewFunctionRequest, loading: false },
      };

    // GET LETTER NAME FROM FUNCTION
    case GET_LETTER_NAME_FROM_FUNCTION_REQUEST:
      return {
        ...state,
        getLetterNameFromFunction: { ...state.getLetterNameFromFunction, loading: true },
      };
    case GET_LETTER_NAME_FROM_FUNCTION_SUCCESS:
      return {
        ...state,
        getLetterNameFromFunction: {
          ...state.getLetterNameFromFunction,
          data: payload,
          loading: false,
        },
      };
    case GET_LETTER_NAME_FROM_FUNCTION_ERROR:
      return {
        ...state,
        getLetterNameFromFunction: { ...state.getLetterNameFromFunction, loading: false },
      };

    // Get FUNCTION Questions
    case GET_FUNCTION_QUESTIONS_REQUEST:
      return {
        ...state,
        get_Function_Questions: { ...state.get_Function_Questions, loading: true },
      };
    case GET_FUNCTION_QUESTIONS_SUCCESS:
      return {
        ...state,
        get_Function_Questions: { ...state.get_Function_Questions, data: payload, loading: false },
      };
    case GET_FUNCTION_QUESTIONS_ERROR:
      return {
        ...state,
        get_Function_Questions: { ...state.get_Function_Questions, loading: false },
      };

    // clear get function questions
    case CLEAR_GET_FUNCTION_QUESTIONS_REQUEST:
      return {
        ...state,
        get_Function_Questions: { ...state.get_Function_Questions, data: [], loading: false },
      };

    // Add FUNCTION Questions
    case ADD_FUNCTION_QUESTIONS_REQUEST:
      return {
        ...state,
        add_Function_Questions: { ...state.add_Function_Questions, loading: true },
      };
    case ADD_FUNCTION_QUESTIONS_SUCCESS:
      return {
        ...state,
        add_Function_Questions: { ...state.add_Function_Questions, data: payload, loading: false },
      };
    case ADD_FUNCTION_QUESTIONS_ERROR:
      return {
        ...state,
        add_Function_Questions: { ...state.add_Function_Questions, loading: false },
      };

    // Edit FUNCTION Questions
    case EDIT_FUNCTION_QUESTIONS_REQUEST:
      return {
        ...state,
        edit_Function_Questions: { ...state.edit_Function_Questions, loading: true },
      };
    case EDIT_FUNCTION_QUESTIONS_SUCCESS:
      return {
        ...state,
        edit_Function_Questions: {
          ...state.edit_Function_Questions,
          data: payload,
          loading: false,
        },
      };
    case EDIT_FUNCTION_QUESTIONS_ERROR:
      return {
        ...state,
        edit_Function_Questions: { ...state.edit_Function_Questions, loading: false },
      };

    // Delete FUNCTION Questions
    case DELETE_FUNCTION_QUESTIONS_REQUEST:
      return {
        ...state,
        delete_Function_Questions: { ...state.delete_Function_Questions, loading: true },
      };
    case DELETE_FUNCTION_QUESTIONS_SUCCESS:
      return {
        ...state,
        delete_Function_Questions: {
          ...state.delete_Function_Questions,
          data: payload,
          loading: false,
        },
      };
    case DELETE_FUNCTION_QUESTIONS_ERROR:
      return {
        ...state,
        delete_Function_Questions: { ...state.delete_Function_Questions, loading: false },
      };

    // Question Bank Get Instructions
    case GET_INSTRUCTIONS_REQUEST:
      return {
        ...state,
        getInstructions: { ...state.getInstructions, loading: true },
      };
    case GET_INSTRUCTIONS_SUCCESS:
      return {
        ...state,
        getInstructions: { ...state.getInstructions, data: payload, loading: false },
      };
    case GET_INSTRUCTIONS_ERROR:
      return {
        ...state,
        getInstructions: { ...state.getInstructions, loading: false },
      };

    // Question Bank Modify Instructions
    case MODIFY_INSTRUCTIONS_REQUEST:
      return {
        ...state,
        modifyInstructions: { ...state.modifyInstructions, loading: true },
      };
    case MODIFY_INSTRUCTIONS_SUCCESS:
      return {
        ...state,
        modifyInstructions: { ...state.modifyInstructions, data: payload, loading: false },
      };
    case MODIFY_INSTRUCTIONS_ERROR:
      return {
        ...state,
        modifyInstructions: { ...state.modifyInstructions, loading: false },
      };

    // FUNCTIONAL_Question Bank Get Instructions
    case GET_FUNCTIONAL_INSTRUCTIONS_REQUEST:
      return {
        ...state,
        getFunctionalInstructions: { ...state.getFunctionalInstructions, loading: true },
      };
    case GET_FUNCTIONAL_INSTRUCTIONS_SUCCESS:
      return {
        ...state,
        getFunctionalInstructions: {
          ...state.getFunctionalInstructions,
          data: payload,
          loading: false,
        },
      };
    case GET_FUNCTIONAL_INSTRUCTIONS_ERROR:
      return {
        ...state,
        getFunctionalInstructions: { ...state.getFunctionalInstructions, loading: false },
      };

    // FUNCTIONAL_Question Bank Modify Instructions
    case MODIFY_FUNCTIONAL_INSTRUCTIONS_REQUEST:
      return {
        ...state,
        modifyFunctionalInstructions: { ...state.modifyFunctionalInstructions, loading: true },
      };
    case MODIFY_FUNCTIONAL_INSTRUCTIONS_SUCCESS:
      return {
        ...state,
        modifyFunctionalInstructions: {
          ...state.modifyFunctionalInstructions,
          data: payload,
          loading: false,
        },
      };
    case MODIFY_FUNCTIONAL_INSTRUCTIONS_ERROR:
      return {
        ...state,
        modifyFunctionalInstructions: { ...state.modifyFunctionalInstructions, loading: false },
      };

    default:
      return state;
  }
};
