// import React, { useContext, useEffect, useState, useMemo } from 'react';
import React, { useContext, useEffect } from 'react';
import { MsalProvider, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { InteractionStatus, PublicClientApplication } from '@azure/msal-browser';
import { loginRequest, msalConfig } from './utils/authConfig';
import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from 'react-router-dom';
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Redirect,
//   useLocation,
//   useHistory,
// } from 'react-router-dom';

import './assets/styles/App.css';

import TopBar from './parts/TopBar/TopBar';

import Footer from './parts/Footer/Footer';
import Login from './pages/Login/Login';
import Home_controlOwner from './pages/Home/Home_controlOwner';
//import Home_internalController from './pages/Home/Home_internalController';

import Home_InternalControl from './routes/InternalControl/InternalControl.component';
// import question from './parts/Assessments/question';

import { UserContext, UserContextProvider } from './context/userContext';

// import ServiceWorkerWrapper from './parts/ServiceWorkerWrapper/ServiceWorkerWrapper';
// import { MantineProvider } from '@mantine/core';
import dataService from './services/dataService';
import Question from './parts/Assessments/Question';

// User categories --> User Role
const userRole="Global Internal Control";
// const userRole="Zonal Internal Control";
// const userRole="Control Owner";
// const userRole="Control Oversight";

const Pages = () => {
  const location = useLocation();
  const history = useHistory();
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts, inProgress } = useMsal();

  const [userState, userDispatch] = useContext(UserContext);

  //const user_role = 'Control Owner';
  const user_role = 'Internal Controller';

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

          // //   dataService
          // //     .getMSGraphPhoto(response.accessToken)
          // //     .then((image) => {
          // //       if (image.type === 'image/jpeg')
          // //         userDispatch({ type: 'SET_PROFILE_PHOTO', payload: image });
          // //     })
          // //     .catch((err) => console.log(err));
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
        {!['/login'].includes(location?.pathname) && <TopBar userRole={userRole} />}
        {/* <Home /> */}
        <Switch>
          <Route
            path="/login"
            render={(props) => {
              return <Login />;
            }}
          />

          {user_role === 'Control Owner' ? (
            <Route exact path="/" component={Home_controlOwner} />
          ) : user_role === 'Internal Controller' ? (
            <Route exact path="/" component={Home_InternalControl} />
          ) : (
            <Route exact path="/" component={Home_controlOwner} />
          )}
          <Route exact path="/Assessments/:Assessment_id" component={Question} />
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
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default App;
