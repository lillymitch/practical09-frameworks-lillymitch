/*
  SectionsView.js

  This module displays the sections and reports when a user clicks on one.

  props:
    sections - an array of section names
    setCurrentSection - a callback that expects a section as an argument

*/
import styles from "../styles/SectionsView.module.css";
import PropTypes from "prop-types";

SectionsView.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrentSection: PropTypes.func.isRequired,
};

export default function SectionsView({ sections, setCurrentSection }) {
  const sortedSections = [...sections].sort();

  return (
    <div className={styles.sectionList}>
      <ul>
        {sortedSections.map((section) => (
          <li
            key={section}
            onClick={() => setCurrentSection(section)}
            data-testid="section"
          >
            {section}
          </li>
        ))}
      </ul>
    </div>
  );
}
