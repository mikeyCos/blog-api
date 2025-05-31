import axios from "axios";
import config from "./env.config";

import { useAuth } from "../hooks/useAuth";

const axiosDefault = axios.create({
  baseURL: config.blogAPIBase,
  withCredentials: true,
});

const axiosInit = axios.create({
  baseURL: config.blogAPIBase,
  withCredentials: true,
  // validateStatus: (status) => status < 500,
});

const axiosPrivate = axios.create({
  baseURL: config.blogAPIBase,
  withCredentials: true,
});

/* const requestInterceptor = axiosDefault.interceptors.request.use((config) => {
  return config;
});

const responseInterceptor = axiosDefault.interceptors.response.use(
  (response) => {
    return response;
  }
); */

export { axiosDefault as default, axiosInit, axiosPrivate };
