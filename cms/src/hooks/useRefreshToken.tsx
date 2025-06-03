import axiosDefault from "../config/axios.config";

const useRefreshToken = () => {
  const refresh = async () => {
    console.log("refresh running...");
    const response = await axiosDefault.post("/auth/refresh");

    return response.data.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
