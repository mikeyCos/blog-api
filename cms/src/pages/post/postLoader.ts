import { ActionFunctionArgs, ParamParseKey, Params } from "react-router";
import { axiosPrivate } from "../../config/axios.config";

/* How to type params for route loaders?
 * https://stackoverflow.com/questions/75324193/react-router-6-how-to-strongly-type-the-params-option-in-route-loader
 */

const Paths = {
  postDetail: "/:author/:postTitle",
} as const;

interface LoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.postDetail>>;
}

const postLoader = async ({ params }: LoaderArgs) => {
  console.log("postLoader running...");
  console.log("params:", params);
  try {
    const url = `/posts/${params.postTitle}?author=${params.author}`;
    const response = await axiosPrivate.get(url);
    console.log("response:", response);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("Post not found");
  }
};

export default postLoader;
