import { Dispatch } from "react";
import axiosDefault, { axiosInit } from "../config/axios.config";
import { AxiosResponse } from "axios";

interface UseRefreshToken {
  (
    setAccessToken: Dispatch<
      string | null | ((prevState: string | null) => string | null)
    >
  ): () => Promise<AxiosResponse>;
}

// What if accessToken already exists?
const useRefreshToken: UseRefreshToken = (setAccessToken) => {
  const refresh = async () => {
    console.log("refresh running...");
    const response = await axiosDefault.post("/auth/refresh");

    console.log("response:", response);
    console.log(
      "response.data.data.accessToken:",
      response.data.data.accessToken
    );

    // console.log("accessToken:", accessToken);
    // console.log("setAccessToken:", setAccessToken);
    // setAccessToken(response.data.accessToken);
    setAccessToken((prev) => {
      console.log("previous accessToken:", prev);
      console.log("new accessToken:", response.data.data.accessToken);
      //   console.log(response);
      return response.data.data.accessToken;
    });
    // console.log("setAccessToken:", setAccessToken);
    // return response.data.data.accessToken;

    return response;
  };

  return refresh;
};

export default useRefreshToken;
