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
import Simplepedia from "@/pages/articles/[[...id]]";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function ButtonBar({ allowEdit, handleClick }) {
  return (
    <ButtonGroup variant="contained" sx={{ my: 2 }}>
      <Button onClick={() => handleClick("add")}>Add</Button>
      {allowEdit && <Button onClick={() => handleClick("edit")}>Edit</Button>}
    </ButtonGroup>
  );
}

ButtonBar.propTypes = {
  allowEdit: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
