import { useEffect, useState } from "react";
import PostForm from "./components/PostForm";
import Post from "./components/Post";
import { useUser } from "../../hooks/useUser";

const Posts = () => {
  // Get user's posts from database?

  // const [posts, setPosts] = useState([]);
  // const postList = posts.length > 0 && posts.map((post) => <Post />);

  const { username } = useUser();
  useEffect(() => {
    console.log("username:", username);
  }, [username]);

  return (
    <>
      <h2>Posts</h2>
      <PostForm />
    </>
  );
};

export default Posts;
