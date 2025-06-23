import { CreatedAt } from "./blog";
import { Comment } from "./comment";

export interface Post extends CreatedAt {
  id: string;
  publicId: string;
  authorId: string;
  blogId: string;
  updatedAt: Date;
  title: string;
  titleSlug: string;
  content: string;
  // comments: Comment[];
}
