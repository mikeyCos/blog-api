import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import { useUserData } from "../../hooks/useUser";
import { Post as PostData } from "../../interfaces/blog";
import PostForm from "../../features/posts/components/PostForm";
import { PostFormError } from "../../interfaces/errors";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { PostSuccessResponse } from "../../interfaces/responses";

const EditPost = () => {
  const navigate = useNavigate();
  const { user, updatePost } = useUserData();
  const currentPost = useLoaderData<PostData>();
  const [errors, setErrors] = useState<PostFormError>();
  const axiosPrivate = useAxiosPrivate();

  console.log("user:", user);
  const submitPost = async (data: any) => {
    // If data and currentPost are the same don't submit
    try {
      console.group("submitPost running...");
      const response = await axiosPrivate.put<PostSuccessResponse>(
        `/users/${user?.username}/posts/${currentPost.titleSlug}`,
        data
      );
      console.log("response:", response);
      console.groupEnd();
      updatePost(response.data.post);
      navigate(`/${user?.username}/posts`);
    } catch (err: any) {
      console.error(err);
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
        submitForm={submitPost}
        submitBtnText="save edits"
        initialData={initialData}
        formErrors={errors}
      />
    </>
  );
};

export default EditPost;
