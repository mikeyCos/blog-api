import { ActionFunctionArgs, ParamParseKey, Params } from "react-router";
import { axiosPrivate } from "../../config/axios.config";

const Paths = {
  posts: "/:username/posts",
} as const;

interface LoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.posts>>;
}

const postsLoader = async ({ params }: LoaderArgs) => {
  const response = await axiosPrivate.get(`users/${params.username}/posts`);
  console.group("postsLoader running...");
  console.log("params:", params);
  console.log("response:", response);
  console.groupEnd();
};

export default postsLoader;
