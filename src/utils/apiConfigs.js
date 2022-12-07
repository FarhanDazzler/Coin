export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  graphProfilePhotoEndpoint: 'https://graph.microsoft.com/v1.0/me/photo/$value',
};

const API_ROOT_URLS = {
  // prod: `http://localhost:5000`,
  prod: `prod-url-here`,
  // dev: `http://localhost:5000`,
  dev: `dev-url-here`,
};

export const API_ROOT_URL_PREFIX =
  process.env.REACT_APP_STAGE === 'prod' ? API_ROOT_URLS.prod : API_ROOT_URLS.dev;

export const urls = {};
