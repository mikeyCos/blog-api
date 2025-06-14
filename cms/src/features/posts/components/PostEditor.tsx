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
        ],
        toolbar:
          "undo redo | blocks | " +
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

export default PostEditor;
