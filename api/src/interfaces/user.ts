import { Blog } from "./blog";
import { Post } from "./post";
import { Comment } from "./comment";

export interface User {
  id: UserId;
  roles?: Role[];
  username: Username;
  email?: string;
  password?: string;
  timestamp?: Date;
  blog?: Blog | null;
  posts?: Post[];
  comments?: Comment[] | null;
}

export interface AuthenticatedUser {
  id: string;
  roles: Role[];
  username: Username;
}

export interface CreateUser {
  username: string;
  email: string;
  password: string;
}

interface Role {
  assignedAt: Date;
  roleDetails: RoleDetails;
}

interface RoleDetails {
  id: string;
  name: RoleName;
}

export type RoleName = "VIEWER" | "AUTHOR" | "ADMIN";

export type UserId = string;

export type Username = string;
