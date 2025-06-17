import { CreatedAt } from "./blog";

export interface Comment extends CreatedAt {
  id: string;
  authorId: string;
  postId: string;
  createdAt: Date;
  content: string;
}
