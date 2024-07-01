import "./PageTop.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../assets/icons/search-24px.svg";
import AddButton from "../Button/AddButton/AddButton";

function PageTop({ link, buttonText }) {
  const [isContainerActive, setIsContainerActive] = useState(false);

  const handleInputFocus = () => {
    setIsContainerActive(true);
  };
  const handleInputBlur = () => {
    setIsContainerActive(false);
  };
  return (
    <section className="pagetop">
      <form className="pagetop__form">
        <div 
        className={`pagetop__container ${isContainerActive ? "active" : ""}`}
        onFocus={handleInputFocus} onBlur={handleInputBlur}
        >
          <input
            className="pagetop__search"
            type="text"
            name="search"
            placeholder="Search..."
          />
          <img className="pagetop__icon" src={searchIcon} alt="search icon" />
        </div>
      </form>
      <Link to={link}>
        <AddButton buttonText={buttonText} />
      </Link>
    </section>
  );
}

export default PageTop;
