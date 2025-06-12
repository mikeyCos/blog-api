import { useEffect, useState } from "react";
import PostForm from "./components/PostForm";

import { useUser } from "../../hooks/useUser";
import PostList from "./components/PostList";

const Posts = () => {
  const { user } = useUser();
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
