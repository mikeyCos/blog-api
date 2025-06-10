import { AxiosResponse } from "axios";
import axiosDefault from "../config/axios.config";
import { AuthSuccessResponse } from "../interfaces/responses";

const useRefreshToken = () => {
  const refresh = async () => {
    console.log("refresh running...");
    /* const response: AxiosResponse<RefreshResponse> = await axiosDefault.post(
      "/auth/refresh"
    ); */
    const response = await axiosDefault.post<AuthSuccessResponse>(
      "/auth/refresh"
    );
    // console.log(response.)
    return response.data;
  };

  return refresh;
};

export default useRefreshToken;
