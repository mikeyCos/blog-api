import { User } from "./user";
import { Post } from "./blog";

export interface SuccessResponse {
  code: 200;
  status: "success";
}

export interface AuthSuccessResponse extends SuccessResponse {
  accessToken: string;
}

export interface AuthUserResponse extends AuthSuccessResponse {
  user: User;
}

// A new post has been created
export interface PostSuccessResponse extends SuccessResponse {
  post: Post;
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
