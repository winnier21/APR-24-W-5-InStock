import "./PageTop.scss";
import { Link } from "react-router-dom";
import searchIcon from "../../assets/icons/search-24px.svg";
import React from 'react';
import AddButton from "../Button/AddButton/AddButton";

function PageTop({page}) {
  return (
    <div>
        <img className="pagetop__icon" src="{searchIcon}" alt="search icon"></img>
        <input type="text" name="search" placeholder="Search..."/>
        <AddButton className="pagetop__button" buttonText="+ Add Warehouse" />
    </div>
  )
}

export default PageTop