import { request } from "../../utils/http";
import axios from "axios";

function doLogin(payload) {
  console.log(payload);
  return request
    .post("/api/v1/login/", {
      username: payload.email,
      password: payload.password,
    })
    .then(function (response) {
      return JSON.parse(JSON.stringify(response.data));
    })
    .catch(function (error) {
      throw error;
    });
}

function doAddFCMDevice(payload) {
  console.log(payload);
  return request
    .post(
      "/api/v1/devices/",
      {
        registration_id: payload.registration_id,
        active: true,
        type: Platform.OS,
        user: payload.user,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      return JSON.parse(JSON.stringify(response.data));
    })
    .catch(function (error) {
      throw error;
    });
}

function doRegister(payload) {
  let login = payload["email"];
  let password = payload["password"];
  let name = payload["name"];
  return request
    .post("/api/v1/signup/", {
      email: login,
      password: password,
      name: name,
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      console.log(error.response);
      throw error;
    });
}

function doPwdReset(payload) {
  let email = payload["email"];

  return request
    .post("/rest-auth/password/reset/", {
      email: email,
    })
    .then(function (response) {
      let result = JSON.stringify(response.data);
      console.log("PWD RESET: " + result);
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doPasswordReset(payload) {
  let email = payload.email;

  return request
    .post("/api/v1/password-reset/", {
      email: email,
    })
    .then(function (response) {
      let result = JSON.stringify(response.data);
      console.log("PWD RESET: " + result);
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doGetTerms(payload) {
  return request
    .get("/users/terms/conditions")
    .then(function (response) {
      let result = JSON.stringify(response.data);
      console.log("Get Terms: " + result);
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doAppleLogin(payload) {
  console.log("doAppleLogin", payload);
  return request.post("/users/apple-login/", {
    email: payload.email,
    apple_id: payload.apple_id,
    token: payload.token,
    givenName: payload.givenName,
    familyName: payload.familyName,
  });
}

function doGoogleLogin(payload) {
  return request
    .post("/users/google-login/", {
      token: payload.token,
    })
    .then(function (response) {
      let result = response.data;
      console.log("doGoogleLogin: " + JSON.stringify(result));
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doFacebookLogin(payload) {
  return request
    .post("/users/facebook-login/", {
      token: payload.token,
    })
    .then(function (response) {
      let result = response.data;
      console.log("doFacebookLogin: " + JSON.stringify(result));
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doPwdChange(payload) {
  let data = {
    new_password1: payload["new_password1"],
    new_password2: payload["new_password2"],
  };

  return request
    .post("/rest-auth/password/change/", data, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.stringify(response.data);
      console.log("PWD RESET: " + result);
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

export const customApiService = {
  doLogin,
  doRegister,
  doPwdReset,
  doGetTerms,
  doAppleLogin,
  doGoogleLogin,
  doFacebookLogin,
  doPwdChange,
  doPasswordReset,
  doAddFCMDevice,
};
