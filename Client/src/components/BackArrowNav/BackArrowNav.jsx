import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackArrowNav.scss";
import BackArrow from "../../assets/icons/arrow_back-24px.svg";

const BackArrowNav = () => {
  const navigate = useNavigate();
  const clickHandler = (event) => {
    navigate(-1);
  };
  return (
    <img
      src={BackArrow}
      className="back-arrow-nav"
      onClick={clickHandler}
      alt="arrow to navigate to previous page"
    />
  );
};

export default BackArrowNav;
