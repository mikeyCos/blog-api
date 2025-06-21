import PostForm from "./components/PostForm";
import { useUserData } from "../../hooks/useUser";
import PostList from "./components/PostList";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { PostSuccessResponse } from "../../interfaces/responses";
import { useState } from "react";
import { PostFormError } from "../../interfaces/errors";

// This will always render the authenticated user's posts
const Posts = () => {
  const { user, addPost } = useUserData();
  const [errors, setErrors] = useState<PostFormError>();
  const data = user?.blog?.posts || [];
  const axiosPrivate = useAxiosPrivate();

  const submitPost = async (data: any) => {
    try {
      console.group("submitPost running...");
      const response = await axiosPrivate.post<PostSuccessResponse>(
        `/users/${user?.username}/posts/new`,
        data
      );
      addPost(response.data.post);
    } catch (err: any) {
      setErrors(err.response.data.errors);
    }
  };

  return (
    <>
      <h2>Posts</h2>
      <p>username {user?.username}</p>
      <PostForm submitForm={submitPost} formErrors={errors} />
      <PostList data={data} />
    </>
  );
};

export default Posts;
