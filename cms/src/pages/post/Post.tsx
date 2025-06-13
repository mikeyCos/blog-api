import { useLocation, useParams } from "react-router";
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
  // const { postTitle } = useParams<PostParams>();
  // console.log("postTitle:", postTitle);
  const location = useLocation();
  const state = location.state as LocationState;
  const { post } = state;
  console.log("state:", state);

  // What if state is falsy?
  //  Should navigate to 404 page

  return (
    <section>
      <article>
        <header>
          <h2>{post.title}</h2>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </section>
  );
};

export default Post;
