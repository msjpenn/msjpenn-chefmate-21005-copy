import * as types from "./constants";

export const doGetNotificationsListSuccess = (response) => ({
  type: types.GET_NOTIFICATIONS_LIST_SUCCESS,
  payload: response?.results,
});

export const doGetNotificationsList = () => ({
  type: types.GET_NOTIFICATIONS_LIST,
});

export const turnOffBell = () => ({
  type: types.TURN_OFF_BELL,
});
