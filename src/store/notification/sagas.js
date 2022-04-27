import {
  put,
  call,
  all,
  spawn,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import * as types from "./constants";
import * as actions from "./actions";
import { notificationService } from "./services";

function* doGetNotificationList() {
  try {
    const result = yield call(notificationService.doGetNotifications);
    console.log("results", result);
    yield put(actions.doGetNotificationsListSuccess(result.data));
  } catch (err) {
    console.error("err", err);
  }
}

function* doGetNotificationListWatcher() {
  yield takeEvery(types.GET_NOTIFICATIONS_LIST, doGetNotificationList);
}

export default function* notificationRootSaga() {
  const sagas = [doGetNotificationListWatcher];
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
