import RLMDM from '../../pages/REP_Letters_Module/Home/MDM';
import RL_MDM_OrganizationHierarchyLandingPage from '../../pages/REP_Letters_Module/Home/MDM/OrganizationHierarchy/MDMOrganizationHierarchyLandingPage';
import RL_MDM_BUMasterdataManagementLandingPage from '../../pages/REP_Letters_Module/Home/MDM/BUMasterDataManagement/BUMasterDataManagementLandingPage';
import BUZoneMasterDataManagementLandingPage from '../../pages/REP_Letters_Module/Home/MDM/BUZoneMasterDataManagement/BUZoneMasterDataManagementLandingPage';
import RL_MDM_FunctionalMasterdataManagementLandingPage from '../../pages/REP_Letters_Module/Home/MDM/FunctionalMasterdataManagement/FunctionalMasterdataManagementLandingPage';
import RLQuestionBank from '../../pages/REP_Letters_Module/Home/QuestionBank/RepLetterQuestionBankLandingPage';
import BUModifyQuestions from '../../pages/REP_Letters_Module/Home/QuestionBank/BU/BUModifyQuestions';
import FunctionModifyQuestions from '../../pages/REP_Letters_Module/Home/QuestionBank/Functional/FunctionModifyQuestions';
import SchedulingAndTriggering from '../../pages/REP_Letters_Module/SchedulingAndTriggering/SchedulingAndTriggeringLandingPage';
import ScheduleSurveyBUPage from '../../pages/REP_Letters_Module/SchedulingAndTriggering/BU/BU/ScheduleLetter/ScheduleSurveyBULandingPage';
import ScheduleSurveyFunctionalPage from '../../pages/REP_Letters_Module/SchedulingAndTriggering/Functional/ScheduleLetter/ScheduleSurveyFunctionalLandingPage';
import FunctionalDetailsTableData from '../../pages/REP_Letters_Module/SchedulingAndTriggering/Functional/Table/FunctionalDetailsTableData';
import BUDetailsTableData from '../../pages/REP_Letters_Module/SchedulingAndTriggering/BU/BU/Table/BUDetailsTableData';
import BULetterForm from '../../pages/REP_Letters_Module/LetterForm/BU/BULetterForm';
import ZoneForm from '../../pages/REP_Letters_Module/LetterForm/Zone/ZoneForm';
import RepLetterReporting from '../../pages/REP_Letters_Module/Reporting/RepLetterReporting';
import BULetterSummaryTable from '../../pages/REP_Letters_Module/SchedulingAndTriggering/BU/BU/Table/BULetterSummaryTable';
import ZoneLetterSummaryTable from '../../pages/REP_Letters_Module/SchedulingAndTriggering/BU/Zone/Table/ZoneLetterSummaryTable';
import ZoneDetailsTableData from '../../pages/REP_Letters_Module/SchedulingAndTriggering/BU/Zone/Table/ZoneDetailsTableData';
import ScheduleSurveyZonePage from '../../pages/REP_Letters_Module/SchedulingAndTriggering/BU/Zone/ScheduleLetter/ScheduleSurveyZoneLandingPage';
import EditSection1 from '../../pages/REP_Letters_Module/LetterForm/BU/FormComponents/EditSection1';
import EditZoneSection1 from '../../pages/REP_Letters_Module/LetterForm/Zone/FormComponents/EditZoneSection1';
import MDMSiteAndPlant from '../../pages/REP_Letters_Module/Home/MDM/SitesAndPlants/MDMSiteAndPlant';
import { CommonWrapper } from '../../App';

export const RepLettersRoutes = [
  {
    path: '/REP-Letters/master-data-management',
    exact: true,
    component: () => CommonWrapper(<RLMDM />),
  },
  {
    path: '/REP-Letters/master-data-management/organization-hierarchy',
    exact: true,
    component: () => CommonWrapper(<RL_MDM_OrganizationHierarchyLandingPage />),
  },
  {
    path: '/REP-Letters/master-data-management/site-and-plant-masterdata-management',
    exact: true,
    component: () => CommonWrapper(<MDMSiteAndPlant />),
  },
  {
    path: '/REP-Letters/master-data-management/bu-masterdata-management',
    exact: true,
    component: () => CommonWrapper(<RL_MDM_BUMasterdataManagementLandingPage />),
  },
  {
    path: '/REP-Letters/master-data-management/bu-zone-masterdata-management',
    exact: true,
    component: () => CommonWrapper(<BUZoneMasterDataManagementLandingPage />),
  },
  {
    path: '/REP-Letters/master-data-management/functional-masterdata-management',
    exact: true,
    component: () => CommonWrapper(<RL_MDM_FunctionalMasterdataManagementLandingPage />),
  },
  {
    path: '/REP-Letters/questionbank',
    exact: true,
    component: () => CommonWrapper(<RLQuestionBank />),
  },
  {
    path: '/REP-Letters/questionbank/BU-modify-questions',
    exact: true,
    component: () => CommonWrapper(<BUModifyQuestions />),
  },
  {
    path: '/REP-Letters/questionbank/Function-modify/:selectedFunction',
    exact: true,
    component: () => CommonWrapper(<FunctionModifyQuestions />),
  },
  {
    path: '/REP-Letters/scheduling-and-triggering',
    exact: true,
    component: () => CommonWrapper(<SchedulingAndTriggering />),
  },
  {
    path: '/REP-Letters/scheduling-and-triggering/schedule-survey-bu',
    exact: true,
    component: () => CommonWrapper(<ScheduleSurveyBUPage />),
  },
  {
    path: '/REP-Letters/scheduling-and-triggering/schedule-survey-functional',
    exact: true,
    component: () => CommonWrapper(<ScheduleSurveyFunctionalPage />),
  },
  {
    path: '/REP-Letters/scheduling-and-triggering/functional-letter-details',
    exact: true,
    component: () => CommonWrapper(<FunctionalDetailsTableData />),
  },
  {
    path: '/REP-Letters/scheduling-and-triggering/bu-letter-details',
    exact: true,
    component: () => CommonWrapper(<BUDetailsTableData />),
  },
  {
    path: '/REP-Letters/attempt-letter/BU-letter-form/:id/:modalType',
    exact: true,
    component: () => CommonWrapper(<BULetterForm />),
  },
  {
    path: '/REP-Letters/attempt-letter/Zone-letter-form/:id/:modalType',
    exact: true,
    component: () => CommonWrapper(<ZoneForm />),
  },
  {
    path: '/REP-Letters/re-attempt-letter/BU-letter-form',
    exact: true,
    component: () => CommonWrapper(<EditSection1 />),
  },
  {
    path: '/REP-Letters/re-attempt-letter/Zone-letter-form',
    exact: true,
    component: () => CommonWrapper(<EditZoneSection1 />),
  },
  {
    path: '/REP-Letters/reporting',
    exact: true,
    component: () => CommonWrapper(<RepLetterReporting />),
  },
  {
    path: '/REP-Letters/scheduling-and-triggering/bu-letter-summary-details',
    exact: true,
    component: () => CommonWrapper(<BULetterSummaryTable />),
  },
  {
    path: '/REP-Letters/scheduling-and-triggering/zone-letter-summary-details',
    exact: true,
    component: () => CommonWrapper(<ZoneLetterSummaryTable />),
  },
  {
    path: '/REP-Letters/scheduling-and-triggering/zone-letter-details',
    exact: true,
    component: () => CommonWrapper(<ZoneDetailsTableData />),
  },
  {
    path: '/REP-Letters/scheduling-and-triggering/schedule-survey-zone',
    exact: true,
    component: () => CommonWrapper(<ScheduleSurveyZonePage />),
  },
];
