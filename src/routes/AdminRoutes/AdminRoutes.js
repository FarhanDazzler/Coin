import AdminLandingPage from '../../pages/AdminPage/AdminLandingPage';
import AssessmentModulePanel from '../../pages/AdminPage/AssessmentModulePanel/AssessmentModulePanel.jsx';
import RepresentationLetterModulePanel from '../../pages/AdminPage/RepresentationLetterModulePanel/RepresentationLetterModulePanel';
import { CommonWrapper } from '../../App';

export const AdminRoutes = [
  {
    path: '/admin-panel',
    exact: true,
    component: () => CommonWrapper(<AdminLandingPage />),
  },
  {
    path: '/admin-panel/sa',
    exact: true,
    component: () => CommonWrapper(<AssessmentModulePanel />),
  },
  {
    path: '/admin-panel/rl',
    exact: true,
    component: () => CommonWrapper(<RepresentationLetterModulePanel />),
  },
];
