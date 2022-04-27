export const logAction = (prefix, action) => {
  // console.log(prefix + " ACTION:" + JSON.stringify(action))
};

export const logError = (prefix, err) => {
  //console.log(prefix + " REQUEST: ");
  //console.log(err.request);
  console.log(prefix + " ERROR RESPONSE: ");
  if (err.response) {
    console.log(err.response);
  } else {
    console.log(err);
  }
};

export const getErrorMessage = (action) => {
  return action.error.response != null
    ? action.error.response.data
    : action.error.message;
};
