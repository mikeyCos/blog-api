import { useParams } from "react-router";
import NavAnchor from "../../../components/navAnchor/NavAnchor";
import { Post } from "../../../interfaces/blog";

interface Props {
  data: Post;
}

const PostCard: React.FC<Props> = ({ data }) => {
  const { id, title, titleSlug, createdAt } = data;
  const { author } = useParams();
  // const url = encodeURI(title);
  // TODO
  // Add
  //  Delete button
  //  Anchor heading
  return (
    <li>
      <NavAnchor pathname={`/${author}/${titleSlug}`} textContent={title} />
      <p>Posted on {createdAt.toString()}</p>
    </li>
  );
};

export default PostCard;
