import React, { useContext, useEffect, useMemo, useState } from 'react';
import { MsalProvider, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { InteractionStatus, PublicClientApplication } from '@azure/msal-browser';
import { loginRequest, msalConfig, snowBackendRequest, powerbiRequest } from './utils/authConfig';
import { Helmet } from 'react-helmet';
import {
  Routes,
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
  useParams,
} from 'react-router-dom';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './assets/styles/App.css';
import './assets/styles/mixins.scss';
import TopBar from './parts/TopBar/TopBar';
import Footer from './parts/Footer/Footer';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Cookies from 'js-cookie';
import { UserContext, UserContextProvider } from './context/userContext';
import dataService from './services/dataService';
//import QuestionBank from './components/QuestionBank';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotAuthorized from './pages/NotAuthorized/NotAuthorizedPage';
import { useDispatch, useSelector } from 'react-redux';
//import ControlHomePage from './pages/Home/ControlHomePage';
import ControlHomePage from './pages/HomePage/ControlOwnerAndOversight/ControlHomePage.jsx';
import InternalControlHomePage from './pages/HomePage/InternalControlPage/InternalControlHomePage.jsx';
//import InternalControlHomePage from './pages/Home/V2/InternalControlHomePage';
import REP_Letters_HomePage from './pages/REP_Letters_Module/Home';
import POC from './pages/TestPages_For_POC_only/POC.jsx';
import { setRoles } from './redux/Auth/AuthAction';
import AssessmentForm from './pages/AssessmentForm';
import ErrorNotification from './common/ErrorNotification';
import { RepLettersRoutes } from './routes/RepLettersRoutes/RepLetterRoutes';
import { AssessmentModuleRoutes } from './routes/AssessmentModuleRoutes/AssessmentModuleRoutes';
import { AdminRoutes } from './routes/AdminRoutes/AdminRoutes';
import ContactUs from './pages/ContactUS/contactus';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import BU_Letter_LazyApprovalSection2 from './pages/REP_Letters_Module/LetterForm/BU/FormComponents/LazyApprovalSection2/BU_Letter_LazyApprovalSection2.jsx';
import BU_Zone_Letter_LazyApprovalSection2 from './pages/REP_Letters_Module/LetterForm/Zone/FormComponents/LazyApprovalSection2/BU_Zone_Letter_LazyApprovalSection2.jsx';
import Review from './pages/Review';
import BULetterForm from './pages/REP_Letters_Module/LetterForm/BU/BULetterForm';
import FunctionalLetterForm from './pages/REP_Letters_Module/LetterForm/Functional/FunctionalLetterForm.jsx';
import KpiModule from './pages/KPIModule/KpiModuleLandingPage.jsx';
import PageWrapper from './components/wrappers/PageWrapper/index.jsx';
import RecipientHomePage from './pages/REP_Letters_Module/Home/Functional/RecipientHomePage/RecipientHomePage.jsx';
import DisclosureProcessorHomePageContainer from './pages/REP_Letters_Module/Home/BU/DisclosureProcessorHomePage/index.jsx';
import { NoMatch } from './pages/NoMatch/NoMatch.js';
import NewTopBar from './parts/NewTopBar/NewTopBar';

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

// Functional Component for opening/rendering the HomePage Directly from the URL
const HomePageDirectLink = () => {
  const { moduleName, roleName } = useParams();
  const token = Cookies.get('token');

  localStorage.setItem('selected_module_Role', moduleName);
  localStorage.setItem('selected_Role', roleName);

  if (moduleName === 'Assessment Module' && roleName === 'Control Owner') {
    return (
      <>
        <TopBar isControlPage={true} />
        <ControlHomePage />
      </>
    );
  } else if (moduleName === 'Functional Representation Letter' && roleName === 'Recipient') {
    return (
      <>
        <TopBar isControlPage={false} />
        <PageWrapper>
          <RecipientHomePage />
        </PageWrapper>
      </>
    );
  } else if (moduleName === 'BU Representation Letter' && roleName === 'Processor') {
    return (
      <>
        <TopBar isControlPage={false} />
        <PageWrapper>
          <DisclosureProcessorHomePageContainer />
        </PageWrapper>
      </>
    );
  } else {
    return (
      <>
        <TopBar isControlPage={false} /> <NoMatch />{' '}
      </>
    );
  }
};

export function CommonWrapper(component) {
  const userRole = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const role = loginRole ?? userRole;
  var isControlPage = useMemo(() => {
    return (
      [
        'Control owner',
        'Control oversight',
        'control_owner',
        'control_oversight',
        'Control Owner',
        'Control Oversight',
      ]?.includes(role) || false
    );
  }, [loginRole, userRole]);

  return (
    <>
      <TopBar isControlPage={isControlPage} />
      {component && component}
    </>
  );
}

const Pages = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { instance, accounts, inProgress } = useMsal();
  const params = new URLSearchParams(location.search);
  const redirect = params.get('redirect');
  const userRole = localStorage.getItem('selected_Role');
  const module = localStorage.getItem('selected_module_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const [userState, userDispatch] = useContext(UserContext);
  const role = loginRole ?? userRole;
  const { moduleName, roleName } = useParams();
  const [isAuth, setIsAuth] = useState(false);

  var isControlPage = useMemo(() => {
    return (
      [
        'Control owner',
        'Control oversight',
        'control_owner',
        'control_oversight',
        'Control Owner',
        'Control Oversight',
      ]?.includes(role) || false
    );
  }, [loginRole, userRole]);

  const isKPIOwnerPage = useMemo(() => {
    if (
      loginRole === 'KPI Owner' ||
      role === 'KPI_owner' ||
      role === 'KPI owner' ||
      role === 'KPI_Owner'
    ) {
      isControlPage = false;
      return true;
    } else return false;
  }, [loginRole, userRole]);

  // eslint-disable-next-line no-unused-vars
  const isAssessmentsPage = ['Assessment Module'].includes(module);
  const getUserData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/login?User_oid=${accounts[0]?.idTokenClaims.oid}`)
      .then(async (res) => {
        if (res?.data?.data[0] == 'user does not exist') {
          history.push('/not-authorized');
          return;
        }
        const saRoles = res?.data.data?.sa_roles || [];
        const updatedParam = {};
        if (res?.data.data?.rl_roles?.BU) updatedParam.BU = res?.data.data?.rl_roles?.BU;
        if (res?.data.data?.rl_roles?.Functional)
          updatedParam.Functional = res?.data.data?.rl_roles?.Functional;

        dispatch(setRoles(res?.data.data));
        Cookies.set('token', res?.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // main RBAC API Call
    if (accounts.length > 0) getUserData();
  }, [accounts]);

  // useEffect(() => {
  //   if (!isAuthenticated && inProgress === InteractionStatus.None) {
  //     history.push('/login');
  //   }
  // }, [inProgress]);

  // useEffect(() => {
  //   const dom = document.getElementById('google_translate_element');
  //   if (!dom) return;
  //   if (['/login'].includes(window.location.pathname)) {
  //     dom.classList.add('d-none');
  //   } else {
  //     dom.classList.remove('d-none');
  //   }
  // }, [history.location.pathname]);

  const authFlow = () => {
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
        setIsAuth(true);
      })
      .catch((err) => {
        instance.logout({
          account: accounts.length > 0 ? accounts[0] : null,
        });
      });
    // for creating Snow API token for Ticketing
    instance
      .acquireTokenSilent({
        ...snowBackendRequest,
        account: accounts[0],
      })
      .then((response) => {
        localStorage.setItem('snow_api_access_token', response?.accessToken);
      })
      .catch((err) => {
        console.log(`Error occurred while acquiring token: ${err}`);
      });
    // for creating PowerBI API token for PowerBI
    instance
      .acquireTokenSilent({
        ...powerbiRequest,
        account: accounts[0],
      })
      .then((response) => {
        localStorage.setItem('powerbi_access_token', response?.accessToken);
      })
      .catch((err) => {
        console.log(`Error occurred while acquiring token: ${err}`);
      });
  };
  useEffect(() => {
    // // logic redirect login url'
    if (accounts && accounts?.length > 0 && inProgress === InteractionStatus.None && !isAuth) {
      if (accounts?.length > 0) {
        authFlow();
      }
      // logic for getting NPS api auth token
      if (accounts) {
        console.log('accounts', accounts);
        instance
          .acquireTokenSilent({
            scopes: [process.env.REACT_APP_NPS_AUTH_API],
            account: accounts[0],
          })
          .then((response) => {
            if (response) {
              console.log('response.accessToken', response);
              //setToken(response.accessToken);
              localStorage.setItem('nps-auth-token', response.accessToken);
            }
          })
          .catch((error) => {
            console.log('error in custom', error);
          });
      }
      if (redirect) history.push(redirect);
      else if (location.pathname == '/login') history.push('/');
      else {
        history.push(`${location.pathname}${location.search ? location.search : ''}`);
      }
    } else if (accounts && accounts.length === 0 && inProgress === InteractionStatus.None) {
      if (redirect) history.push(`/login?redirect=${redirect}`);
      else history.push('/login');
    }
  }, [accounts, inProgress, location.pathname]);

  const isNotShowTopNavbar = useMemo(() => {
    const paths = ['/login', '/homepage-direct-link', '/dashboard'];

    return paths.some((path) => location?.pathname.startsWith(path));
  }, [location?.pathname]);

  const showNewTopNavbar = useMemo(() => {
    const paths = ['/dashboard'];

    return paths.some((path) => location?.pathname.startsWith(path));
  }, [location?.pathname]);

  return (
    <div className="page">
      <ToastContainer autoClose={15000} />
      <div className="flex-fill">
        {!isNotShowTopNavbar && <TopBar isControlPage={isControlPage} />}
        {showNewTopNavbar && <NewTopBar />}
        {/* <Home /> */}
        <Switch>
          <Route
            path="/login"
            render={(props) => {
              return <Login />;
            }}
          />

          <Route exact path="/dashboard" component={Dashboard} />

          {!isAssessmentsPage ? (
            <Route exact path="/" component={REP_Letters_HomePage} />
          ) : isControlPage ? (
            <Route exact path="/" component={ControlHomePage} />
          ) : isKPIOwnerPage ? (
            <Route exact path="/" component={KpiModule} />
          ) : (
            <Route exact path="/" component={InternalControlHomePage} />
          )}
          <Route exact path="/review/:control_id" component={Review} />

          {/* {user_role === 'organizational persona' ? (
            <Route exact path="/home" component={Home_controlOwner} />
          ) : user_role === 'administrational persona' ? (
            <Route exact path="/home" component={InternalControlHomePage} />
          ) : (
            <Route exact path="/home" component={Home_controlOwner} />
          )} */}
          {module === 'Assessment Module' && (
            <Route exact path="/Assessments/:control_id" component={AssessmentForm} />
          )}

          {userRole === 'Global Internal Control' || userRole === 'Zonal Internal Control'
            ? AssessmentModuleRoutes.map((routes, i) => <Route key={i} {...routes} />)
            : null}

          {module === 'Functional Representation Letter' || module === 'BU Representation Letter'
            ? RepLettersRoutes.map((routes, i) => <Route key={i} {...routes} />)
            : null}

          {userRole === 'Global Internal Control' ||
          module === 'Functional Representation Letter' ||
          module === 'BU Representation Letter'
            ? AdminRoutes.map((routes, i) => <Route key={i} {...routes} />)
            : null}
          <Route
            exact
            path="/REP-Letters/attempt-letter/functional-letter-form/:id/:modalType"
            component={FunctionalLetterForm}
          />
          <Route
            exact
            path="/REP-Letters/attempt-letter/BU-letter-form/:id/:modalType"
            component={BULetterForm}
          />
          <Route exact path="/BU-Letter-approve/:id" component={BU_Letter_LazyApprovalSection2} />
          <Route
            exact
            path="/BU-Zone-Letter-approve/:id"
            component={BU_Zone_Letter_LazyApprovalSection2}
          />
          <Route
            exact
            path="/homepage-direct-link/:moduleName/:roleName"
            component={HomePageDirectLink}
          />
          <Route exact path="/contact-us" component={ContactUs} />
          <Route exact path="/not-authorized/contact-us" component={ContactUs} />
          <Route exact path="/not-authorized" component={NotAuthorized} />
          <Route exact path="/kpi-module" component={KpiModule} />
          <Route exact path="/POC" component={POC} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </div>
    </div>
  );
};

function App() {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="App">
        <Helmet>
          <script type="text/javascript">
            {`(function (c, l, a, r, i, t, y) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', '${process.env.REACT_APP_CLARITY_KEY}');`}
          </script>
        </Helmet>
        <ThemeProvider theme={theme}>
          <header className="App-header">
            <Router>
              <MsalProvider instance={msalInstance}>
                <UserContextProvider>
                  {navigator.onLine && <Pages />}
                  <ErrorNotification />
                  {/* {!navigator.onLine && <NoInternet />} */}
                </UserContextProvider>
              </MsalProvider>
            </Router>
          </header>
          <Footer />
        </ThemeProvider>
        {/* <ServiceWorkerWrapper /> */}
      </div>
    </I18nextProvider>
  );
}

export default App;
