import {
  ChangeEventHandler,
  EventHandler,
  FormEventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Editor as TinyMCEEditor } from "tinymce"; // TinyMCE Editor

import PostEditor from "./PostEditor";
import { useAuth } from "../../../hooks/useAuth";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { PostFormError } from "../../../interfaces/errors";
import { useUser } from "../../../hooks/useUser";
import { PostSuccessResponse } from "../../../interfaces/responses";

const charCount = (editor: TinyMCEEditor) => {
  return editor.plugins.wordcount.body.getCharacterCount();
};

const PostForm = () => {
  const initialFormData = {
    title: {
      value: "",
    },
    content: {
      value: "",
    },
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<PostFormError>();
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const { addPost } = useUser();
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

      // If the access token expires
      //  Generate new access token
      //  Rerun original request
      try {
        const response = await axiosPrivate.post<PostSuccessResponse>(
          "/post",
          body
        );
        // Clear inputs
        setFormData(initialFormData);
        addPost(response.data.post);
        // console.log("response:", response);
      } catch (err: any) {
        console.log("err:", err);
        if (err.response.data.errors) {
          console.log("err.response.data.errors:", err.response.data.errors);
          setErrors(err.response.data.errors);
        }
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

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const input = e.currentTarget;
    console.log("input:", input);
    const { id, value } = input;
    setFormData({
      ...formData,
      [id]: {
        value,
      },
    });
  };

  /* Limit character amount
   * https://github.com/tinymce/tinymce-react/pull/241
   * https://www.tiny.cloud/docs/tinymce/latest/react-ref/#using-the-tinymce-react-component-as-a-controlled-component
   * BUG: Holding a key down will keep rendering
   *  additional characters until key is lifted up
   */
  const editorOnChangeHandler = (content: string, editor: TinyMCEEditor) => {
    console.log("content:", content);
    console.log("editor:", editor);
    const currentCharCount = charCount(editor);
    if (currentCharCount <= 50) {
      setFormData({
        ...formData,
        content: {
          value: content,
        },
      });
    }
  };

  const editorOnBeforeAddUndoHandler = (e: any, editor: TinyMCEEditor) => {
    const currentCharCount = charCount(editor);
    console.log("e:", e);
    if (currentCharCount < 50) {
      e.preventDefault();
    }
  };

  // useEffect(() => {
  //   console.log("PostForm mounted");
  //   console.log("formData:", formData);
  // }, [formData]);

  return (
    <form method="POST" onSubmit={submitPost}>
      <h3>Create Post</h3>
      <li className="form-item">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={onChangeHandler}
          maxLength={300}
        />
        {errors?.title && <p>{errors.title.msg}</p>}
      </li>

      <li className="form-item">
        <PostEditor
          editorRef={editorRef}
          onChangeHandler={editorOnChangeHandler}
          onBeforeAddUndoHandler={editorOnBeforeAddUndoHandler}
          editorValue={formData.content.value}
        />
        {errors?.content && <p>{errors.content.msg}</p>}
      </li>

      <button
        type="submit"
        disabled={
          !(formData.content.value.length && formData.title.value.length)
        }
      >
        Post
      </button>
    </form>
  );
};

export default PostForm;
