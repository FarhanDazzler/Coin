export const getSimplifiedError = (error, field) => {
  if (error.response?.status === 500) return 'Please contact support team.';
  const errorResponse = error.response && error.response.data;
  if (!errorResponse) {
    return 'Something went wrong, please try again later';
  }
  return getErrors(errorResponse);
};

const getErrorMessage = (error) => {
  if (!Object.keys(error).length || typeof error === 'string') return error;
  let errors = [];
  if (Array.isArray(error) && error.length) {
    errors = [error[0].message, ...error];
  } else {
    Object.keys(error).forEach((e) => {
      return (errors = [...errors, error[e]]);
    });
  }

  return errors.filter((e) => e);
};

const getErrors = (errorResponse) => {
  let errors = [];
  Object.keys(errorResponse).forEach((error) => {
    const val = getErrorMessage(errorResponse[error]) || {};
    return (errors = [...errors, ...val]);
  });
  return errors;
};
