import { useEffect } from "react";
import axiosDefault from "../config/axios.config";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  // const requestInterceptor = axiosDefault.interceptors.request.use((config) => {
  // if (accessToken) {
  //   config.headers.Authorization = `Bearer ${accessToken}`;
  // }
  //   return config;
  // });

  // const responseInterceptor = axiosDefault.interceptors.response.use((response) => {
  //   return response
  // }, async (err) => {
  // if (err.request.status === 403) {
  //   return await refresh();
  // }
  // return Promise.reject(err);
  // })

  useEffect(() => {
    return () => {
      console.log("useAxiosPrivate clean up function running...");
    };
  }, []);
};

export default useAxiosPrivate;
