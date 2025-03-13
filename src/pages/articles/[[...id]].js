import PropTypes from "prop-types";
import IndexBar from "../../components/IndexBar";
import ArticleShape from "../../components/ArticleShape.js";
import Article from "../../components/Article";

export default function Simplepedia({
  collection,
  currentArticle,
  setCurrentArticle,
}) {
  return (
    <>
      <IndexBar
        collection={collection}
        currentArticle={currentArticle}
        setCurrentArticle={setCurrentArticle}
      />
      ;{currentArticle && <Article currentArticle={currentArticle} />}
    </>
  );
}

Simplepedia.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  currentArticle: PropTypes.objectOf(ArticleShape),
  setCurrentArticle: PropTypes.func.isRequired,
};
