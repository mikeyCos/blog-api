import NavAnchor from "../../../components/navAnchor/NavAnchor";
import { Post } from "../../../interfaces/blog";

interface Props {
  data: Post;
}

const PostCard: React.FC<Props> = ({ data }) => {
  const { id, title, createdAt } = data;
  const url = encodeURI(title);
  // TODO
  // Add
  //  Delete button
  //  Anchor heading
  return (
    <li>
      <NavAnchor pathname={`/post/${id}`} textContent={title} />
      <p>Posted on {createdAt.toString()}</p>
    </li>
  );
};

export default PostCard;
