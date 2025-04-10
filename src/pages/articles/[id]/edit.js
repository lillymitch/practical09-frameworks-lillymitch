import PropTypes from "prop-types";
import React from "react";
import { useRouter } from "next/router";
import Editor from "../../../components/Editor";
import ArticleShape from "../../../components/ArticleShape.js";
import { useState } from "react";
import { useEffect } from "react";

export default function SimplepediaEditor({
  collection,
  setCollection,
  currentArticle,
  setCurrentArticle,
}) {
  const [title, setTitle] = useState(null);
  const [contents, setContents] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const articleId = parseInt(id, 10); // Convert id from string to number
    // console.log("Parsed articleId:", articleId); // Debugging log
    const articleFromCollection = collection.find(
      (article) => article.id === articleId,
    );

    if (
      articleFromCollection &&
      (!currentArticle || currentArticle.id !== articleId)
    ) {
      // console.log("Setting currentArticle:", articleFromCollection); // Debugging log
      setCurrentArticle(articleFromCollection);
    }
  }, [id, collection, currentArticle, setCurrentArticle]);

  useEffect(() => {
    if (currentArticle) {
      // console.log("Updating title and contents from currentArticle:", currentArticle); // Debugging log
      setTitle(currentArticle.title || "");
      setContents(currentArticle.contents || "");
    }
  }, [currentArticle]);

  const handleSave = (updatedContent) => {
    const updatedArticle = {
      ...currentArticle,
      title: updatedContent.title, // Update the title
      contents: updatedContent.contents, // Update the contents
    };
    setCollection(
      collection.map((article) =>
        article.id === currentArticle.id ? updatedArticle : article,
      ),
    );
    setCurrentArticle(updatedArticle);
    router.push(`/articles/${currentArticle.id}`);
  };

  const handleReset = () => {
    const originalArticle = collection.find(
      (article) => article.id === currentArticle.id,
    );
    setCurrentArticle(originalArticle);
    router.back();
  };
  // console.log("currentArticle in SimplepediaEditor:", currentArticle);
  // console.log("Updated collection:", collection);

  // Ensure currentArticle, title, and contents are available before rendering the Editor
  if (!currentArticle || title === null || contents === null) {
    return <p>Loading...</p>;
  }

  if (!currentArticle) {
    return <p>Article not found.</p>;
  }

  return (
    <Editor
      key={currentArticle?.id}
      currentArticle={{ ...currentArticle, title, contents }}
      onSave={handleSave}
      onReset={handleReset}
      complete={(updatedContent) => {
        if (updatedContent) {
          handleSave(updatedContent); // Save the updated content
        } else {
          handleReset(); // Reset to the original article
        }
      }}
    />
  );
}

SimplepediaEditor.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  setCollection: PropTypes.func.isRequired,
  currentArticle: ArticleShape.isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
};
