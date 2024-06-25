import React from 'react';
import './Header.scss';
import logo from '../../assets/Logo/InStock-Logo_1x.png';
// import {link} from 'react-router-dom';

function Header() {
  return (
    <nav className='header'>
        {/* <link to ="/"> */}
        <img src={logo} alt="InStock Logo" className="header__logo"/>
        <section className='header__container'>
        <h3>Warehouse</h3>
        <h3>Inventory</h3>
        </section>
        {/* </link> */}
        </nav>
  )
}

export default Header