import React from "react";
import { Post } from "../../../interfaces/blog";
import PostCard from "./PostCard";
import { useUser } from "../../../hooks/useUser";

interface Props {
  data: Post[];
}

const PostList: React.FC<Props> = ({ data }) => {
  /* const [posts, setPosts] = useState([]);
  const postList =
    user?.blog?.posts &&
    user.blog.posts.length > 0 &&
    posts.map((post) => <Post />);
  const { } */
  if (data.length > 0) {
    const posts = data.map((post) => <PostCard key={post.id} data={post} />);
    return posts;
  }

  return <p>No posts</p>;
};

export default PostList;
