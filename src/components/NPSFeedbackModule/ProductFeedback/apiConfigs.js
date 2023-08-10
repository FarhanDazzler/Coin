// export const API_ROOT_URL = process.env.REACT_APP_API_URL;
export const API_ROOT_URL = {
  dev: 'https://app-ds-ghq-productinsights-dev-e.azurewebsites.net',
  qa: 'https://app-ds-ghq-productinsights-qa-be.azurewebsites.net',
  prod: 'https://app-ds-ghq-productinsights-prod-be.azurewebsites.net',
};

function getApiRootUrl(env) {
  return API_ROOT_URL[env];
}

export const urls = {
  submitProductFeedbackURL: `/api/feedback/submit`,
  checkProductFeedbackAllowedURL: `/api/feedback/allowed`,
};

export function getUrl(env, url) {
  return `${getApiRootUrl(env)}${urls[url]}`;
}
