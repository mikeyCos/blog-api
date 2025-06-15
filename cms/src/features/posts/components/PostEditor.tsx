import { Editor } from "@tinymce/tinymce-react"; // React component Editor
import { Editor as TinyMCEEditor } from "tinymce"; // TinyMCE Editor
import React from "react";

interface PostEditorProps {
  editorRef: React.RefObject<TinyMCEEditor | null>;
  onChangeHandler: (content: string, editor: TinyMCEEditor) => void;
  onBeforeAddUndoHandler: (e: any, editor: TinyMCEEditor) => void;
  editorValue: string;
}

const PostEditor: React.FC<PostEditorProps> = ({
  editorRef,
  onChangeHandler,
  onBeforeAddUndoHandler,
  editorValue,
}) => {
  // apiKey={tinyMCEAPI}
  // tinymceScriptSrc={'../../../' + '/tinymce/tinymce.min.js'}
  /*   const initHandler = (_evt, editor) => {

  } */

  return (
    <Editor
      tinymceScriptSrc={"/tinymce/tinymce.min.js"}
      licenseKey="gpl"
      onInit={(_evt, editor) => {
        if (editorRef) {
          editorRef.current = editor;
        }
      }}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
          "codesample",
        ],
        codesample_languages: [
          { text: "HTML/XML", value: "markup" },
          { text: "JavaScript", value: "javascript" },
          { text: "CSS", value: "css" },
        ],
        toolbar:
          "undo redo | blocks | codesample |" +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        placeholder: "This is a placholder",
      }}
      onEditorChange={onChangeHandler}
      onBeforeAddUndo={onBeforeAddUndoHandler}
      value={editorValue}
    />
  );
};

/* More codesample_languages' values:
 * { text: "PHP", value: "php" },
 * { text: "Ruby", value: "ruby" },
 * { text: "Python", value: "python" },
 * { text: "Java", value: "java" },
 * { text: "C", value: "c" },
 * { text: "C#", value: "csharp" },
 * { text: "C++", value: "cpp" },
 */

export default PostEditor;
