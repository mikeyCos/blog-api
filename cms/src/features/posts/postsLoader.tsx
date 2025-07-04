import { ActionFunctionArgs, ParamParseKey, Params } from "react-router";
import { axiosPrivate } from "../../config/axios.config";
import { Post } from "../../interfaces/blog";

const Paths = {
  posts: "/:username/posts",
} as const;

interface LoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.posts>>;
}

// I wish I could access React context...
const postsLoader = async ({ params }: LoaderArgs) => {
  const response = await axiosPrivate.get(`users/${params.username}/posts`);
  console.group("postsLoader running...");
  console.log("params:", params);
  console.log("response:", response);
  console.groupEnd();
  return response.data.posts;
};

export default postsLoader;
