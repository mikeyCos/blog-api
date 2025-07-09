import React, { FormEventHandler } from "react";
// import { useLocation, useNavigate, useParams } from "react-router";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { useModalContext } from "../../../hooks/useModal";
import { Post } from "../../../interfaces/blog";
import { useUserData } from "../../../hooks/useUser";

interface Props {
  data: Post;
}

const ConfirmPostDelete: React.FC<Props> = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ username: string }>();
  const { closeModal } = useModalContext();
  const { removePost, user } = useUserData();
  const { axiosPrivate } = useAxiosPrivate();
  const handleCancel = () => {
    console.group("handleCancel running");
    console.log("closing modal...");
    closeModal();
    console.groupEnd();
  };

  const handleSubmit: FormEventHandler = async (e) => {
    console.group("handleSubmit running...");
    e.preventDefault();
    try {
      const deletedPost = await axiosPrivate.delete(
        `/users/${user?.username}/posts/${data.id}`
      );
      console.log("location:", location);
      console.log("params:", params);
      console.log(params.username);
      const urlEnd = location.pathname.slice(
        location.pathname.lastIndexOf("/")
      );
      if (urlEnd !== "posts") {
        navigate(`${params.username}/posts`, { replace: true });
      }
      // What if an admin needs to delete a user's post?
      removePost(deletedPost.data.post.id);
      closeModal();
    } catch (err) {
      console.error(err);
    }
    console.groupEnd();
  };

  return (
    <>
      <p>ConfirmPostDelete</p>
      <form action="POST" onSubmit={handleSubmit}>
        <p>
          You cannot undo this action. Are you sure you want to delete post "
          {data.title}"?
        </p>
        <button type="submit">Delete</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default ConfirmPostDelete;
