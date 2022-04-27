import { functions } from "lodash";
import { request, requestMultipart, getFormData } from "../../utils/http";
import axios from "axios";

function getFollowerList(payload) {
  return request
    .get(`/users/user/follow/?following_user__id=${payload}`, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log(JSON.stringify(response));
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}

function getFollowingList(payload) {
  return request
    .get(`/users/user/follow/?user__id=${payload}`, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log(JSON.stringify(response));
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}

export const followerService = {
  getFollowerList,
  getFollowingList,
};
