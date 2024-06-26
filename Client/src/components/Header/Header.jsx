import React from "react";
import "./Header.scss";
import logo from "../../assets/logo/InStock-Logo_1x.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
    <nav className="header">
      <div className="header__container">
        <div className="header__logo-container">
          <Link className="header__logo" to="/">
            <img src={logo} alt="InStock Logo" />
          </Link>
        </div>
        <section className="header__wrapper">
          <Link className="header__link" to="/warehouses">
            <h3>Warehouse</h3>
          </Link>
          <Link className="header__link" to="/inventory">
            <h3>Inventory</h3>
          </Link>
        </section>
      </div>
    </nav>
    </header>
  );
}

export default Header;
