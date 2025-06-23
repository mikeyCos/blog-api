import {
  ChangeEventHandler,
  FormEventHandler,
  ReactElement,
  useRef,
  useState,
} from "react";
import { Editor as TinyMCEEditor } from "tinymce"; // TinyMCE Editor

import PostEditor from "./PostEditor";
import { PostFormError } from "../../../interfaces/errors";

const charCount = (editor: TinyMCEEditor) => {
  return editor.plugins.wordcount.body.getCharacterCount();
};

interface Value {
  value: string;
}

interface InitialFormData {
  title: Value;
  content: Value;
}

interface PostFormProps {
  submitForm: any;
  submitBtnText?: "save edits" | "post";
  formErrors?: PostFormError;
  initialData?: InitialFormData;
}

interface PostForm {
  ({ initialData, submitForm, formErrors }: PostFormProps): ReactElement;
}

const defaultFormData: InitialFormData = {
  title: {
    value: "",
  },
  content: {
    value: "",
  },
};

const PostForm: PostForm = ({
  submitForm,
  submitBtnText = "post",
  formErrors,
  initialData = defaultFormData,
}) => {
  const [formData, setFormData] = useState(initialData);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  // How to create new access token if current is expired on form submission?
  const submitPost: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.group("submitPost running...");

    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);
      formData.append("content", editorContent);
      const formDataValues = Object.fromEntries(formData);
      console.log("formDataValues:", formDataValues);
      console.groupEnd();
      setFormData(defaultFormData); // Resets form data
      await submitForm(formData);
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
          value={formData.title.value}
        />
        {formErrors?.title && <p>{formErrors.title.msg}</p>}
      </li>

      <li className="form-item">
        <PostEditor
          editorRef={editorRef}
          onChangeHandler={editorOnChangeHandler}
          onBeforeAddUndoHandler={editorOnBeforeAddUndoHandler}
          editorValue={formData.content.value}
        />
        {formErrors?.content && <p>{formErrors.content.msg}</p>}
      </li>

      <button
        type="submit"
        disabled={
          !(formData.content.value.length && formData.title.value.length)
        }
      >
        {submitBtnText}
      </button>
    </form>
  );
};

export default PostForm;
