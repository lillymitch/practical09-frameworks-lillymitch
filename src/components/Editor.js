/*
  Editor.js

  This provides a basic editor with space for entering a title and a body.

  The interface has two buttons. If "Cancel" is clicked, the `complete` callback
  is called with no arguments. If the "Save" button is clicked, the `complete` callback
  is called with a new article object with `title`, `contents`, and `date`. 

  If the optional `article` prop is set, the `title` and `contents` fields of the component
  are pre-loaded with the values. In addition, all other properties of the object are 
  included in the returned article object. 

  props:
    currentArticle - object with `title` and `contents` properties at minimum
    complete - function to call on completion (required)
*/

import ArticleShape from "./ArticleShape";
import styles from "../styles/Editor.module.css";
import PropTypes from "prop-types";
import React, { useState } from "react";

export default function Editor({ currentArticle, complete }) {
  const [title, setTitle] = useState(currentArticle?.title || "");
  const [contents, setContents] = useState(currentArticle?.contents || "");

  const handleSave = () => {
    const updatedArticle = {
      ...currentArticle,
      title: title.trim(),
      contents: contents.trim(),
      edited: new Date().toISOString(),
    };
    complete(updatedArticle);
  };
  const handleCancel = () => {
    complete();
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title must be set"
          className={styles.titleInput}
          aria-label="Article Title"
        />
      </div>
      <div style={{ marginBottom: "1rem" }}></div>{" "}
      {/* Added space between title and contents */}
      <div className={styles.textareaContainer}>
        <textarea
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          placeholder="Contents"
          className={styles.contentTextarea}
          aria-label="Article Contents"
          rows="10" // Increased the number of rows to make the text box larger
          style={{ width: "100%" }} // Added inline style to make the text box wider
        />
      </div>
      <div style={{ marginBottom: "1rem" }}></div>{" "}
      {/* Added space between title and contents */}
      <div className={styles.buttonContainer}>
        <button
          onClick={handleSave}
          className={styles.saveButton}
          disabled={!title.trim()}
        >
          Save
        </button>
        <button onClick={handleCancel} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
}

Editor.propTypes = {
  currentArticle: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
  }),
  complete: PropTypes.func.isRequired,
};
