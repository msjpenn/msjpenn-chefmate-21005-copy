import * as types from "./constants";

export const doLogin = (login, password) => ({
  type: types.DO_LOGIN,
  login,
  password,
});

export const doLoginSucceeded = (response) => ({
  type: types.DO_LOGIN_SUCCEEDED,
  response,
});

export const doLoginFailed = (error) => ({
  type: types.DO_LOGIN_FAILED,
  error,
});

export const doFBLogin = (token) => ({
  type: types.DO_FBLOGIN,
  token,
});

export const doFBLoginSucceeded = (response) => ({
  type: types.DO_FBLOGIN_SUCCEEDED,
  response,
});

export const doFBLoginFailed = (error) => ({
  type: types.DO_FBLOGIN_FAILED,
  error,
});

export const doGoogleLogin = (token) => ({
  type: types.DO_GOOGLELOGIN,
  token,
});

export const doGoogleLoginSucceeded = (response) => ({
  type: types.DO_GOOGLELOGIN_SUCCEEDED,
  response,
});

export const doGoogleLoginFailed = (error) => ({
  type: types.DO_GOOGLELOGIN_FAILED,
  error,
});

export const doAppleLogin = (payload) => ({
  type: types.DO_APPLELOGIN,
  payload,
});

export const doAppleLoginSucceeded = (response) => ({
  type: types.DO_APPLELOGIN_SUCCEEDED,
  response,
});

export const doAppleLoginFailed = (error) => ({
  type: types.DO_APPLELOGIN_FAILED,
  error,
});

export const doRegister = (login, password) => ({
  type: types.DO_REGISTER,
  login,
  password,
});

export const doRegisterSucceeded = (response) => ({
  type: types.DO_REGISTER_SUCCEEDED,
  response,
});

export const doRegisterFailed = (error) => ({
  type: types.DO_REGISTER_FAILED,
  error,
});

export const doPwdReset = (email) => ({
  type: types.DO_PWDRESET,
  email,
});
export const doPwdResetSucceeded = (response) => ({
  type: types.DO_PWDRESET_SUCCEEDED,
  response,
});
export const doPwdResetFailed = (error) => ({
  type: types.DO_PWDRESET_FAILED,
  error,
});

export const doGetTerms = () => ({
  type: types.DO_GET_TERMS,
});
export const doGetTermsSucceeded = (response) => ({
  type: types.DO_GET_TERMS_SUCCEEDED,
  response,
});
export const doGetTermsFailed = (error) => ({
  type: types.DO_GET_TERMS_FAILED,
  error,
});

export const doLogout = () => ({
  type: types.DO_LOGOUT,
});

export const doAddFCMDeviceAction = (payload) => ({
  type: types.DO_ADD_FCM_DEVICE,
  payload,
});
