import axios from "axios";
import { getSession } from "../helper/sessionStorage";
import { handleLogout } from "../helper/logout";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BE}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getSession("CToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (
      response &&
      response.status === 401 &&
      response.data.message === "Invalid token"
    ) {
      handleLogout();
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
