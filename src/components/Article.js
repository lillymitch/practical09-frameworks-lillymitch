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

  return (
    <div className={styles.article}>
      <h2>{title}</h2>
      <p>{contents}</p>
      <p className={styles.timestamp}>{formattedDate}</p>
    </div>
  );
}

Article.propTypes = {
  currentArticle: ArticleShape.isRequired,
};
