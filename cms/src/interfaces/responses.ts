export interface AuthSuccessResponse {
  accessToken: string;
  code: 200;
  status: "success";
  user: User;
}

export interface LoginErrorResponse {
  code: number;
  errors: Record<string, any>;
  message: string;
  status: "fail";
}

export interface SignupErrorResponse {
  code: number;
  errors: Record<string, any>;
  message: string;
  status: "fail";
}

interface User {
  id?: string;
  role?: Role;
  username?: string;
  timestamp?: Date;
  blog?: Blog | null;
  // posts?: Post[];
  // comments?: Comment[] | null;
}

interface Blog {
  id: string;
  authorId?: string;
  posts: Post[];
}

interface Post {
  id: string;
  authorId: string;
  blogId: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  // comments: Comment[];
}

type Role = "USER" | "AUTHOR" | "ADMIN";
