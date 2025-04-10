/*
  IndexBar.js

  This component provides the section and title display that allows the user to 
  browse the available articles and select one for display. 

   props:
    collection - Array of articles in encyclopedia
    setCurrentArticle - Function to call set current article displayed
    currentArticle - The article to render
*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SectionsView from "./SectionsView";
import TitlesView from "./TitlesView";
import ArticleShape from "./ArticleShape";

export default function IndexBar({
  collection,
  setCurrentArticle,
  currentArticle,
}) {
  const [currentSection, setCurrentSection] = useState(null);

  useEffect(() => {
    if (currentArticle) {
      const articleSection = currentArticle.title[0].toUpperCase();
      // console.log("Article Section:", articleSection); // Debug log
      if (articleSection !== currentSection) {
        setCurrentSection(articleSection);
      }
    }
  }, [currentArticle, currentSection]);

  if (!Array.isArray(collection)) {
    return <div>Invalid collection data</div>;
  }

  const sections = [
    ...new Set(collection.map((a) => a.title[0].toUpperCase())),
  ].sort();

  const filteredArticles = currentSection
    ? collection.filter((a) =>
        a.title.toUpperCase().startsWith(currentSection.toUpperCase()),
      )
    : collection; // Show all articles when no section is selected
  // console.log("Filtered Articles:", filteredArticles);

  const handleSectionClick = (section) => {
    if (section !== currentSection) {
      // console.log("Setting current section to:", section);
      setCurrentSection(section);
      setCurrentArticle(null);
    }
  };

  const handleTitleClick = (article) => {
    // console.log("Setting current article to:", article);
    setCurrentArticle(article);
  };

  // console.log("Articles in IndexBar:", filteredArticles);
  // console.log("Current Section in IndexBar:", currentSection);
  // console.log("Current Article in IndexBar:", currentArticle);
  // console.log("Filtered Articles in IndexBar:", filteredArticles);
  // console.log("Current Section in IndexBar:", currentSection);
  // console.log("SectionsView received sections:", sections);
  // console.log("Sections in IndexBar:", sections);
  return (
    <div>
      <SectionsView
        sections={sections}
        setCurrentSection={handleSectionClick}
      />
      {currentSection ? (
        <TitlesView
          articles={filteredArticles}
          setCurrentArticle={handleTitleClick}
        />
      ) : (
        <p style={{ textAlign: "center" }}>Select a section</p>
      )}
    </div>
  );
}

IndexBar.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
  currentArticle: ArticleShape,
};
