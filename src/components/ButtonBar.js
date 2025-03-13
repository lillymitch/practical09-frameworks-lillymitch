/*
  ButtonBar.js

  The `ButtonBar` component is a simple collection of buttons.

  The bar has two states determined by `allowEdit`. If false, only an "Add" button is shown.
  If true, then "Add" and "Edit" are shown. 

  When a button is clicked, `handleClick` is called with "add", or "edit".

  props:
    allowEdit - a Boolean indicating if there is something that could be edited (required)
    handleClick - a function called when a button is clicked (required)
*/

import React from "react";
import PropTypes from "prop-types";

function ButtonBar({ allowEdit, handleClick }) {
  const handleAddClick = () => handleClick("add");
  const handleEditClick = () => handleClick("edit");

  return (
    <div>
      <button type="button" onClick={handleAddClick} data-testid="add-button">
        Add
      </button>
      {allowEdit && (
        <button
          type="button"
          onClick={handleEditClick}
          data-testid="edit-button"
        >
          Edit
        </button>
      )}
    </div>
  );
}

ButtonBar.propTypes = {
  allowEdit: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ButtonBar;
