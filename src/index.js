import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './redux/store';
import './assets/styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datetime/css/react-datetime.css';
import './App.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const initialState = {};

const store = configureStore(initialState);

let deferredPrompt;

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default browser install prompt
  e.preventDefault();
  // Store the event for later use
  deferredPrompt = e;
  // Show a custom install button or prompt
  // You can show this button wherever you like in your UI
  // For example, you can display it as an "Add to Home Screen" button
  // and call deferredPrompt.prompt() when clicked.
});

// Function to show the custom install button
function showInstallButton() {
  const installButton = document.getElementById('install-button');
  if (installButton) {
    installButton.style.display = 'block';
    installButton.addEventListener('click', () => {
      // Prompt the user to install the app
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the installation');
          } else {
            console.log('User declined the installation');
          }
          // Reset the deferredPrompt variable
          deferredPrompt = null;
        });
      }
    });
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {console.log(store.replaceReducer)}
      <ConnectedRouter history={history}>
        <button id="install-button" style={{ display: 'none' }}>
          Add to Home Screen
        </button>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register({
//   onUpdate: (e) => {
//     const { waiting: { postMessage = null } = {}, update } = e || {};
//     if (postMessage) {
//       postMessage({ type: 'SKIP_WAITING' });
//     }
//     update().then(() => {
//       window.location.reload();
//     });
//   },
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
