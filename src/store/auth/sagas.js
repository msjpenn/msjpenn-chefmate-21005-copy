import { put, call, all, spawn, takeEvery } from "redux-saga/effects";
import { customApiService } from "./services";
import * as types from "./constants";
import * as actions from "./actions";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-simple-toast";
import { Platform } from "react-native";

const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
};

async function getDeviceId() {
  try {
    const fcmToken = await AsyncStorage.getItem("fcmToken");

    return fcmToken;
  } catch (error) {
    console.log("AsyncStorage error", error);
  }
}

function* doLoginWorker(action) {
  try {
    // StoreUtil.logAction("Login", action);
    const result = yield call(customApiService.doLogin, action);
    console.log("doLoginWorker", result);
    _storeData("token", result?.token);
    yield put(actions.doLoginSucceeded(result));
  } catch (err) {
    // StoreUtil.logError("ResetUsername", err);
    yield put(actions.doLoginFailed(err));
  }
}
function* doLoginWatcher() {
  yield takeEvery(types.DO_LOGIN, doLoginWorker);
}

function* doAddFCMDeviceWorker(action) {
  console.log("action", action);
  try {
    const device_id = yield call(getDeviceId);

    const payload = {
      registration_id: device_id,
      active: true,
      type: Platform.OS,
      user: action.payload.user,
    };
    console.log("action", action, payload);

    const result = yield call(customApiService.doAddFCMDevice, payload);
  } catch (err) {}
}
function* doAddFCMDeviceWatcher() {
  yield takeEvery(types.DO_ADD_FCM_DEVICE, doAddFCMDeviceWorker);
}

function* doFBLoginWorker(action) {
  try {
    // StoreUtil.logAction("FBLogin", action);
    const result = yield call(customApiService.doFacebookLogin, action);
    yield put(actions.doFBLoginSucceeded(result?.data));
  } catch (err) {
    Toast.show(`Facebook login failed`, Toast.LONG);
    yield put(actions.doFBLoginFailed(err));
  }
}
function* doFBLoginWatcher() {
  yield takeEvery(types.DO_FBLOGIN, doFBLoginWorker);
}

function* doGoogleLoginWorker(action) {
  try {
    // StoreUtil.logAction("GoogleLogin", action);
    const result = yield call(customApiService.doGoogleLogin, action);
    console.log("user data==>", result);
    Toast.show("Successfully logged in!", Toast.LONG);
    yield put(actions.doGoogleLoginSucceeded(result?.data));
  } catch (err) {
    // StoreUtil.logError("GoogleLogin", err);
    yield put(actions.doGoogleLoginFailed(err));
  }
}
function* doGoogleLoginWatcher() {
  yield takeEvery(types.DO_GOOGLELOGIN, doGoogleLoginWorker);
}

function* doAppleLoginWorker(action) {
  try {
    console.log("user action==>", action);

    const result = yield call(customApiService.doAppleLogin, action.payload);
    console.log("user data==>", result);
    Toast.show("Successfully logged in!", Toast.LONG);
    yield put(actions.doAppleLoginSucceeded(result?.data?.data));
  } catch (err) {
    yield put(actions.doAppleLoginFailed(err));
  }
}
function* doAppleLoginWatcher() {
  yield takeEvery(types.DO_APPLELOGIN, doAppleLoginWorker);
}

function* doRegisterWorker(action) {
  try {
    // StoreUtil.logAction("Register", action);
    const result = yield call(customApiService.doRegister, action);
    yield put(actions.doRegisterSucceeded(result));
    Toast.show("Successfully logged in!", Toast.LONG);
  } catch (err) {
    Toast.show(`${err.data.email[0]}`, Toast.LONG);
    yield put(actions.doRegisterFailed(err));
  }
}
function* doRegisterWatcher() {
  yield takeEvery(types.DO_REGISTER, doRegisterWorker);
}

function* doPwdResetWorker(action) {
  try {
    // StoreUtil.logAction("PwdReset", action);
    const result = yield call(customApiService.doPwdReset, action);
    yield put(actions.doPwdResetSucceeded(result));
  } catch (err) {
    // StoreUtil.logError("PwdReset", err);
    yield put(actions.doPwdResetFailed(err));
  }
}
function* doPwdResetWatcher() {
  yield takeEvery(types.DO_PWDRESET, doPwdResetWorker);
}

function* doGetTermsWorker(action) {
  try {
    // StoreUtil.logAction("GetTerms", action);
    const result = yield call(customApiService.doGetTerms, action);
    yield put(actions.doGetTermsSucceeded(result));
  } catch (err) {
    // StoreUtil.logError("GetTerms", err);
    yield put(actions.doGetTermsFailed(err));
  }
}
function* doGetTermsWatcher() {
  yield takeEvery(types.DO_GET_TERMS, doGetTermsWorker);
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* authRootSaga() {
  const sagas = [
    // Example watcher
    // getBalanceWatcher
    doLoginWatcher,
    doRegisterWatcher,
    doPwdResetWatcher,
    doGetTermsWatcher,
    doFBLoginWatcher,
    doGoogleLoginWatcher,
    doAddFCMDeviceWatcher,
    doAppleLoginWatcher,
  ];
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}
