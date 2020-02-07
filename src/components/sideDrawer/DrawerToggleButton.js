import React from "react";
import "./DrawerToggleButton.css";

const drawerToggleButton = props => {
  return (
    <button className="toggle-button" onClick={props.click}>
      <div className="toggle-button__elements" />
      <div className="toggle-button__elements" />
      <div className="toggle-button__elements" />
    </button>
  );
};

export default drawerToggleButton;
