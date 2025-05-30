import { useAuth } from "./useAuth";
import axiosDefault from "../config/axios.config";

const useRefreshToken = () => {
  const { setAccessToken } = useAuth();

  const refresh = async () => {
    console.log("refresh running...");
    const response = await axiosDefault.post("/auth/refresh");

    console.log("response:", response);
    console.log(
      "response.data.data.accessToken:",
      response.data.data.accessToken
    );
    // setAccessToken((prev) => {
    //   console.log("prev accessToken:", prev);
    //   console.log("new accessToken:", response.data.accessToken);
    //   console.log(response);
    //   return response.data.accessToken;
    // });
    // console.log("setAccessToken:", setAccessToken);
    // return response.data.data.accessToken;
    return response;
  };

  return refresh;
};

export default useRefreshToken;
