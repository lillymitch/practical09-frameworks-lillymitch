import PropTypes from "prop-types";
import React from "react";
import { useRouter } from "next/router";
import Editor from "../../components/Editor";
import ArticleShape from "./ArticleShape.js";

export default function SimplepediaCreator({
  collection,
  setCollection,
  setCurrentArticle,
}) {
  const router = useRouter();

  const handleSave = (newArticle) => {
    // Determine the next available ID
    const maxID =
      collection.length > 0 ? Math.max(...collection.map((a) => a.id)) : 0;
    newArticle.id = maxID + 1;

    // Add new article to collection
    setCollection([...collection, newArticle]);

    // Set newly created article as the current article
    setCurrentArticle(newArticle);

    // Navigate back or to another page if needed
    router.push("/");
  };

  const handleCancel = () => {
    router.back();
  };

  const complete = (article) => {
    if (article && typeof article === "object") {
      if (
        typeof article.title === "string" &&
        article.title.trim() !== "" &&
        typeof article.contents === "string" &&
        article.contents.trim() !== ""
      ) {
        // Determine the next available ID
        const maxID =
          collection.length > 0 ? Math.max(...collection.map((a) => a.id)) : 0;
        article.id = maxID + 1;

        // Add the article to the collection
        setCollection([...collection, article]);

        // Set the newly created article as the current article
        setCurrentArticle(article);

        // Navigate back or to another page if needed
        router.push("/");
      }
    } else {
      // If the article is undefined, the user canceled
      router.back();
    }
  };

  return (
    <div>
      <h2>Create a Simplepedia Article</h2>
      <Editor
        currentArticle={{ title: "", contents: "" }}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}

SimplepediaCreator.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  setCollection: PropTypes.func.isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
};
