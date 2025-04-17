export interface User {
  id: userId;
  blog: object;
  posts: [];
  comments: [];
  role: Role;
}

type Role = "USER" | "AUTHOR" | "ADMIN";

export interface CreateUser {
  username: string;
  password: string;
}

export interface UserIdParams {
  userId: userId;
}

export type userId = string;
