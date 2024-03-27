// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import "../Components/Header.css"

const Header = () => {
  return (
    <nav className="nav__content">
      <div className="logo"><Link to="/">TutorLink</Link></div>
      <label htmlFor="check" className="checkbox">
        <i className="ri-menu-line"></i>
      </label>
      <input type="checkbox" name="check" id="check" />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Log In</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
