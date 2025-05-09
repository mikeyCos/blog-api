import { useAuth } from "./useAuth";
import axios from "../config/axios.config";

const useRefreshToken = () => {
  const { accessToken, setAccessToken } = useAuth();

  const refresh = async () => {
    console.log("refresh running...");
    const response = await axios.post("/auth/refresh", {
      headers: {
        ...(accessToken && {}),
      },
    });

    console.log("response:", response);
    // setAccessToken((prev) => {
    //   console.log("prev accessToken:", prev);
    //   console.log("new accessToken:", response.data.accessToken);
    //   console.log(response);
    //   return response.data.accessToken;
    // });
    console.log("setAccessToken:", setAccessToken);
    return response;
  };

  return refresh;
};

export default useRefreshToken;
