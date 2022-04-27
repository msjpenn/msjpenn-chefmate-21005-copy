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
import { customerIOService } from "./services";
import AsyncStorage from "@react-native-community/async-storage";
import { Platform } from "react-native";

async function getDeviceId() {
  try {
    const fcmToken = await AsyncStorage.getItem("fcmToken");

    return fcmToken;
  } catch (error) {
    console.log("AsyncStorage error", error);
  }
}

function* doAddCustomerIO(action) {
  try {
    const device_id = yield call(getDeviceId);

    const result = yield call(customerIOService.addCustomerIO, action.payload);
    console.log("results", result);

    console.log("getDeviceId b4");

    const payload = {
      device_id: device_id,
      platform: Platform.OS,
      customer_id: action.payload.id,
    };
    console.log("getDeviceId after payload", payload);

    const resultDevice = yield call(
      customerIOService.addCustomerIODevice,
      payload
    );
    console.log("resultDevice", resultDevice);
    // yield put(actions.doPostRecipeSuccess(result));
  } catch (err) {
    console.log("err", err);
    // yield put(actions.doPostRecipeError(err));
  }
}

function* doAddCustomerIOWatcher() {
  yield takeEvery(types.ADD_CUSTOMER_IO, doAddCustomerIO);
}

export default function* customerIORootSaga() {
  const sagas = [doAddCustomerIOWatcher];
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
