import { User } from "./user";

export interface AuthSuccessResponse<T = void> {
  code: 200;
  status: "success";
  accessToken: string;
  user: T;
}

export interface LoginErrorResponse {
  code: number;
  status: "fail";
  errors: Record<string, any>;
  message: string;
}

export interface SignupErrorResponse {
  code: number;
  status: "fail";
  errors: Record<string, any>;
  message: string;
}

export interface NetworkErrorResponse {
  code: string;
}
