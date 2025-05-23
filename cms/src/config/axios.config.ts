import axios from "axios";
import config from "./env.config";

export default axios.create({
  baseURL: config.blogAPIBase,
  withCredentials: true,
});

export const axiosInit = axios.create({
  baseURL: config.blogAPIBase,
  withCredentials: true,
  // validateStatus: (status) => status < 500,
});
