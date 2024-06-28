// AddButton.jsx
import React from 'react';
import './AddButton.scss';

const AddButton = ({ onClick, buttonText }) => {
  return (
    <button type="submit" className="button button-add"  onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default AddButton;