import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CancelButton.scss';

const CancelButton = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1); // This will go back to the previous page
  };

  return (
    <button className="button-cancel" type="button" onClick={handleCancel}>
      <h3>Cancel</h3>
    </button>
  );
};

export default CancelButton;