import { useAuth } from "./useAuth";
import axios from "../config/axios.config";

const useRefreshToken = () => {
  const { setAccessToken } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh");

    setAccessToken((prev) => {
      console.log("prev accessToken:", prev);
      console.log(response);
      return response.data.accessToken;
    });
  };

  return refresh;
};

export default useRefreshToken;
