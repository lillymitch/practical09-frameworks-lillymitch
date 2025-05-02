import PropTypes from "prop-types";
import IndexBar from "../../components/IndexBar";
import Article from "../../components/Article";
import ButtonBar from "../../components/ButtonBar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

export default function Simplepedia({
  collection: initialCollection,
  currentArticle,
  setCurrentArticle,
}) {
  const router = useRouter();
  const [collection, setCollection] = useState(initialCollection);

  const handleClick = (action) => {
    if (action === "edit" && currentArticle) {
      router.push(`/articles/${currentArticle.id}/edit`);
    } else if (action === "add") {
      router.push("/edit");
    }
  };

  useEffect(() => {
    // console.log("Router Query ID:", router.query.id);

    // Handle cases where router.query.id is an array
    const articleId = Array.isArray(router.query.id)
      ? parseInt(router.query.id[0], 10)
      : parseInt(router.query.id, 10);

    const article = collection.find((a) => a.id === articleId); // Find the article in the collection
    if (article && article.id !== currentArticle?.id) {
      setCurrentArticle(article); // Set the article as the currentArticle
    }
  }, [router.query.id, collection, currentArticle, setCurrentArticle]);

  // console.log("Collection:", collection);

  return (
    <>
      <ButtonBar
        allowEdit={!!currentArticle} // Show "Edit" button only if an article is selected
        handleClick={handleClick}
      />
      <IndexBar
        collection={collection}
        currentArticle={currentArticle}
        setCurrentArticle={setCurrentArticle}
      >
        {currentArticle && <Article currentArticle={currentArticle} />}
      </IndexBar>
    </>
  );
}

Simplepedia.propTypes = {
  currentArticle: PropTypes.shape({
    title: PropTypes.string,
    contents: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    edited: PropTypes.string,
  }),
  collection: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      contents: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
};
