import "./PageTop.scss";
import { Link } from "react-router-dom";
import searchIcon from "../../assets/icons/search-24px.svg";
import React from "react";
import AddButton from "../Button/AddButton/AddButton";

function PageTop({ link, buttonText }) {
  return (
    <section className="pagetop">
      <form className="pagetop__form">
        <div className="pagetop__container">
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
        <AddButton className="pagetop__button" buttonText={buttonText} />
      </Link>
    </section>
  );
}

export default PageTop;
