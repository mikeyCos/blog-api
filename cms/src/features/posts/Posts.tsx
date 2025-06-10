import { useState } from "react";
import PostForm from "./components/PostForm";
import Post from "./components/Post";

const Posts = () => {
  // Get user's posts from database?

  const [posts, setPosts] = useState([]);
  const postList = posts.length > 0 && posts.map((post) => <Post />);

  return (
    <>
      <h2>Posts</h2>
      <PostForm />
      {postList}
    </>
  );
};

export default Posts;
