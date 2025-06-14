import React from "react";
import { Post } from "../../../interfaces/blog";
import PostCard from "./PostCard";

interface Props {
  data: Post[];
}

const PostList: React.FC<Props> = ({ data }) => {
  if (data.length > 0) {
    const posts = data.map((post) => <PostCard key={post.id} data={post} />);
    return posts;
  }

  return <p>No posts</p>;
};

export default PostList;
