import { useLoaderData, useLocation } from "react-router";
import NavAnchor from "../../components/navAnchor/NavAnchor";
import { Post as PostData } from "../../interfaces/blog";
import { useUserData } from "../../hooks/useUser";

const Post = () => {
  const location = useLocation();
  const { status, user } = useUserData();
  const data = useLoaderData<PostData>();
  console.log("data:", data);

  // const { postTitle } = useParams<PostParams>();

  if (status === "unauthenticated" || !user) {
    console.group("Post component");
    console.log("location:", location);
    console.groupEnd();
    return <NavAnchor pathname="/login" textContent="Login" />;
  }

  const { username } = user;
  // /:username/posts/:postTitle/edit
  const pathname = `/${username}/posts/${data.titleSlug}/edit`;

  return (
    <section>
      <header>
        <NavAnchor pathname={pathname} textContent="edit" />
      </header>
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
