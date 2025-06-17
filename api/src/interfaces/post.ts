import { CreatedAt } from "./blog";
import { Comment } from "./comment";

export interface Post extends CreatedAt {
  id: string;
  authorId: string;
  blogId: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  // comments: Comment[];
}
