import React from "react";
import "./AddButton.scss";

const AddButton = ({ onClick, buttonText, className }) => {
  return (
    <button
      type="submit"
      className={`button button-add ${className}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default AddButton;
