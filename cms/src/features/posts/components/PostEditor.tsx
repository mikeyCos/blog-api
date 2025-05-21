import { Editor } from "@tinymce/tinymce-react"; // React component Editor
import { Editor as TinyMCEEditor } from "tinymce"; // TinyMCE Editor

import React, { useRef } from "react";

import config from "../../../config/env.config";
// const { tinyMCEAPI } = config;

const PostEditor: React.FC<{
  editorRef: React.RefObject<TinyMCEEditor | null>;
}> = ({ editorRef }) => {
  // apiKey={tinyMCEAPI}
  // tinymceScriptSrc={'../../../' + '/tinymce/tinymce.min.js'}
  /*   const initHandler = (_evt, editor) => {

  } */
  // onInit={(_evt, editor) => { if (editorRef) { (editorRef.current = editor)}}}

  return (
    <Editor
      tinymceScriptSrc={"/tinymce/tinymce.min.js"}
      licenseKey="gpl"
      onInit={(_evt, editor) => {
        if (editorRef) {
          editorRef.current = editor;
        }
      }}
      initialValue="<p>This is the initial content of the editor.</p>"
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
      }}
    />
  );

  /* return (
    <>
      <p>PostEditor component</p>
      <button onClick={logPublicUrl}>Log Public URL</button>
    </>
  ); */
};

export default PostEditor;
