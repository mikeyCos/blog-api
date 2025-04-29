import axios from "axios";
import config from "./env.config";

export default axios.create({
  baseURL: config.blogAPIBase,
});
