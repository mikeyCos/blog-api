import axios from "axios";
import config from "./env.config";

const axiosDefault = axios.create({
  baseURL: config.blogAPIBase,
  withCredentials: true,
});

const axiosPrivate = axios.create({
  baseURL: config.blogAPIBase,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosDefault as default, axiosPrivate };
