import { FormEventHandler, useEffect, useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce"; // TinyMCE Editor

import PostEditor from "./PostEditor";
import { useAuth } from "../../../hooks/useAuth";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import config from "../../../config/env.config";
const { blogAPIBase } = config;

const PostForm = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const { accessToken } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  // How to create new access token if current is expired on form submission?
  const submitPost: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("submitHandler running...");

    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);
      const body = new URLSearchParams();

      console.log(formElement);
      for (const input of formData) {
        const [key, value] = input;
        console.log("input:", input);
        body.append(key, value as string);
      }

      body.append("content", editorContent);
      console.log("accessToken:", accessToken);
      /* const response = await axios.post("/post", body).catch((err) => {
        console.log("err:", err);
      }); */

      // If the access token expires
      //  Generate new access token
      //  Rerun original request
      const response = await axiosPrivate.post("/post", body).catch((err) => {
        console.log("err:", err);
      });

      console.log("response:", response);
      console.log("editorContent:", editorContent);
    }
  };

  // TODO
  // Enable the ability to save post as a draft
  // If there is a draft, change 'save draft' text to 'update draft'
  // If user posts the post, then it is no longer a draft
  const saveDraft = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <form method="POST" onSubmit={submitPost}>
      <h3>Create Post</h3>
      <li className="form-item">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" />
      </li>

      <li className="form-item">
        <PostEditor editorRef={editorRef} />
      </li>

      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
