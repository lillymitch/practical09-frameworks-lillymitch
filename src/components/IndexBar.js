/*
  IndexBar.js

  This component provides the section and title display that allows the user to 
  browse the available articles and select one for display. 

   props:
    collection - Array of articles in encyclopedia
    setCurrentArticle - Function to call set current article displayed
    currentArticle - The article to render
*/
import React, { useState } from "react";
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

  if (!Array.isArray(collection)) {
    return <div>Invalid collection data</div>;
  }

  const sections = [
    ...new Set(collection.map((a) => a.title[0].toUpperCase())),
  ].sort();

  const filteredArticles = currentSection
    ? collection.filter((a) => a.title.startsWith(currentSection))
    : [];

  const handleSectionClick = (section) => {
    if (section !== currentSection) {
      setCurrentSection(section);
      setCurrentArticle(null);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        {sections.map((section, index) => (
          <div
            key={index}
            data-testid="section"
            onClick={() => handleSectionClick(section)}
            style={{ cursor: "pointer" }}
          >
            {section}
          </div>
        ))}
      </div>
      {currentSection ? (
        <TitlesView
          articles={filteredArticles}
          setCurrentArticle={setCurrentArticle}
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
