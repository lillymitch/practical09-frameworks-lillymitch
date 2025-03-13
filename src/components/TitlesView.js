/*
  TitleList.js

  This module displays a list of titles and reports when a user clicks on one.

  props:
    articles - an array of objects with title and id properties
    setCurrentArticle - a callback that expects an article as an argument

*/
import PropTypes from "prop-types";
import ArticleShape from "./ArticleShape";

TitlesView.propTypes = {
  articles: PropTypes.arrayOf(ArticleShape).isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
};

export default function TitlesView({ articles, setCurrentArticle }) {
  const sortedArticles = [...articles].sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  return (
    <div>
      <ul>
        {sortedArticles.map((article) => (
          <li
            key={article.id}
            data-testid="title"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setCurrentArticle(article);
            }}
          >
            {article.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
