import { useState } from "react";

const useUserData = () => {
  const [userData, setUserData] = useState();
  const posts = null;

  const addPost = (post: any) => {};

  return {
    posts,
    addPost,
  };
};

export default useUserData;
