import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return(
    <React.Fragment>
      <nav className="navbar sticky-top navbar-expand-lg justify-content-start">
        <h1>H1 MOVIE RENTAL</h1>
        <ul><li>
          <Link to="/" className="header"><h5>Home</h5></Link>
        </li></ul>
        <ul><li>
          <h5 className="header">Movies</h5>
          <ul>
            <li><p>Placeholder</p></li>
            <li><Link to="/movies"><p>Browse All Movies</p></Link></li>
          </ul>
        </li></ul>
      </nav>
    </React.Fragment>
  );
}

export default Header;