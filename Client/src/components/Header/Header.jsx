import React from "react";
import "./Header.scss";
import logo from "../../assets/logo/InStock-Logo_1x.png";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

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
            <Link
              className={`header__link ${
                location.pathname === "/warehouse" ||
                location.pathname.startsWith("/warehouse/")
                  ? "active"
                  : ""
              }`}
              to="/warehouse"
            >
              <h3>Warehouse</h3>
            </Link>
            <Link
              className={`header__link ${
                location.pathname === "/inventory" ||
                location.pathname.startsWith("/inventory/")
                  ? "active"
                  : ""
              }`}
              to="/inventory"
            >
              <h3>Inventory</h3>
            </Link>
          </section>
        </div>
      </nav>
    </header>
  );
}

export default Header;
