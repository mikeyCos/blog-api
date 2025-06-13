import {
  ErrorResponse,
  useLoaderData,
  useLocation,
  useParams,
} from "react-router";
import { Post as PostProp } from "../../interfaces/blog";

/* type PostParams = {
  postTitle: string;
} */

interface PostParams {
  postTitle: string;
  [key: string]: string | undefined;
}

interface LocationState {
  post: PostProp;
}

const Post = () => {
  const data = useLoaderData();
  console.log("data:", data);
  // const { postTitle } = useParams<PostParams>();
  // console.log("postTitle:", postTitle);

  // What if state is falsy?
  //  Should navigate to 404 page

  return (
    <section>
      <article>
        <header>
          <h2>{data.title}</h2>
        </header>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </article>
    </section>
  );
};

export default Post;
