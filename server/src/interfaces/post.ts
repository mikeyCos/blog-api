import { Blog } from "./blog";

export interface CreatedAt {
  createdAt: Date;
}

export interface Post extends Blog, CreatedAt {
  blogId: string;
  title: string;
}
