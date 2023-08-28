import RLMDM from '../../pages/REP_Letters_Module/Home/MDM';
import RL_MDM_OrganizationHierarchyLandingPage from '../../pages/REP_Letters_Module/Home/MDM/OrganizationHierarchy/MDMOrganizationHierarchyLandingPage';
import RL_MDM_BUMasterdataManagementLandingPage from '../../pages/REP_Letters_Module/Home/MDM/BUMasterDataManagement/BUMasterDataManagementLandingPage';
import RL_MDM_FunctionalMasterdataManagementLandingPage from '../../pages/REP_Letters_Module/Home/MDM/FunctionalMasterdataManagement/FunctionalMasterdataManagementLandingPage';
import RLQuestionBank from '../../pages/REP_Letters_Module/Home/QuestionBank/RepLetterQuestionBankLandingPage';
import BUModifyQuestions from '../../pages/REP_Letters_Module/Home/QuestionBank/BU/BUModifyQuestions';
import FunctionModifyQuestions from '../../pages/REP_Letters_Module/Home/QuestionBank/Functional/FunctionModifyQuestions';
import SchedulingAndTriggering from '../../pages/REP_Letters_Module/SchedulingAndTriggering/SchedulingAndTriggeringLandingPage';
import ScheduleSurveyBUPage from '../../pages/REP_Letters_Module/SchedulingAndTriggering/BU/ScheduleLetter/ScheduleSurveyFunctionalLandingPage';
import ScheduleSurveyFunctionalPage from '../../pages/REP_Letters_Module/SchedulingAndTriggering/Functional/ScheduleLetter/ScheduleSurveyFunctionalLandingPage';
import FunctionalDetailsTableData from '../../pages/REP_Letters_Module/SchedulingAndTriggering/Functional/Table/FunctionalDetailsTableData';
import BUDetailsTableData from '../../pages/REP_Letters_Module/SchedulingAndTriggering/BU/Table/BUDetailsTableData';
import FunctionalLetterForm from '../../pages/REP_Letters_Module/LetterForm/Functional/FunctionalLetterForm';

export const RepLettersRoutes = [
  {
    path: '/REP-Letters/master-data-management',
    exact: true,
    component: RLMDM,
  },
  {
    path: '/REP-Letters/master-data-management/organization-hierarchy',
    exact: true,
    component: RL_MDM_OrganizationHierarchyLandingPage,
  },
  {
    path: '/REP-Letters/master-data-management/bu-masterdata-management',
    exact: true,
    component: RL_MDM_BUMasterdataManagementLandingPage,
  },
  {
    path: '/REP-Letters/master-data-management/functional-masterdata-management',
    exact: true,
    component: RL_MDM_FunctionalMasterdataManagementLandingPage,
  },
  {
    path: '/REP-Letters/questionbank',
    exact: true,
    component: RLQuestionBank,
  },
  {
    path: '/REP-Letters/questionbank/BU-modify-questions',
    exact: true,
    component: BUModifyQuestions,
  },
  {
    path: '/REP-Letters/questionbank/Function-modify',
    exact: true,
    component: FunctionModifyQuestions,
  },
  {
    path: '/REP-Letters/scheduling-and-triggering',
    exact: true,
    component: SchedulingAndTriggering,
  },
  {
    path: '/REP-Letters/scheduling-and-triggering/schedule-survey-bu',
    exact: true,
    component: ScheduleSurveyBUPage,
  },
  {
    path: '/REP-Letters/scheduling-and-triggering/schedule-survey-functional',
    exact: true,
    component: ScheduleSurveyFunctionalPage,
  },
  {
    path: '/REP-Letters/scheduling-and-triggering/functional-letter-details',
    exact: true,
    component: FunctionalDetailsTableData,
  },
  {
    path: '/REP-Letters/scheduling-and-triggering/bu-letter-details',
    exact: true,
    component: BUDetailsTableData,
    path: '/REP-Letters/attempt-letter/functional-letter-form',
    exact: true,
    component: FunctionalLetterForm,
  },
];
