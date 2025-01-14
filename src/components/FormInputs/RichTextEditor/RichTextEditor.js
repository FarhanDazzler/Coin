// import React, { useState, useEffect } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
// import { convertToRaw, ContentState, EditorState } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';

// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import './textEditor.css';

// export const TextEditor = ({ value, setFieldValue }) => {
//   const prepareDraft = (value) => {
//     const draft = htmlToDraft(value);
//     const contentState = ContentState.createFromBlockArray(draft.contentBlocks);
//     const editorState = EditorState.createWithContent(contentState);
//     return editorState;
//   };

//   const [editorState, setEditorState] = useState(
//     value ? prepareDraft(value) : EditorState.createEmpty(),
//   );

//   const onEditorStateChange = (editorState) => {
//     const forFormik = draftToHtml(convertToRaw(editorState.getCurrentContent()));
//     setFieldValue(forFormik);
//     setEditorState(editorState);
//   };
//   return (
//     <div>
//       <Editor
//         editorState={editorState}
//         toolbarClassName="custom-toolbar"
//         wrapperClassName="custom-wrapper"
//         editorClassName="custom-editor"
//         onEditorStateChange={onEditorStateChange}
//       />
//     </div>
//   );
// };
