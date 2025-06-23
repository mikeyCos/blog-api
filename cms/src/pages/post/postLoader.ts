import { ActionFunctionArgs, ParamParseKey, Params } from "react-router";
import { axiosPrivate } from "../../config/axios.config";
import { Post } from "../../interfaces/blog";

/* How to type params for route loaders?
 * https://stackoverflow.com/questions/75324193/react-router-6-how-to-strongly-type-the-params-option-in-route-loader
 */

const Paths = {
  postDetail: "/:username/posts/:postPublicId/:postTitle",
} as const;

interface LoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.postDetail>>;
}

const postLoader = async ({ params }: LoaderArgs): Promise<Post> => {
  console.group("postLoader running...");
  console.log("params:", params);
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

export default postLoader;
