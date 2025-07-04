import { Blog, Post } from "./blog";

export interface User {
  id?: string;
  roles?: Role[];
  username?: string;
  timestamp?: Date;
  blog?: Blog | null;
  // posts?: Post[];
  // comments?: Comment[] | null;
}

export interface AuthenticatedUser {
  id: string;
  roles: Role[];
  username: string;
  timestamp: Date;
  blog: Blog | null;
}

export interface Role {
  assignedAt: Date;
  roleDetails: RoleDetails;
}

interface RoleDetails {
  id: string;
  name: RoleName;
}

export type RoleName = "USER" | "AUTHOR" | "ADMIN";
