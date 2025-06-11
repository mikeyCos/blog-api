import { Blog, Post } from "./blog";

export interface User {
  id?: string;
  role?: Role;
  username?: string;
  timestamp?: Date;
  blog?: Blog | null;
  // posts?: Post[];
  // comments?: Comment[] | null;
}

type Role = "USER" | "AUTHOR" | "ADMIN";
