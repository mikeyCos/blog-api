import { useParams } from "react-router";
import NavAnchor from "../../../components/navAnchor/NavAnchor";
import { Post } from "../../../interfaces/blog";
import { useModalContext } from "../../../hooks/useModal";
import ConfirmPostDelete from "./ConfirmPostDelete";

interface Props {
  data: Post;
}

const PostCard: React.FC<Props> = ({ data }) => {
  const { id, authorId, publicId, title, titleSlug, createdAt } = data;
  const { username } = useParams();
  const { openModal } = useModalContext();
  const postPath = `/${username}/posts/${publicId}/${titleSlug}`;
  const editPostPath = `/${username}/posts/${publicId}/${titleSlug}/edit`;
  // TODO
  // Add
  //  Delete button
  //  Anchor heading
  return (
    <li>
      <NavAnchor pathname={postPath} textContent={title} />
      <p>Posted on {createdAt.toString()}</p>
      <NavAnchor pathname={editPostPath} textContent="edit" />
      <button onClick={() => openModal(<ConfirmPostDelete data={data} />)}>
        Delete
      </button>
    </li>
  );
};

export default PostCard;
