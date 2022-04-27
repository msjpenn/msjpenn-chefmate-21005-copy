import axios from "axios";
import { request } from "../../utils/http";

function doGetNotifications() {
  return request
    .get(`notifications/`, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      // let result = JSON.parse(JSON.stringify(response.data));
      return response;
    })
    .catch(function (error) {
      throw error;
    });
}

function markAsRead(payload) {
  return request
    .patch(
      `notifications/${payload.id}/`,
      { is_read: true },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("df", result);
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

export const notificationService = {
  doGetNotifications,
  markAsRead,
};
