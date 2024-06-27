// AddButton.jsx
import React from 'eact';

const AddButton = ({ onClick }) => {
  return (
    <button type="submit" className="button-add" onClick={onClick}>
      + Add Item
    </button>
  );
};

export default AddButton;