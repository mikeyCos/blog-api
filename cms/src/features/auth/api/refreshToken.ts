import { AuthSuccessResponse } from "../../../interfaces/responses";
import axiosDefault from "../../../config/axios.config";
import queryClient from "../../../config/query.config";

type RefreshToken = () => Promise<AuthSuccessResponse>;

const refreshToken: RefreshToken = async () => {
  const response =
    await axiosDefault.post<AuthSuccessResponse>("/auth/refresh");
  return response.data;
};

const initAccessToken = async () => {
  try {
    const refreshTokenData = await queryClient.ensureQueryData({
      queryKey: ["refreshToken"],
      queryFn: refreshToken,
      staleTime: Infinity,
    });

    return refreshTokenData.accessToken;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { initAccessToken as default, refreshToken };
