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

type Role = "USER" | "AUTHOR" | "ADMIN";

export interface CreateUser {
  username: string;
  email: string;
  password: string;
}

export interface UserIdParams {
  userId: UserId;
}

export type UserId = string | undefined | null;

export type Username = string | undefined | null;
