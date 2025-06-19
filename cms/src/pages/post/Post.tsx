import { useLoaderData } from "react-router";
import NavAnchor from "../../components/navAnchor/NavAnchor";
import { Post as PostData } from "../../interfaces/blog";
import { useUserData } from "../../hooks/useUser";

const Post = () => {
  const { authenticated, user } = useUserData();
  const data = useLoaderData<PostData>();
  console.log("data:", data);
  if (!authenticated || !user) {
    return <p>Please log in</p>;
  }
  // const { postTitle } = useParams<PostParams>();
  const { username } = user;
  const pathname = `${username}/edit?=${username}/${data.titleSlug}`;

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
