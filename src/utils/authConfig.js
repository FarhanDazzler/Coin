/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from '@azure/msal-browser';

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

export const msalConfig = {
  auth: {
    clientId: 'ba665ef9-b367-4e34-8b3f-1029b3422429', //clientid
    authority: `https://login.microsoftonline.com/cef04b19-7776-4a94-b89b-375c77a8f936`, //tenant id
    postLogoutRedirectUri: `${window.location.origin}/login`,
    redirectUri: `${window.location.origin}/login`,
    validateAuthority: true,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            // console.error(message);
            return;
          case LogLevel.Info:
            // console.info(message);
            return;
          case LogLevel.Verbose:
            // console.debug(message);
            return;
          case LogLevel.Warning:
            // console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  // scopes: ['User.Read'],
  scopes: ['User.Read'],
};
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  graphProfilePhotoEndpoint: 'https://graph.microsoft.com/v1.0/me/photo/$value',
};
// for Generating bearar Token for snow tickets
export const snowBackendRequest = {
  scopes: [process.env.REACT_APP_SNOW_BE_REQUEST],
};
// for generating bearar Token for powerbi
export const powerbiRequest = {
  // scopes: [`https://analysis.windows.net/powerbi/api/Report.Read.All`],
  scopes: [process.env.REACT_APP_POWERBI_SCOPE],
};
/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
