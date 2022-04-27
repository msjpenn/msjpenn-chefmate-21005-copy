import { request, requestMultipart, getFormData } from "../../utils/http";
import axios from "axios";
function doGetGroceriesList(id) {
  // console.log("grocery id",id);
  return request
    .get(`/grocery/?user__id=${id}`, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then((res) => {
      console.log("resresresres", res.data);
      let result = JSON.parse(JSON.stringify(res.data));
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
}

function doDeleteGroceriesListItem(id) {
  return request
    .delete(`/grocery/${id}/`, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then((res) => {
      let result = JSON.parse(JSON.stringify(res.data));
      return result;
    })
    .catch((err) => {
      throw err;
    });
}

function doPostGroceriesListItem(payload) {
  return request
    .post(`/grocery/`, payload, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then((res) => {
      let result = JSON.parse(JSON.stringify(res.data));
      return result;
    })
    .catch((err) => {
      throw err;
    });
}

function doUpdateGroceryItem(payload) {
  return request
    .patch(`/grocery/${payload.id}/`, payload, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then((res) => {
      let result = JSON.parse(JSON.stringify(res.data));
      return result;
    })
    .catch((err) => {
      throw err;
    });
}

function deleteAllGroceries(id) {
  return request
    .delete(`/grocery/delete_all/?user__id=${id}`, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then((res) => {
      let result = JSON.parse(JSON.stringify(res.data));
      return result;
    })
    .catch((err) => {
      throw err;
    });
}

export const groceriesServices = {
  doGetGroceriesList,
  doDeleteGroceriesListItem,
  doPostGroceriesListItem,
  doUpdateGroceryItem,
  deleteAllGroceries,
};
