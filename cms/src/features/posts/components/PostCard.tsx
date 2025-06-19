import { useParams } from "react-router";
import NavAnchor from "../../../components/navAnchor/NavAnchor";
import { Post } from "../../../interfaces/blog";

interface Props {
  data: Post;
}

const PostCard: React.FC<Props> = ({ data }) => {
  const { id, title, titleSlug, createdAt } = data;
  const { username } = useParams();
  const postPath = `/${username}/${titleSlug}`;
  // TODO
  // Add
  //  Delete button
  //  Anchor heading
  return (
    <li>
      <NavAnchor pathname={postPath} textContent={title} />
      <p>Posted on {createdAt.toString()}</p>
      <NavAnchor
        pathname={`/${username}/edit?goto=${postPath}`}
        textContent="edit"
      />
    </li>
  );
};

export default PostCard;
