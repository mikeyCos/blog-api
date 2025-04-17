import { Blog } from "./blog";
import { CreatedAt } from "./post";

export interface Comment extends Blog, CreatedAt {
  postId: string;
}
