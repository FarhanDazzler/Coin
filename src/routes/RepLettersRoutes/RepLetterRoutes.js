import RLMDM from '../../pages/REP_Letters_Module/Home/MDM';
import RL_MDM_OrganizationHierarchyLandingPage from '../../pages/REP_Letters_Module/Home/MDM/OrganizationHierarchy/MDMOrganizationHierarchyLandingPage';
import RL_MDM_BUMasterdataManagementLandingPage from '../../pages/REP_Letters_Module/Home/MDM/BUMasterDataManagement/BUMasterDataManagementLandingPage';
import RL_MDM_FunctionalMasterdataManagementLandingPage from '../../pages/REP_Letters_Module/Home/MDM/FunctionalMasterdataManagement/FunctionalMasterdataManagementLandingPage';
import RLQuestionBank from '../../pages/REP_Letters_Module/Home/QuestionBank/RepLetterQuestionBankLandingPage';
import BUModifyQuestions from '../../pages/REP_Letters_Module/Home/QuestionBank/BU/BUModifyQuestions';
import FunctionAddQuestions from '../../pages/REP_Letters_Module/Home/QuestionBank/Functional/FunctionAddQuestions';
import FunctionModifyQuestions from '../../pages/REP_Letters_Module/Home/QuestionBank/Functional/FunctionModifyQuestions';
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
    path: '/REP-Letters/questionbank/Function-add',
    exact: true,
    component: FunctionAddQuestions,
  },
  {
    path: '/REP-Letters/questionbank/Function-modify',
    exact: true,
    component: FunctionModifyQuestions,
  },
];
