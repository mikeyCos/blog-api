import { CreatedAt } from "./blog";

export interface Post extends CreatedAt {
  id: string;
  blogId: string;
  authorId: string;
  content: string;
  title: string;
}
