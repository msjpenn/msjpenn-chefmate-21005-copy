/* eslint-disable prettier/prettier */
import apiReducer from "./reducers";
import customReducer from "./custom/reducers";
import recipeReducer from "./recipe/reducers";
import recipeCreationReducer from "./recipeCreation/reducers";
// import recipeRecreationReducer from "./recipeRecreation/reducers";
import groceryReducer from "./groceries/reducers";
import draftReducer from "./drafts/reducers";

import authReducer from "./auth/reducers";
import profileReducer from "./profile/reducers";
import customerIOReducer from "./customerio/reducers";
import notificationReducer from "./notification/reducers";

import rootSaga from "./sagas";
import customRootSaga from "./custom/sagas";
import authRootSaga from "./auth/sagas";
import profileRootSaga from "./profile/sagas";
import recipeRootSaga from "./recipe/sagas";
import recipeCreationRootSaga from "./recipeCreation/sagas";
import groceriesRootSaga from "./groceries/sagas";
import customerIORootSaga from "./customerio/sagas";
import notificationRootSaga from "./notification/sagas";

import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
// import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
// import recipeRecreationRootSaga from "./recipeRecreation/sagas";

const sagaMiddleware = createSagaMiddleware();

/**
 * this app uses React Native Debugger, but it works without it
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [sagaMiddleware /** more middlewares if any goes here */];

// if (__DEV__) middlewares.push(createLogger());
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["authReducer", "draftReducer"],
  timeout: null,
  blacklist: [],
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    apiReducer: apiReducer,
    customReducer: customReducer,
    authReducer: authReducer,
    profileReducer: profileReducer,
    recipeReducer: recipeReducer,
    recipeCreationReducer: recipeCreationReducer,
    groceryReducer: groceryReducer,
    draftReducer: draftReducer,
    customerIOReducer: customerIOReducer,
    notificationReducer: notificationReducer,
  })
);

/* const store = createStore(
  combineReducers({
    apiReducer: apiReducer,
    customReducer: customReducer,
    authReducer: authReducer,
    profileReducer: profileReducer,
    recipeReducer: recipeReducer,
    recipeCreationReducer: recipeCreationReducer,
  }),
  composeEnhancers(applyMiddleware(...middlewares))
); */
const store = createStore(
  persistedReducer,
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
);

let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
sagaMiddleware.run(customRootSaga);
sagaMiddleware.run(authRootSaga);
sagaMiddleware.run(profileRootSaga);
sagaMiddleware.run(recipeRootSaga);
sagaMiddleware.run(recipeCreationRootSaga);
sagaMiddleware.run(groceriesRootSaga);
sagaMiddleware.run(customerIORootSaga);
sagaMiddleware.run(notificationRootSaga);

// sagaMiddleware.run(recipeRecreationRootSaga);
export { store, persistor };
