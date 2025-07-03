import PostForm from "./components/PostForm";
import { useUserData } from "../../hooks/useUser";
import PostList from "./components/PostList";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { PostSuccessResponse } from "../../interfaces/responses";
import { useEffect, useState } from "react";
import { PostFormError } from "../../interfaces/errors";
import { useParams } from "react-router";

// Fetches authenticated user's posts
//  and renders their posts
// Should this fetch user based on :username parameters?
const Posts = () => {
  const params = useParams<{ username: string }>();

  const { user, addPost } = useUserData();
  const [errors, setErrors] = useState<PostFormError>();
  const data = user?.blog?.posts || []; // This should fetch based on :username parameter
  const axiosPrivate = useAxiosPrivate();
  /*const submitPost = async (data: any) => {
    try {
      console.group("submitPost running...");
      const response = await axiosPrivate.post<PostSuccessResponse>(
        `/users/${user?.username}/posts`,
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
  ); */

  useEffect(() => {
    console.group("Posts mounted...");
    console.log(params);
    console.groupEnd();
  });

  return <p>Posts</p>;
};

export default Posts;
