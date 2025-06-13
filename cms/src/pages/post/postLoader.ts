import { Params } from "react-router";
import { axiosPrivate } from "../../config/axios.config";
import { useAuth } from "../../hooks/useAuth";

/* How to type params for route loaders?
 * https://stackoverflow.com/questions/75324193/react-router-6-how-to-strongly-type-the-params-option-in-route-loader
 */
const postLoader = async ({ params }: { params: Params<"postTitle"> }) => {
  console.log("postLoader running...");
  console.log("params:", params);
  try {
    const response = await axiosPrivate.get(`/post/${params.postTitle}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("Post not found");
  }
};

export default postLoader;
