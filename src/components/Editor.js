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
import styles from "../styles/Editor.module.css";
import PropTypes from "prop-types";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          margin="normal"
          id="title"
          label="Title"
          error={!title}
          helperText={!title ? "Title can't be blank" : " "}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}></div>{" "}
      {/* Added space between title and contents */}
      <div className={styles.textareaContainer}>
        <TextField
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          fullWidth
          multiline
          rows={10}
          margin="normal"
          id="contents"
          label="Contents"
        />
      </div>
      <div style={{ marginBottom: "1rem" }}></div>{" "}
      {/* Added space between title and contents */}
      <div className={styles.buttonContainer}>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={!title.trim()}
            className={styles.saveButton}
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            variant="outlined"
            color="secondary"
            className={styles.cancelButton}
          >
            Cancel
          </Button>
        </Stack>
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
