import axios from "axios";
import { useSelector } from "react-redux";
import { select } from "redux-saga/effects";
import { appConfig } from "../config/app";
import { store } from "../store";
//import { getCredentials } from './keyStorage'

const APP_PLATFORM = "Mobile";

export const request = axios.create({
  headers: {
    app_platform: APP_PLATFORM,
    app_version: 1,
  },
});

export const requestMultipart = axios.create({
  headers: {
    app_platform: APP_PLATFORM,
    app_version: 1,
  },
});
export function setUpHttpMultipartConfig() {
  requestMultipart.defaults.baseURL = appConfig.emailAuthAPIEndPoint;
  requestMultipart.defaults.timeout = 30000; //appConfig.defaultTimeout;
  requestMultipart.defaults.headers["Content-Type"] =
    "application/x-www-form-urlencoded";
  //axios.defaults.headers["Content-Type"] = "application/json";
  // todo add auth token from store
  store.subscribe(handleTokenChange);

  // debuggers
  // eslint-disable-next-line arrow-body-style
  request.interceptors.request.use((req) => {
    // console.log('[axios:request]', req)
    return req;
  });
  // eslint-disable-next-line arrow-body-style
  request.interceptors.response.use(
    (res) => {
      // console.log('[axios:response]', res)
      return res;
    },
    (error) => {
      console.warn("[axios:error.response]", error.response);
      console.warn("[axios:error]", error);
      return Promise.reject(error.response);
    }
  );

  //await updateAccessKey()
}

export function setupHttpConfig() {
  request.defaults.baseURL = appConfig.emailAuthAPIEndPoint;
  request.defaults.timeout = 30000; //appConfig.defaultTimeout;
  axios.defaults.headers["Content-Type"] = "application/json";
  // todo add auth token from store
  // console.log("THE TOKEN1:" + store.getState().authReducer.token);
  store.subscribe(handleTokenChange);
  // you can add more default values for http requests here
}

function handleTokenChange() {
  let token = store.getState().authReducer.token;
  axios.defaults.headers.common["Authorization"] = "Token " + token;
  // console.log("THE TOKEN:" + token);
}

/*********|   method to generate form data object from json object  |***********/
export function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}
