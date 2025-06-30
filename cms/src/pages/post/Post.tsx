import { useLoaderData, useLocation } from "react-router";
import NavAnchor from "../../components/navAnchor/NavAnchor";
import { Post as PostData } from "../../interfaces/blog";
import { useUserData } from "../../hooks/useUser";
import { useModalContext } from "../../hooks/useModal";
import ConfirmPostDelete from "../../features/posts/components/ConfirmPostDelete";

const Post = () => {
  const location = useLocation();
  const { status, user } = useUserData();
  const currentPost = useLoaderData<PostData>();
  const { openModal } = useModalContext();
  console.log("currentPost:", currentPost);

  // const { postTitle } = useParams<PostParams>();

  if (status === "unauthenticated" || !user) {
    console.group("Post component");
    console.log("location:", location);
    console.groupEnd();
    return <NavAnchor pathname="/login" textContent="Login" />;
  }

  const { username } = user;
  // /:username/posts/:postTitle/edit
  const editPathname = `/${username}/posts/${currentPost.publicId}/${currentPost.titleSlug}/edit`;

  return (
    <section>
      <header>
        <NavAnchor pathname={editPathname} textContent="edit" />
        <button
          onClick={() => openModal(<ConfirmPostDelete data={currentPost} />)}
        >
          Delete
        </button>
      </header>
      <article>
        <header>
          <h2>{currentPost.title}</h2>
        </header>
        <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
      </article>
    </section>
  );
};

export default Post;
