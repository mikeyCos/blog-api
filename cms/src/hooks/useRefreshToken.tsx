import axiosDefault from "../config/axios.config";
import { AuthSuccessResponse } from "../interfaces/responses";

const useRefreshToken = () => {
  // const refresh = async () => {
  //   console.group("refresh running...");
  //   console.groupEnd();
  //   const response =
  //     await axiosDefault.post<AuthSuccessResponse>("/auth/refresh");
  //   return response.data;
  // };

  // return refresh;
  return async () => {
    console.group("refresh running...");
    console.groupEnd();
    const response =
      await axiosDefault.post<AuthSuccessResponse>("/auth/refresh");
    return response.data;
  };
};

export default useRefreshToken;
