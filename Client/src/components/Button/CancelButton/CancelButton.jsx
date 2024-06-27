import React from 'react';
import './CancelButton.scss';

const CancelButton = ({ onClick }) => {
  return (
    <button className="button-cancel" type="button" onClick={onClick}>
      <h3>Cancel</h3>
    </button>
  );
};

export default CancelButton;