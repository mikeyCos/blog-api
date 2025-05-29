import { FormEventHandler, useEffect, useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce"; // TinyMCE Editor

import PostEditor from "./PostEditor";
// import axios from "../../../config/axios.config";
import { useAuth } from "../../../hooks/useAuth";

import axios from "axios";
import config from "../../../config/env.config";
const { blogAPIBase } = config;

const PostForm = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const { accessToken } = useAuth();
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

      // Need to attach access token to authorization header
      const response = await axios
        .post(`${blogAPIBase}/post`, body, {
          withCredentials: true,
        })
        .catch((err) => {
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

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (accessToken) {
        console.log("accessToken attached to request header");
        console.log("accessToken:", accessToken);
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      async (response) => response,
      async (err) => {
        console.log("err:", err);
        // return Promise.reject(err);
        if (err.request.status === 403) {
          return await axios.post("/auth/refresh");
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [accessToken]);

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
