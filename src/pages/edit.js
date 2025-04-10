import PropTypes from "prop-types";
import React from "react";
import { useRouter } from "next/router";
import Editor from "../components/Editor";
import ArticleShape from "../components/ArticleShape.js";

export default function SimplepediaCreator({
  collection,
  setCollection,
  setCurrentArticle,
}) {
  const router = useRouter();

  const complete = (article) => {
    if (article && typeof article === "object") {
      const maxID =
        collection.length > 0 ? Math.max(...collection.map((a) => a.id)) : 0;
      article.id = article.id ?? maxID + 1;

      setCollection([...collection, article]);
      setCurrentArticle(article); // Ensure this is called
      router.push(`/articles/${article.id}`);
    } else {
      router.back();
    }
  };

  return (
    <div>
      <Editor complete={complete} />
    </div>
  );
}

SimplepediaCreator.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  setCollection: PropTypes.func.isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
};
