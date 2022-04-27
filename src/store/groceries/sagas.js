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
import { groceriesServices } from "./services";

function* doGetGroceyList(action) {
  try {
    const result = yield call(
      groceriesServices.doGetGroceriesList,
      action.payload
    );
    // console.log('results', result);
    yield put(actions.doGetGroceriesListSuccess(result));
  } catch (err) {
    console.log("err", err);
    yield put(actions.doGetGroceriesListFail(err));
  }
}

function* doPostGroceyListItem(action) {
  try {
    const result = yield call(
      groceriesServices.doPostGroceriesListItem,
      action.payload
    );
    // console.log('results', result);
    yield put(actions.doPostGroceriesListItemSuccess(result));
  } catch (err) {
    console.log("err", err.response);
    yield put(actions.doPostGroceriesListItemFails(err));
  }
}

function* doGetGroceriesListWatcher() {
  yield takeEvery(types.GET_GROCERIES_LIST, doGetGroceyList);
}

function* doPostGroceriesListWatcher() {
  yield takeEvery(types.POST_GROCERIES_LIST_ITEM, doPostGroceyListItem);
}

export default function* groceriesRootSaga() {
  const sagas = [doGetGroceriesListWatcher, doPostGroceriesListWatcher];
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
