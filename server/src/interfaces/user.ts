export interface User {
  id: Id;
  blog: object;
  posts: [];
  comments: [];
  role: Role;
}

type Role = "USER" | "AUTHOR" | "ADMIN";

export interface UserId {
  id: Id;
}

export type Id = string;
