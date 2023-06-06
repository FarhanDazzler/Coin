import React, { useContext, useEffect, useState } from 'react';
import { MsalProvider, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { InteractionStatus, PublicClientApplication } from '@azure/msal-browser';
import { loginRequest, msalConfig } from './utils/authConfig';
import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './assets/styles/App.css';
import './assets/styles/mixins.scss';
import TopBar from './parts/TopBar/TopBar';
import Footer from './parts/Footer/Footer';
import Login from './pages/Login/Login';
import Cookies from 'js-cookie';
import Home_controlOwner from './pages/Home/Home_controlOwner';
import { UserContext, UserContextProvider } from './context/userContext';
import dataService from './services/dataService';
//import QuestionBank from './components/QuestionBank';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuestionBank from './pages/QuestionBank/QuestionBankLandingPage';
import NotAuthorized from './pages/NotAuthorized/NotAuthorizedPage';
import MDM from './pages/MDM/MDMLandingPage';
import MDM_OrganizationHierarchyLandingPage from './pages/MDM/OrganizationHierarchy/MDMOrganizationHierarchyLandingPage.jsx';
import MDM_ApplicabilityAndAssignmentOfProviderOrganizationLandingPage from './pages/MDM/Applicability_AssignmentOfProviderOrganization/MDMApplicabilityAndAssignmentOfProviderOrganizationLandingPage';
import MDM_Mega_Process_Sub_ProcessLandingPage from './pages/MDM/Mega_Process_And_Sub_Process/MDM_Mega_Process _Sub_ProcessLandingPage.jsx';
import MDM_Control_Owner_OversightLandingPage from './pages/MDM/Control_Owner_Oversight/MDMControl_Owner_OversightLandingPage';
import MDM_MICS_FrameworkLandingPage from './pages/MDM/MICS_Framework/MDMMICSFrameworkLandingPage.jsx';
import AddValues_MDM_Mics_Framework from './pages/MDM/MICS_Framework/InputPage/AddValues';
import AssessmentBankLandingPage from './pages/AssessmentBank/AssessmentBankLandingPage';
import { useSelector } from 'react-redux';
import ScheduleSurveyPage from './pages/AssessmentBank/ScheduleSurvey/ScheduleSurveyPage';
import ControlHomePage from './pages/Home/ControlHomePage';
import InternalControlHomePage from './pages/Home/V2/InternalControlHomePage';
import AssessmentDetailsTableData from './pages/AssessmentBank/Table/AssessmentDetailsTableData.jsx';
import REP_Letters_HomePage from './pages/REP_Letters_Module/Home';
import POC from './pages/TestPages_For_POC_only/POC.jsx';
import AssessmentForm from './pages/AssessmentForm/AssessmentForm';
import RLMDM from './pages/REP_Letters_Module/Home/MDM';
import AdminLandingPage from './pages/AdminPage/AdminLandingPage';
import AssessmentModulePanel from './pages/AdminPage/AssessmentModulePanel/AssessmentModulePanel.jsx';

// User categories --> User Role
// const userRole = 'Global Internal Control';
// const userRole="Zonal Internal Control";
// const userRole="Control Owner";
const userRole = 'Control Oversight';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d3a306',
    },
    secondary: {
      main: '#595959',
    },
    neutral: {
      main: '#f1c40f',
      contrastText: '#111',
    },
    silver: {
      main: '#F5F5F5',
      contrastText: '#111',
    },
  },
});

const Pages = () => {
  const location = useLocation();
  const history = useHistory();
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts, inProgress } = useMsal();
  const userRole = localStorage.getItem('selected_Role');
  const userData = localStorage.getItem('Roles');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const [userState, userDispatch] = useContext(UserContext);
  const [userToken, setUserToken] = useState('');
  const role = loginRole ?? userRole;

  const isControlPage = () => {
    switch (true) {
      case ['Control owner', 'Control oversight'].includes(role):
        return true;
      default:
        return false;
    }
  };
  const getUserData = () => {
    axios
      .get(
        `https://acoemicsgrcpwa-devbe.azurewebsites.net/login?User_oid=${accounts[0]?.idTokenClaims.oid}`,
      )
      .then(async (res) => {
        console.log(res.data, 'User Role User Token');
        localStorage.setItem('Roles', res?.data.data?.sa_roles || [])
        Cookies.set('token', res?.data.token);
        setUserToken(res?.data.token);
        if (accounts[0]?.username) {
          axios
            .get(
              `https://acoemicsgrcpwa-devbe.azurewebsites.net/get_user_role?User_Email=${accounts[0]?.username}`,
              {
                headers: {
                  Authorization: `Bearer ${res?.data.token}`,
                },
              },
            )
            .then(async (res) => {
              console.log(res.data.data[0], 'User Role');
              // localStorage.setItem('user_Role', res?.data.data[0]?.User_Role);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        //localStorage.setItem('token', res?.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // main RBAC API Call
    if (accounts.length > 0) getUserData();
  }, [accounts]);

  const user_role = localStorage.getItem('user_Role');

  useEffect(() => {
    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      history.push('/login');
    }
  }, [inProgress]);

  useEffect(() => {
    if (accounts?.length > 0) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          localStorage.setItem('id_token', response?.idToken);
          dataService
            .getMSGraphPhoto(response.accessToken)
            .then((image) => {
              if (image.type === 'image/jpeg')
                userDispatch({ type: 'SET_PROFILE_PHOTO', payload: image });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          instance.logout({
            account: accounts.length > 0 ? accounts[0] : null,
          });
        });
    }
  }, [accounts, inProgress]);

  return (
    <div className="page">
      <ToastContainer autoClose={15000} />
      <div className="flex-fill">
        {!['/login'].includes(location?.pathname) && <TopBar isControlPage={isControlPage()} />}
        {/* <Home /> */}
        <Switch>
          <Route
            path="/login"
            render={(props) => {
              return <Login />;
            }}
          />

          {isControlPage() ? (
            <Route exact path="/" component={ControlHomePage} />
          ) : (
            <Route exact path="/" component={InternalControlHomePage} />
          )}

          <Route exact path="/question-bank" component={QuestionBank} />
          <Route exact path="/REP-Letters" component={REP_Letters_HomePage} />

          {user_role === 'organizational persona' ? (
            <Route exact path="/home" component={Home_controlOwner} />
          ) : user_role === 'administrational persona' ? (
            <Route exact path="/home" component={InternalControlHomePage} />
          ) : (
            <Route exact path="/home" component={Home_controlOwner} />
          )}

          <Route exact path="/assessmentbank" component={AssessmentBankLandingPage} />
          <Route exact path="/Assessments/:Assessment_id" component={AssessmentForm} />
          <Route exact path="/questionbank" component={QuestionBank} />
          <Route exact path="/not-authorized" component={NotAuthorized} />
          <Route exact path="/master-data-management" component={MDM} />
          <Route
            exact
            path="/master-data-management/organization-hierarchy"
            component={MDM_OrganizationHierarchyLandingPage}
          />
          <Route
            exact
            path="/master-data-management/applicability-assignment-of-provider-organization"
            component={MDM_ApplicabilityAndAssignmentOfProviderOrganizationLandingPage}
          />
          <Route
            exact
            path="/master-data-management/co-owner-oversight"
            component={MDM_Control_Owner_OversightLandingPage}
          />
          <Route
            exact
            path="/master-data-management/mics-framework"
            component={MDM_MICS_FrameworkLandingPage}
          />
          <Route
            exact
            path="/master-data-management/mics-framework/addNew"
            component={AddValues_MDM_Mics_Framework}
          />
          <Route
            exact
            path="/master-data-management/mega-process-sub-Process"
            component={MDM_Mega_Process_Sub_ProcessLandingPage}
          />
          <Route exact path="/assessmentbank" component={AssessmentBankLandingPage} />
          <Route exact path="/assessmentbank/schedule-survey" component={ScheduleSurveyPage} />
          <Route
            exact
            path="/assessmentbank/assessment-details"
            component={AssessmentDetailsTableData}
          />
          <Route exact path="/POC" component={POC} />
          <Route exact path="/rlmdm" component={RLMDM} />
          <Route exact path="/admin-panel" component={AdminLandingPage} />
          <Route exact path="/admin-panel/sa" component={AssessmentModulePanel} />
          <Route
            path="*"
            render={(props) => {
              return (
                <h1>
                  Error 404
                  <br />
                  Page Not Found
                </h1>
              );
            }}
          />
        </Switch>
      </div>
    </div>
  );
};

function App() {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <header className="App-header">
          <Router>
            <MsalProvider instance={msalInstance}>
              <UserContextProvider>
                {navigator.onLine && <Pages />}
                {/* {!navigator.onLine && <NoInternet />} */}
              </UserContextProvider>
            </MsalProvider>
          </Router>
        </header>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
