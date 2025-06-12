import { Post } from "../../../interfaces/blog";

interface Props {
  data: Post;
}

const PostCard: React.FC<Props> = ({ data }) => {
  const { title, createdAt } = data;

  return (
    <li>
      <h6>{title}</h6>
      <p>{createdAt.toString()}</p>
    </li>
  );
};

export default PostCard;
