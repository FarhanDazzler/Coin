import QuestionBank from '../../pages/QuestionBank/QuestionBankLandingPage';
import MDM from '../../pages/MDM/MDMLandingPage';
import MDM_OrganizationHierarchyLandingPage from '../../pages/MDM/OrganizationHierarchy/MDMOrganizationHierarchyLandingPage.jsx';
import MDM_ApplicabilityAndAssignmentOfProviderOrganizationLandingPage from '../../pages/MDM/Applicability_AssignmentOfProviderOrganization/MDMApplicabilityAndAssignmentOfProviderOrganizationLandingPage';
import MDM_Mega_Process_Sub_ProcessLandingPage from '../../pages/MDM/Mega_Process_And_Sub_Process/MDM_Mega_Process _Sub_ProcessLandingPage.jsx';
import MDM_Control_Owner_OversightLandingPage from '../../pages/MDM/Control_Owner_Oversight/MDMControl_Owner_OversightLandingPage';
import MDM_MICS_FrameworkLandingPage from '../../pages/MDM/MICS_Framework/MDMMICSFrameworkLandingPage.jsx';
import AddValues_MDM_Mics_Framework from '../../pages/MDM/MICS_Framework/InputPage/AddValues';
import AssessmentBankLandingPage from '../../pages/AssessmentBank/AssessmentBankLandingPage';
import ScheduleSurveyPage from '../../pages/AssessmentBank/ScheduleSurvey/ScheduleSurveyPage';
import AssessmentDetailsTableData from '../../pages/AssessmentBank/Table/AssessmentDetailsTableData.jsx';
import QuestionBankChangeLanguage from '../../pages/QuestionBankChangeLanguage';
import Reporting from '../../pages/Reporting/Reporting';
import { CommonWrapper } from '../../App';

export const AssessmentModuleRoutes = [
  {
    path: '/questionbank',
    exact: true,
    component: () => CommonWrapper(<QuestionBank />),
  },
  {
    path: '/questionbank/change-language',
    exact: true,
    component: () => CommonWrapper(<QuestionBankChangeLanguage />),
  },
  {
    path: '/master-data-management',
    exact: true,
    component: () => CommonWrapper(<MDM />),
  },
  {
    path: '/master-data-management/organization-hierarchy',
    exact: true,
    component: () => CommonWrapper(<MDM_OrganizationHierarchyLandingPage />),
  },
  {
    path: '/master-data-management/applicability-assignment-of-provider-organization',
    exact: true,
    component: () =>
      CommonWrapper(<MDM_ApplicabilityAndAssignmentOfProviderOrganizationLandingPage />),
  },
  {
    path: '/master-data-management/co-owner-oversight',
    exact: true,
    component: () => CommonWrapper(<MDM_Control_Owner_OversightLandingPage />),
  },
  {
    path: '/master-data-management/mics-framework',
    exact: true,
    component: () => CommonWrapper(<MDM_MICS_FrameworkLandingPage />),
  },
  {
    path: '/master-data-management/mics-framework/addNew',
    exact: true,
    component: () => CommonWrapper(<AddValues_MDM_Mics_Framework />),
  },
  {
    path: '/master-data-management/mega-process-sub-Process',
    exact: true,
    component: () => CommonWrapper(<MDM_Mega_Process_Sub_ProcessLandingPage />),
  },
  {
    path: '/assessmentbank',
    exact: true,
    component: () => CommonWrapper(<AssessmentBankLandingPage />),
  },
  {
    path: '/assessmentbank/schedule-survey',
    exact: true,
    component: () => CommonWrapper(<ScheduleSurveyPage />),
  },
  {
    path: '/assessmentbank/assessment-details',
    exact: true,
    component: () => CommonWrapper(<AssessmentDetailsTableData />),
  },
  {
    path: '/reporting',
    exact: true,
    component: () => CommonWrapper(<Reporting />),
  },
];
