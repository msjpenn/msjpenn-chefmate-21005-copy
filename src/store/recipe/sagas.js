/* eslint-disable prettier/prettier */
import { put, call, all, spawn, takeEvery } from "redux-saga/effects"
// import { customApiService } from "./services"
import * as types from "./constants"
import * as actions from "./actions"

const delay = time => new Promise(resolve => setTimeout(resolve, time));

function* doAddSectionWorker(action) {
 try{
  // yield call(delay, 2000);
  yield put(actions.doAddSectionSucceeded({}));
 }catch(err){
  console.log(err);
 }
}
function* doAddSectionWatcher() {
  yield takeEvery(types.DO_ADD_SECTION, doAddSectionWorker)
}



// function* doRegisterWorker(action) {
//   try {
//     const result = yield call(customApiService.doRegister, action);
//     yield put(actions.doRegisterSucceeded(result));
//   } catch (err) {
//     yield put(actions.doRegisterFailed(err));
//   }
// }
// function* doRegisterWatcher() {
//   yield takeEvery(types.DO_REGISTER, doRegisterWorker)
// }

// function* doPwdResetWorker(action) {
//   try {
//     const result = yield call(customApiService.doPwdReset, action);
//     yield put(actions.doPwdResetSucceeded(result));
//   } catch (err) {
//     yield put(actions.doPwdResetFailed(err));
//   }
// }
// function* doPwdResetWatcher() {
//   yield takeEvery(types.DO_PWDRESET, doPwdResetWorker)
// }




// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* recipeRootSaga() {
  const sagas = [
      // Example watcher
      // getBalanceWatcher
      //doAddSectionWatcher,
    //   doRegisterWatcher,
    //   doPwdResetWatcher
  ]
  yield all(
    sagas.map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga)
            break
          } catch (e) {
            console.log(e)
          }
        }
      })
    )
  )
}
