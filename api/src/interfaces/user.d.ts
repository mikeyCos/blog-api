import { Blog } from "./blog";
import { Post } from "./post";
import { Comment } from "./comment";

export interface User {
  id?: UserId;
  role?: Role;
  username?: Username;
  email?: string;
  password?: string;
  timestamp?: Date;
  blog?: Blog | null;
  posts?: Post[];
  comments?: Comment[] | null;
}

export interface AuthenticatedUser {
  id: string;
  role: Role;
  username: Username;
}

export interface CreateUser {
  username: string;
  email: string;
  password: string;
}

export interface UserIdParams {
  userId: UserId;
}

type Role = "USER" | "AUTHOR" | "ADMIN";

export type UserId = string;

export type Username = string;
