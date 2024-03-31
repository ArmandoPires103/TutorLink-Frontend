import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import "../Components/Header.css"

const Header = () => {
  const { user } = useOutletContext() ?? {}; // Access user data provided by the Outlet's context

  // user is a null value so can't deconstruct so gotta use Nullish coalescing operator to put default value (if user is null which it is if user isn't logged in)

console.log (user)
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
        { !user ? (
          <li>
            <Link to="/login">Log In</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Log Out</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;