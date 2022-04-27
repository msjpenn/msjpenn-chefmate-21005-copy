import {
  request,
  setupHttpConfig,
  requestMultipart,
  getFormData,
} from "../../utils/http";
import axios from "axios";

function doUploadImage(payload) {
  let email = payload["email"];
  let image = payload["image"];
  // console.log("image", image);
  // const formData = new FormData();
  // formData.append("email", email);
  // formData.append("image", {
  //   uri: Platform.OS === "android" ? image : image.replace("file://", ""),
  //   type: "File",
  //   name: image.substr(image.lastIndexOf("/"), image.length),
  // });
  console.log("axios1");

  const data = getFormData(payload);
  console.log("axios2");

  return request
    .post("/users/upload/image", payload, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("Upload Image: " + result);
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doResetUsername(payload) {
  let userId = payload["userId"];
  let username = payload["username"];
  return request
    .put(
      `/users/reset/username/${userId}/`,
      {
        username: username,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("Reset Username: " + result);
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doEditPhone(payload) {
  let email = payload["email"];
  let phone = payload["phone"];
  return request
    .post(
      "/users/phone/number",
      {
        email: email,
        phone_number: phone,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("Reset EditPhone: " + result);
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function editPushNotifications(payload) {
  let email = payload["email"];
  let push_notifications = payload["push_notifications"];
  return request
    .post(
      "/users/push",
      {
        email: email,
        push_notifications: push_notifications,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("Reset EditPhone: " + result);
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doGetUsersByPhoneNumbers(payload) {
  console.log(JSON.stringify(payload));
  return request
    .post(
      "/users/friends",
      {
        user_id: payload.userId,
        phone_number: payload.phoneNumbers,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      console.log("RESPP: " + JSON.stringify(response));
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("doGetUsersByPhoneNumbers: " + result);
      return result;
    })
    .catch(function (error) {
      console.log("ERRR: " + error);
      console.log(JSON.stringify(error.response));
      throw error;
    });
}

function doGetAllUsers(payload) {
  console.log(JSON.stringify(payload));
  return request
    .get("/users/all-users", {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doGetCategories(payload) {
  let email = payload["email"];
  return request
    .get("/users/category", {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("doGetCategories: " + result);
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doUpdateCategories(payload) {
  let userId = payload["userId"];
  let categoryIds = payload["categoryIds"];
  return request
    .post(
      "/users/multi/category",
      {
        user_id: userId,
        category_id_list: categoryIds,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("doUpdateCategories: " + result);
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doEditMeasurement(payload) {
  console.log("doEditMeasurement service", payload);
  return request
    .post(
      `/users/measurement`,
      {
        email: payload.email,
        measurement_system: payload.measurement_system,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("doEditMeasurement: " + result);
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doFollowAllUsers(payload) {
  console.log(JSON.stringify(payload));
  return request
    .post(
      "/users/follow/all",
      {
        user_id: payload.userId,
        follow_user_id_list: payload.allUserIdsToFollow,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}

function doFollowUser(payload) {
  console.log(JSON.stringify(payload));
  return request
    .post(
      "/users/user/follow/",
      {
        user_id: payload.userId,
        following_user_id: payload.userIdToFollow,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}

function doUnfollowUser(payload) {
  console.log(JSON.stringify(payload));
  return request
    .delete(
      "/users/unfollow",
      {
        user_id: payload.userId,
        following_user_id: payload.userIdToUnfollow,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}

function doGetProfile(payload) {
  console.log(JSON.stringify(payload));
  return request
    .get(
      "/users/profile",
      {
        user_id: payload.userId,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}

function doGetFriendProfile(payload) {
  return request
    .get(`/profile/${payload}/`, {
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

function doPostFollowUnfollowRequest(payload) {
  return request
    .post(`/users/user/follow/`, payload, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log(JSON.stringify(payload));
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}
function unfollowRequest(payload) {
  return request
    .delete(`/users/user/follow/${payload.id}/`, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log(JSON.stringify(payload));
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}

function doGetRecipeFeed(payload) {
  let queryParam = "?";
  if (payload != null && payload.userId != null) {
    queryParam = queryParam + "user__id=" + payload.userId;
  }
  console.log(queryParam);
  return request
    .get("/recipe/" + queryParam, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("result feed==>", response);
      return result;
    })
    .catch(function (error) {
      console.log("GOT error:" + JSON.stringify(error));
      console.log(error);
      throw error;
    });
}

function doGetOwnProfile(payload) {
  return request
    .get(`/profile/self/profile/${payload}/`, {
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

export function doFeedback(payload) {
  return request
    .post(`/feedback/`, payload, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log(JSON.stringify(payload));
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}

export function doUpdateProfile(payload) {
  let data = {
    email: payload.email,
    name: payload.name,
    username: payload.username,
  };
  return request
    .patch(`/users/user/profile/${payload.id}/`, data, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log(JSON.stringify(payload));
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}

function doLogOut() {
  return request
    .post(
      "/rest-auth/logout/",
      {},
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then((res) => {
      let result = JSON.parse(JSON.stringify(res.data));
      console.log("resultresultresult", result);
      return result;
    })
    .catch((e) => {
      throw e;
    });
}

export const customApiService = {
  doUploadImage,
  doResetUsername,
  doEditPhone,
  doGetCategories,
  doUpdateCategories,
  doEditMeasurement,
  doGetUsersByPhoneNumbers,
  doGetAllUsers,
  doFollowAllUsers,
  doFollowUser,
  doUnfollowUser,
  doGetProfile,
  doGetFriendProfile,
  doPostFollowUnfollowRequest,
  unfollowRequest,
  doGetRecipeFeed,
  doGetOwnProfile,
  doFeedback,
  doUpdateProfile,
  doLogOut,
  editPushNotifications,
};
