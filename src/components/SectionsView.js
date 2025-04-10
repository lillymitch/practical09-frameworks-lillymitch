/*
  SectionsView.js

  This module displays the sections and reports when a user clicks on one.

  props:
    sections - an array of section names
    setCurrentSection - a callback that expects a section as an argument

*/
import styles from "../styles/SectionsView.module.css";
import PropTypes from "prop-types";

export default function SectionsView({ sections, setCurrentSection }) {
  const sortedSections = [...sections].sort();

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      {sortedSections.map((section, index) => (
        <div
          key={index}
          data-testid="section"
          onClick={() => setCurrentSection(section)}
          style={{ cursor: "pointer" }}
        >
          {section}
        </div>
      ))}
    </div>
  );
}

SectionsView.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrentSection: PropTypes.func.isRequired,
};
