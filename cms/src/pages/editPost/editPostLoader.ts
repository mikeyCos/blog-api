import { ActionFunctionArgs, ParamParseKey, Params } from "react-router";
import { axiosPrivate } from "../../config/axios.config";
import { Post } from "../../interfaces/blog";

const Paths = {
  editPostDetail: "/:username/posts/:postPublicId/:postTitle/edit",
} as const;

interface LoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.editPostDetail>>;
}

const editPostLoader = async ({ params }: LoaderArgs): Promise<Post> => {
  console.group("postLoader running...");

  try {
    const url = `users/${params.username}/posts/${params.postPublicId}/${params.postTitle}`;
    const response = await axiosPrivate.get(url);
    console.log("response:", response);
    console.groupEnd();
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("Post not found");
  }
};

export default editPostLoader;
