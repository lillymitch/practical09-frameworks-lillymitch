/*
  TitleList.js

  This module displays a list of titles and reports when a user clicks on one.

  props:
    articles - an array of objects with title and id properties
    setCurrentArticle - a callback that expects an article as an argument

*/
import PropTypes from "prop-types";
import ArticleShape from "./ArticleShape";
import { styled } from "@mui/material/styles";

TitlesView.propTypes = {
  articles: PropTypes.arrayOf(ArticleShape).isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
};

const NoBulletList = styled("ul")(() => ({
  listStyle: "none",
  paddingLeft: 0,
}));

export default function TitlesView({ articles, setCurrentArticle }) {
  const sortedArticles = [...articles].sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  // console.log("Articles in TitlesView:", articles);

  return (
    <NoBulletList>
      {sortedArticles.map((article) => (
        <li
          key={article.id}
          data-testid="title"
          onClick={() => setCurrentArticle(article)}
          style={{ cursor: "pointer" }}
        >
          {article.title}
        </li>
      ))}
    </NoBulletList>
  );
}
