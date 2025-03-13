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

  const handleCancel = () => {
    complete();
  };

  const handleSave = () => {
    const timeStamp = new Date().toISOString();
    const newArticle = {
      ...currentArticle,
      id:
        typeof currentArticle?.id === "number"
          ? currentArticle.id
          : String(currentArticle?.id),
      title,
      contents,
      edited: timeStamp,
    };
    complete(newArticle);
  };

  return (
    <div className={styles.editorContainer}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter article title"
        className={styles.titleInput}
      />
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        placeholder="Enter article contents"
        className={styles.contentTextarea}
      />
      <div className={styles.buttonContainer}>
        <button onClick={handleCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <button
          onClick={handleSave}
          className={styles.saveButton}
          disabled={!title.trim()}
        >
          Save
        </button>
      </div>
    </div>
  );
}

Editor.propTypes = {
  currentArticle: ArticleShape,
  complete: PropTypes.func.isRequired,
};
