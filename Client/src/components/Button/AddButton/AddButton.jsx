// AddButton.jsx
import React from 'react';
import './AddButton.scss';

const AddButton = ({ onClick }) => {
  return (
    <button type="submit" className="button-add"  onClick={onClick}>
      + Add Item
    </button>
  );
};

export default AddButton;