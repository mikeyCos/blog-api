import { AxiosInstance } from "axios";
import { AuthUserResponse } from "../../../interfaces/responses";
import { AuthenticatedUser } from "../../../interfaces/user";

type GetUser = (axiosInstance: AxiosInstance) => Promise<AuthenticatedUser>;

export const getAuthenticatedUser: GetUser = async (axiosInstance) => {
  const response = await axiosInstance.get<AuthUserResponse>("/auth/user");
  return response.data.user;
};
