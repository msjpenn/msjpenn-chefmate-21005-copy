import { request } from "../../utils/http";
import axios from "axios";

function addCustomerIO(payload) {
  return request
    .post(
      "/api/v1/customer-io/",
      {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        plan: "premium",
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
      throw error;
    });
}

function addCustomerIODevice(payload) {
  console.log(payload);
  console.log(payload.device_id);
  return request
    .post(
      "/api/v1/customer-io-device/",
      {
        device_id: payload.device_id,
        platform: payload.platform,
        customer_id: payload.customer_id,
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
      throw error;
    });
}

export const customerIOService = {
  addCustomerIO,
  addCustomerIODevice,
};
