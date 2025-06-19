import PostForm from "./components/PostForm";
import { useUserData } from "../../hooks/useUser";
import PostList from "./components/PostList";

// This will always render the authenticated user's posts
const Posts = () => {
  const { user } = useUserData();
  const data = user?.blog?.posts || [];

  return (
    <>
      <h2>Posts</h2>
      <p>username {user?.username}</p>
      <PostForm />
      <PostList data={data} />
    </>
  );
};

export default Posts;
