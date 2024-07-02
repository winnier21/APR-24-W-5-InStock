import React from "react";
import { useNavigate } from "react-router-dom";
import "./CancelButton.scss";

const CancelButton = ({ dialogRef }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (dialogRef) {
      dialogRef.current.close();
    } else {
      navigate(-1);
    }
  };

  return (
    <button className="button-cancel" type="button" onClick={handleCancel}>
      <h3>Cancel</h3>
    </button>
  );
};

export default CancelButton;
