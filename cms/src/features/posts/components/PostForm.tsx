import { FormEventHandler, useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce"; // TinyMCE Editor

import PostEditor from "./PostEditor";

const PostForm = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

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
        // value is type FormDataEntryValue which can be a string or File object
        // body.append(key, value as string);
      }
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
