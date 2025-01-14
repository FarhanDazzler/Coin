import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { AuthReducer } from './Auth/AuthReducer';
import { AssessmentReducer } from './Assessments/AssessmentReducer';
import controlDataReducer from './ControlData/ControlDataReducer';
import { QuestionsReducer } from './Questions/QuestionsReducer';
import csvTampredDataReducer from './CsvTampred/CsvTampredReducer';
import section1QuestionDataReducer from './QuestionBank/QuestionBankReducer';
import { MDMReducer } from './MDM/MDM_Reducer';
import { AD_Reducer } from './AzureAD/AD_Reducer';
import { AssessmentBankReducer } from './AssessmentBank/AssessmentBankReducer';
import { dashBoardReducer } from './DashBoard/DashBoardReducer';
import { RLMDMReducer } from './REP_Letters/RLMDM/RLMDMReducer';
import { AdminPageReducer } from './AdminPage/AdminPageReducer';
import { RL_QuestionBankReducer } from './REP_Letters/RL_QuestionBank/RL_QuestionBankReducer';
import { ErrorNotificationReducer } from './ErrorNotification/ErrorNotificationReducer';
import { RLSchedulingAndTriggeringReducer } from './REP_Letters/RL_SchedulingAndTriggering/RL_SchedulingAndTriggeringReducer';
import { RL_HomePageReducer } from './REP_Letters/RL_HomePage/RL_HomePageReducer';
import { KPI_ModuleReducer } from './KPI_Module/KPI_Reducer';
// we will connect our reducers here

const appReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
    assessments: AssessmentReducer,
    controlData: controlDataReducer,
    questions: QuestionsReducer,
    csvTampred: csvTampredDataReducer,
    section1QuestionData: section1QuestionDataReducer,
    mdm: MDMReducer,
    ad: AD_Reducer,
    assessmentBank: AssessmentBankReducer,
    dashBoard: dashBoardReducer,
    rlMdm: RLMDMReducer,
    adminPage: AdminPageReducer,
    RL_QuestionBank: RL_QuestionBankReducer,
    ErrorNotification: ErrorNotificationReducer,
    RLSchedulingAndTriggering: RLSchedulingAndTriggeringReducer,
    RL_HomePage: RL_HomePageReducer,
    KPI_Module: KPI_ModuleReducer,
  });

const createRootReducer = (history) => (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(history)(state, action);
};

export default createRootReducer;
