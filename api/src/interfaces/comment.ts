import { CreatedAt } from "./blog";

export interface Comment extends CreatedAt {
  id: string;
  authorId: string;
  postId: string;
  content: string;
}
