import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { AuthReducer } from './Auth/AuthReducer';
import { AssessmentReducer } from './Assessments/AssessmentReducer';
import controlDataReducer from './ControlData/ControlDataReducer';
import { QuestionsReducer } from './Questions/QuestionsReducer';
import csvTampredDataReducer from './CsvTampred/CsvTampredReducer';
import { MDMReducer } from './MDM/MDM_Reducer';

// we will connect our reducers here

const appReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
    assessments: AssessmentReducer,
    controlData: controlDataReducer,
    questions: QuestionsReducer,
    csvTampred: csvTampredDataReducer,
    mdm: MDMReducer,
  });

const createRootReducer = (history) => (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(history)(state, action);
};

export default createRootReducer;
