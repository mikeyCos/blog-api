import { useLoaderData, useSearchParams } from "react-router";
import { useUserData } from "../../hooks/useUser";
import { Post as PostData } from "../../interfaces/blog";
import PostForm from "../../features/posts/components/PostForm";

const EditPost = () => {
  const { user } = useUserData();
  const data = useLoaderData<PostData>();
  console.group("PostEdit rendering...");
  console.log("data:", data);
  console.groupEnd();

  const initialData = {
    title: {
      value: data.title,
    },
    content: {
      value: data.content,
    },
  };

  return (
    <>
      <p>EditPost page</p>
      <PostForm initialData={initialData} />
    </>
  );
};

export default EditPost;
