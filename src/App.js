import React, { useContext, useEffect } from 'react';
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
import Home_controlOwner from './pages/Home/Home_controlOwner';
import { UserContext, UserContextProvider } from './context/userContext';
import dataService from './services/dataService';
import Question from './parts/Assessments/Question';
import HomePage from './components/HomePage';
//import QuestionBank from './components/QuestionBank';
import QuestionBank from './pages/QuestionBank/QuestionBankLandingPage';
import NotAuthorized from './pages/NotAuthorized/NotAuthorizedPage';
import MDM from './pages/MDM/MDMLandingPage';
import MDM_OrganizationHierarchyLandingPage from './pages/MDM/OrganizationHierarchy/MDMOrganizationHierarchyLandingPage.jsx';
import MDM_ApplicabilityAndAssignmentOfProviderOrganizationLandingPage from './pages/MDM/Applicability_AssignmentOfProviderOrganization/MDMApplicabilityAndAssignmentOfProviderOrganizationLandingPage';
import MDM_Mega_Process_Sub_ProcessLandingPage from './pages/MDM/Mega_Process_And_Sub_Process/MDM_Mega_Process _Sub_ProcessLandingPage.jsx';
import MDM_Control_Owner_OversightLandingPage from './pages/MDM/Control_Owner_Oversight/MDMControl_Owner_OversightLandingPage';
import MDM_MICS_FrameworkLandingPage from './pages/MDM/MICS_Framework/MDMMICSFrameworkLandingPage.jsx';
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
    },
  },
});

const Pages = () => {
  const location = useLocation();
  const history = useHistory();
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts, inProgress } = useMsal();

  const [userState, userDispatch] = useContext(UserContext);

  useEffect(() => {
    axios
      .get(
        `https://acoemicsgrcpwa-devbe.azurewebsites.net/get_user_role?User_Email=${accounts[0]?.username}`,
        {
          headers: {
            Authorization: 'Basic Q09JTjpDT0lOX1NlY3VyZUAxMjM=',
          },
        },
      )
      .then(async (res) => {
        console.log(res.data.data[0], 'User Role');
        localStorage.setItem('user_Role', res?.data.data[0].User_Role);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          // apiService
          //   .getMSProfile(response?.accessToken)
          //   .then((profile) => {
          //     console.log(profile);
          //     userDispatch({
          //       type: 'SET_JOB_TITLE',
          //       payload: profile?.jobTitle,
          //     });
          //   })
          //   .catch((err) => console.log(err));

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
      <div className="flex-fill">
        {!['/login'].includes(location?.pathname) && <TopBar userRole={user_role} />}
        {/* <Home /> */}
        <Switch>
          <Route
            path="/login"
            render={(props) => {
              return <Login />;
            }}
          />
          <Route exact path="/new" component={HomePage} />
          <Route exact path="/question-bank" component={QuestionBank} />
          {user_role === 'organizational persona' ? (
            <Route exact path="/" component={Home_controlOwner} />
          ) : user_role === 'administrational persona' ? (
            <Route exact path="/" component={HomePage} />
          ) : (
            <Route exact path="/" component={Home_controlOwner} />
          )}
          <Route exact path="/Assessments/:Assessment_id" component={Question} />
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
            path="/master-data-management/mega-process-sub-Process"
            component={MDM_Mega_Process_Sub_ProcessLandingPage}
          />
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
