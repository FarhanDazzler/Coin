import {
    ACTION_GET_SECTION1_QUESTIONS_DATA,
    ACTION_GET_SECTION1_QUESTIONS_DATA_SUCCESS,
    ACTION_GET_SECTION1_QUESTIONS_DATA_FAILED,
    ACTION_GET_SECTION1_OPTIONS_DATA,
    ACTION_GET_SECTION1_OPTIONS_DATA_SUCCESS,
    ACTION_GET_SECTION1_OPTIONS_DATA_FAILED,
    ACTION_ADD_SECTION1_OPTIONS_DATA,
    ACTION_ADD_SECTION1_OPTIONS_DATA_FAILED,
    ACTION_ADD_SECTION1_OPTIONS_DATA_SUCCESS,
    ACTION_ADD_SECTION1_QUESTIONS_DATA,
    ACTION_ADD_SECTION1_QUESTIONS_DATA_FAILED,
    ACTION_ADD_SECTION1_QUESTIONS_DATA_SUCCESS,
    ACTION_EDIT_SECTION1_QUESTIONS_DATA,
    ACTION_EDIT_SECTION1_QUESTIONS_DATA_SUCCESS,
    ACTION_EDIT_SECTION1_QUESTIONS_DATA_FAILED,
    ACTION_EDIT_SECTION1_OPTIONS_DATA,
    ACTION_EDIT_SECTION1_OPTIONS_DATA_SUCCESS,
    ACTION_EDIT_SECTION1_OPTIONS_DATA_FAILED,
    ACTION_DELETE_SECTION1_QUESTIONS_DATA,
    ACTION_DELETE_SECTION1_QUESTIONS_DATA_SUCCESS,
    ACTION_DELETE_SECTION1_QUESTIONS_DATA_FAILED,
    ACTION_DELETE_SECTION1_OPTIONS_DATA,
    ACTION_DELETE_SECTION1_OPTIONS_DATA_SUCCESS,
    ACTION_DELETE_SECTION1_OPTIONS_DATA_FAILED
} from '../types';

const initialState = {
    section1GetQuestion: {
        data: {},
        loading: false,
        error: null,
        success: null,
    },
    section1GetOption: {
        data: {},
        loading: false,
        error: null,
        success: null,
    },
    section1AddQuestion: {
        data: {},
        loading: false,
        error: null,
        success: null,
    },
    section1AddOption: {
        data: {},
        loading: false,
        error: null,
        success: null,
    },
    section1EditQuestion: {
        data: {},
        loading: false,
        error: null,
        success: null,
    },
    section1EditOption: {
        data: {},
        loading: false,
        error: null,
        success: null,
    },
    section1DeleteQuestion: {
        data: {},
        loading: false,
        error: null,
        success: null,
    },
    section1DeleteOption: {
        data: {},
        loading: false,
        error: null,
        success: null,
    },

};

function getInitialState() {
    return initialState;
}

export default function section1QuestionDataReducer(state = getInitialState(), action) {
    switch (action.type) {
        case ACTION_GET_SECTION1_QUESTIONS_DATA:
            return {
                ...state,
                section1GetQuestion: {
                    data: {},
                    loading: true,
                    error: '',
                    success: '',
                }
            };
        case ACTION_GET_SECTION1_QUESTIONS_DATA_SUCCESS:
            return {
                ...state,
                section1GetQuestion: {
                    data: action.data,
                    loading: false,
                    error: '',
                    success: 'Section1 Question Data successfully',
                }

            };
        case ACTION_GET_SECTION1_QUESTIONS_DATA_FAILED:
            return {
                ...state,
                section1GetQuestion: {
                    data: {},
                    loading: false,
                    error: 'Failed',
                    success: '',
                }


            };
        case ACTION_GET_SECTION1_OPTIONS_DATA:
            return {
                ...state,
                section1GetOption: {
                    data: {},
                    loading: false,
                    error: '',
                    success: '',
                }


            };
        case ACTION_GET_SECTION1_OPTIONS_DATA_SUCCESS:
            return {
                ...state,
                section1GetOption: {
                    data: action.data,
                    loading: false,
                    error: '',
                    success: 'Section1 Option Data successfully',
                }


            };
        case ACTION_GET_SECTION1_OPTIONS_DATA_FAILED:
            return {
                ...state,
                section1GetOption: {
                    data: {},
                    loading: false,
                    error: '',
                    success: 'Failed',
                }


            };
        case ACTION_ADD_SECTION1_QUESTIONS_DATA:
            return {
                ...state,
                section1AddQuestion: {
                    data: {},
                    loading: true,
                    error: '',
                    success: '',
                }
            };
        case ACTION_ADD_SECTION1_QUESTIONS_DATA_SUCCESS:
            return {
                ...state,
                section1AddQuestion: {
                    data: action.data,
                    loading: false,
                    error: '',
                    success: 'Section1 Question Add Data successfully',
                }

            };
        case ACTION_ADD_SECTION1_QUESTIONS_DATA_FAILED:
            return {
                ...state,
                section1AddQuestion: {
                    data: {},
                    loading: false,
                    error: 'Failed',
                    success: '',
                }


            };
        case ACTION_ADD_SECTION1_OPTIONS_DATA:
            return {
                ...state,
                section1AddOption: {
                    data: {},
                    loading: false,
                    error: '',
                    success: '',
                }


            };
        case ACTION_ADD_SECTION1_OPTIONS_DATA_SUCCESS:
            return {
                ...state,
                section1AddOption: {
                    data: action.data,
                    loading: false,
                    error: '',
                    success: 'Section1 Option Add Data successfully',
                }


            };
        case ACTION_ADD_SECTION1_OPTIONS_DATA_FAILED:
            return {
                ...state,
                section1AddOption: {
                    data: {},
                    loading: false,
                    error: '',
                    success: 'Failed',
                }


            };

        case ACTION_EDIT_SECTION1_QUESTIONS_DATA:
            return {
                ...state,
                section1EditQuestion: {
                    data: {},
                    loading: true,
                    error: '',
                    success: '',
                }
            };
        case ACTION_EDIT_SECTION1_QUESTIONS_DATA_SUCCESS:
            return {
                ...state,
                section1EditQuestion: {
                    data: action.data,
                    loading: false,
                    error: '',
                    success: 'Section1 Question Updated successfully',
                }

            };
        case ACTION_EDIT_SECTION1_QUESTIONS_DATA_FAILED:
            return {
                ...state,
                section1EditQuestion: {
                    data: {},
                    loading: false,
                    error: 'Failed',
                    success: '',
                }


            };
        case ACTION_EDIT_SECTION1_OPTIONS_DATA:
            return {
                ...state,
                section1EditOption: {
                    data: {},
                    loading: false,
                    error: '',
                    success: '',
                }


            };
        case ACTION_EDIT_SECTION1_OPTIONS_DATA_SUCCESS:
            return {
                ...state,
                section1EditOption: {
                    data: action.data,
                    loading: false,
                    error: '',
                    success: 'Section1 Option Updated successfully',
                }


            };
        case ACTION_EDIT_SECTION1_OPTIONS_DATA_FAILED:
            return {
                ...state,
                section1EditOption: {
                    data: {},
                    loading: false,
                    error: '',
                    success: 'Failed',
                }


            };

           
            case ACTION_DELETE_SECTION1_QUESTIONS_DATA:
                return {
                    ...state,
                    section1DeleteQuestion: {
                        data: {},
                        loading: true,
                        error: '',
                        success: '',
                    }
                };
            case ACTION_DELETE_SECTION1_QUESTIONS_DATA_SUCCESS:
                return {
                    ...state,
                    section1DeleteQuestion: {
                        data: action.data,
                        loading: false,
                        error: '',
                        success: 'Section1 Question Deleted successfully',
                    }
    
                };
            case ACTION_DELETE_SECTION1_QUESTIONS_DATA_FAILED:
                return {
                    ...state,
                    section1DeleteQuestion: {
                        data: {},
                        loading: false,
                        error: 'Failed',
                        success: '',
                    }
    
    
                };
            case ACTION_DELETE_SECTION1_OPTIONS_DATA:
                return {
                    ...state,
                    section1DeleteOption: {
                        data: {},
                        loading: false,
                        error: '',
                        success: '',
                    }
    
    
                };
            case ACTION_DELETE_SECTION1_OPTIONS_DATA_SUCCESS:
                return {
                    ...state,
                    section1DeleteOption: {
                        data: action.data,
                        loading: false,
                        error: '',
                        success: 'Section1 Option Deleted successfully',
                    }
    
    
                };
            case ACTION_DELETE_SECTION1_OPTIONS_DATA_FAILED:
                return {
                    ...state,
                    section1DeleteOption: {
                        data: {},
                        loading: false,
                        error: '',
                        success: 'Failed',
                    }
    
    
                };
    
    


        default:
            return state;
    }
}
