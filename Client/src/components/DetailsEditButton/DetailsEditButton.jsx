import React from "react";
import { useNavigate } from "react-router-dom";
import "./DetailsEditButton.scss";
import HeaderEditButton from "../../assets/icons/edit-white-24px.svg";

const DetailsEditButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    const currentPath = window.location.pathname;
    const newPath = `${currentPath}/edit`;
    navigate(newPath);
  };
  return (
    <>
      <button className="edit-link" onClick={handleClick}>
        <img src={HeaderEditButton} className="edit-link__icon" />
        <h3 className="edit-link__text">Edit</h3>
      </button>
    </>
  );
};

export default DetailsEditButton;
