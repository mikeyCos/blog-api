import { useLoaderData } from "react-router";
import { useState } from "react";
import { useUserData } from "../../hooks/useUser";
import { Post as PostData } from "../../interfaces/blog";
import PostForm from "../../features/posts/components/PostForm";
import { PostFormError } from "../../interfaces/errors";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { PostSuccessResponse } from "../../interfaces/responses";

const EditPost = () => {
  const { user, updatePost } = useUserData();
  const currentPost = useLoaderData<PostData>();
  const [errors, setErrors] = useState<PostFormError>();
  const axiosPrivate = useAxiosPrivate();

  const submitPost = async (data: any) => {
    try {
      const response = await axiosPrivate.put<PostSuccessResponse>(
        `/users/${user?.username}/posts/${currentPost.titleSlug}/edit`,
        data
      );
      updatePost(response.data.post);
    } catch (err: any) {
      setErrors(err.response.data.errors);
    }
  };
  console.group("PostEdit rendering...");
  console.log("currentPost:", currentPost);
  console.groupEnd();

  const initialData = {
    title: {
      value: currentPost.title,
    },
    content: {
      value: currentPost.content,
    },
  };

  return (
    <>
      <p>EditPost page</p>
      <PostForm
        initialData={initialData}
        submitForm={submitPost}
        formErrors={errors}
      />
    </>
  );
};

export default EditPost;
