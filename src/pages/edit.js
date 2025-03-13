import PropTypes from "prop-types";
import IndexBar from "./IndexBar";
import ArticleShape from "./ArticleShape.js";
import Article from "./Article";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function SimplepediaCreator({
  collection,
  setCollection,
  setCurrentArticle,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }

    // Determine the next available ID
    const maxID =
      collection.length > 0 ? Math.max(...collection.map((a) => a.id)) : 0;
    const newArticle = {
      id: maxID + 1,
      title,
      contents: content,
    };

    // add new article to collection
    setCollection([...collection, newArticle]);

    //set newly created article as the current article
    setCurrentArticle(newArticle);

    // clear input fields
    setTitle("");
    setContent("");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div>
      <h2>Create a Simplepedia Article</h2>
      <input
        type="text"
        placeholder="Enter article title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter article contents"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

SimplepediaCreator.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  setCollection: PropTypes.func.isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
};
