import { put, call, all, spawn, takeEvery } from "redux-saga/effects";
import { customApiService } from "./services";
import * as types from "./constants";
import * as actions from "./actions";
import Toast from "react-native-simple-toast";

// import * as StoreUtil from "../storeUtil"

function* doUploadImageWorker(action) {
  try {
    // StoreUtil.logAction("UploadImage", action)
    const result = yield call(customApiService.doUploadImage, action);
    yield put(actions.doUploadImageSucceeded(result));
    Toast.show("Successfully changed profile picture!", Toast.LONG);
  } catch (err) {
    // StoreUtil.logError("UploadImage", err);
    yield put(actions.doUploadImageFailed(err));
  }
}

function* doUpdateUserProfile(action) {
  try {
    const result = yield call(customApiService.doUpdateProfile, action);
    console.log("user data=>", result);
    yield put(actions.doUpdateProfileSuccess(result));
  } catch (error) {
    yield put(actions.doUpdateProfileFailed(err));
  }
}

function* doUploadImageWatcher() {
  yield takeEvery(types.DO_UPLOADIMAGE, doUploadImageWorker);
}
function* doUpdateProfileWatcher() {
  yield takeEvery(types.DO_CHANGE_PROFILE_DETAILS, doUpdateUserProfile);
}

function* doResetUsernameWorker(action) {
  try {
    // StoreUtil.logAction("ResetUsername", action)
    const result = yield call(customApiService.doResetUsername, action);
    yield put(actions.doResetUsernameSucceeded(result));
  } catch (err) {
    // StoreUtil.logError("ResetUsername", err);
    yield put(actions.doResetUsernameFailed(err));
  }
}
function* doResetUsernameWatcher() {
  yield takeEvery(types.DO_RESETUSERNAME, doResetUsernameWorker);
}

function* doEditPhoneWorker(action) {
  try {
    // StoreUtil.logAction("EditPhone", action)
    const result = yield call(customApiService.doEditPhone, action);
    yield put(actions.doEditPhoneSucceeded(result));
  } catch (err) {
    // StoreUtil.logError("EditPhone", err);
    yield put(actions.doEditPhoneFailed(err));
  }
}
function* doEditPhoneWatcher() {
  yield takeEvery(types.DO_EDITPHONE, doEditPhoneWorker);
}

function* doGetUsersByPhoneNumbersWorker(action) {
  try {
    // StoreUtil.logAction("GetUsersByPhoneNumbers", action)
    const result = yield call(customApiService.doGetAllUsers, action);
    yield put(
      actions.doGetUsersByPhoneNumbersSucceeded(result, action.phoneNumbers)
    );
  } catch (err) {
    // StoreUtil.logError("GetUsersByPhoneNumbers", err);
    yield put(actions.doGetUsersByPhoneNumbersFailed(err));
  }
}
function* doGetUsersByPhoneNumbersWatcher() {
  yield takeEvery(
    types.DO_GETUSERSBYPHONENUMBERS,
    doGetUsersByPhoneNumbersWorker
  );
}

function* doGetCategoriesWorker(action) {
  try {
    // StoreUtil.logAction("GetCategories", action)
    const result = yield call(customApiService.doGetCategories, action);
    yield put(actions.doGetCategoriesSucceeded(result));
  } catch (err) {
    // StoreUtil.logError("GetCategories", err);
    yield put(actions.doGetCategoriesFailed(err));
  }
}
function* doGetCategoriesWatcher() {
  yield takeEvery(types.DO_GET_CATEGORIES, doGetCategoriesWorker);
}

function* doUpdateCategoriesWorker(action) {
  try {
    // StoreUtil.logAction("UpdateCategories", action)
    const result = yield call(customApiService.doUpdateCategories, action);
    yield put(actions.doUpdateCategoriesSucceeded(result, action.categoryIds));
  } catch (err) {
    // StoreUtil.logError("UpdateCategories", err);
    yield put(actions.doUpdateCategoriesFailed(err));
  }
}
function* doUpdateCategoriesWatcher() {
  yield takeEvery(types.DO_UPDATE_CATEGORIES, doUpdateCategoriesWorker);
}

function* doEditMeasurementWorker(action) {
  try {
    // StoreUtil.logAction("EditMeasurement", action)
    const result = yield call(
      customApiService.doEditMeasurement,
      action.payload
    );
    console.log("doEditMeasurement result", result);
    yield put(actions.doEditMeasurementSucceeded(result));
    Toast.show("Measurement system saved successfully", Toast.LONG);
  } catch (err) {
    // StoreUtil.logError("EditMeasurement", err);
    yield put(actions.doEditMeasurementFailed(err));
  }
}
function* doEditMeasurementWatcher() {
  yield takeEvery(types.DO_EDITMEASUREMENT, doEditMeasurementWorker);
}

function* doFollowAllUsersWorker(action) {
  try {
    // StoreUtil.logAction("FollowAllUsers", action)
    const result = yield call(customApiService.doFollowAllUsers, action);
    yield put(actions.doFollowAllUsersSucceeded(result));
  } catch (err) {
    // StoreUtil.logError("FollowAllUsers", err);
    yield put(actions.doFollowAllUsersFailed(err));
  }
}
function* doFollowAllUsersWatcher() {
  yield takeEvery(types.DO_FOLLOWALL, doFollowAllUsersWorker);
}

function* doFollowAllFBUsersWorker(action) {
  try {
    // StoreUtil.logAction("FollowAllFBUsers", action)
    const result = yield call(customApiService.doFollowAllUsers, action);
    yield put(actions.doFollowAllFBUsersSucceeded(result));
  } catch (err) {
    // StoreUtil.logError("FollowAllFBUsers", err);
    yield put(actions.doFollowAllFBUsersFailed(err));
  }
}
function* doFollowAllFBUsersWatcher() {
  yield takeEvery(types.DO_FOLLOWALLFB, doFollowAllFBUsersWorker);
}

function* doFollowUserWorker(action) {
  try {
    // StoreUtil.logAction("FollowUser", action)
    const result = yield call(customApiService.doFollowUser, action);
    yield put(actions.doFollowUserSucceeded(result, action.userIdToFollow));
  } catch (err) {
    // StoreUtil.logError("FollowUser", err);
    yield put(actions.doFollowUserFailed(err));
  }
}
function* doFollowUserWatcher() {
  yield takeEvery(types.DO_FOLLOWUSER, doFollowUserWorker);
}

function* doUnfollowUserWorker(action) {
  try {
    // StoreUtil.logAction("UnfollowUser", action)
    const result = yield call(customApiService.doUnfollowUser, action);
    yield put(actions.doUnfollowUserSucceeded(result));
  } catch (err) {
    // StoreUtil.logError("UnfollowUser", err);
    yield put(actions.doUnfollowUserFailed(err));
  }
}
function* doUnfollowUserWatcher() {
  yield takeEvery(types.DO_UNFOLLOWUSER, doUnfollowUserWorker);
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* profileRootSaga() {
  const sagas = [
    // Example watcher
    // getBalanceWatcher
    doUploadImageWatcher,
    doResetUsernameWatcher,
    doEditPhoneWatcher,
    doGetUsersByPhoneNumbersWatcher,
    doGetCategoriesWatcher,
    doUpdateCategoriesWatcher,
    doEditMeasurementWatcher,
    doFollowAllUsersWatcher,
    doFollowUserWatcher,
    doUnfollowUserWatcher,
    doFollowAllFBUsersWatcher,
    doUpdateProfileWatcher,
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
