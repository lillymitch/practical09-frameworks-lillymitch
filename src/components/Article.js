/*
  Article.js

  The Article displays the contents of an article.

  props:
    currentArticle - The article to render
*/
import styles from "../styles/Article.module.css";
import ArticleShape from "./ArticleShape";
import PropTypes from "prop-types";

export default function Article({ currentArticle }) {
  const { title, contents, edited } = currentArticle;

  const formattedDate = new Date(edited).toLocaleString("en-US", {
    hour12: true,
  });
  // console.log("Rendering Article with:", currentArticle);
  if (!currentArticle) {
    return null; // Render nothing if no article is selected
  }

  return (
    <div>
      <h1>{title}</h1> {/* Render the title */}
      <p>{contents}</p> {/* Render the contents */}
      <p>
        <strong>Last Edited:</strong> {formattedDate}
      </p>{" "}
      {/* Render the formatted date */}
    </div>
  );
}

Article.propTypes = {
  currentArticle: ArticleShape.isRequired,
};
