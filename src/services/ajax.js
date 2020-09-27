import axios from 'axios';
import React from "react";
import { message } from "antd";
import config from "./../config";
import {getLocation} from "less/lib/less/utils";

const { BASE_URL } = config;

let tokenInProgress = false;
// * GET, POST, DELETE, UPDATE
const initialToken = localStorage.getItem("token");
if (initialToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${initialToken}`;
}

const checkToken = new Promise((resolve, reject) => {
  if (localStorage.getItem("access_token")) {
    axios.defaults.headers.common[
        "Authorization"
        ] = `Bearer ${localStorage.getItem("access_token")}`;
    resolve(true);
  } else {
    axios.get(`${BASE_URL}/`).then(response => {
      const { data } = response;
      if (response.data.success) {
        localStorage.setItem("access_token", data.data.token);
        axios.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${localStorage.getItem("access_token")}`;
      }
      resolve(true);
    });
  }
});

const apiGet = ({ path, params, headers, cb, err }) => {
  checkToken.then(() => {
    axios
        .get(`${BASE_URL}${path}`, { params })
        .then(response => {
          if (response.status === 200 && cb) {
            cb(response)
          } else {
            if (err) {
              err(response.error);
            }
          }
        })
        .catch(function (error) {
          if (
              config.DEV_MODE ||
              (error && error.response && error.response.status === 404)
          ) {
            if (err) {
              err(error.response);
            }
            message.error("Connection Error!");
            return;
          }
          if (error && error.response && error.response.status === 401) {
            message.warning(
                "Unauthorised request! You will be logged out."
            );
            logout(() => {
              setTimeout(() => {
                window.location.reload(true);
              }, 300);
            });
            return;
          }
          message.warning("Something went wrong!!");
        });
  });
};

const apiPost = ({ path, params, headers, cb, err }) => {
  checkToken.then(() => {
    axios
        .post(`${BASE_URL}${path}`, params)
        .then(function (response) {
          
          if (
              (response.status === 200 || response.status === 201) &&
              cb
          ) {
            cb(response.data);
          } else {
            err(response);
          }
        })
        .catch(function (error) {

          if (error && error.response && error.response.status === 401) {
            message.warning(
                "Unauthorised request! You will be logged out."
            );
            logout(() => {
              setTimeout(() => {
                window.location.reload(true);
              }, 300);
            });
            return;
          }
          if (config.DEV_MODE || error.response.status === 404) {
            if (err) {
              err(error.response);
              return;
            }
            message.warning("Something went wrong!!");
            logout(() => {
              setTimeout(() => {
                window.location.reload(true);
              }, 300);
            });
            return;
          }
          message.warning("Something went wrong!!");
        });
  });
};

export const login = (params, cb, err) => {
  apiGet({
    path: "/auth/google",
    params,
    cb,
    err
  });
};

export const googleLogin = (query, params, cb, err) => {
  apiGet({
    path: `/auth/google/callback?${query}`,
    params,
    cb,
    err
  });
};

export const logout = cb => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  cb({ status: 200, message: "Logged Out!" });
};

export const subscribe = (params, cb, err) => {
  apiPost({
    path: "/subscribe",
    params,
    cb,
    err
  });
};

export const unsubscribe = (params, cb, err) => {
  apiPost({
    path: "/unsubscribe",
    params,
    cb,
    err
  });
};