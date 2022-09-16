import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return(
    <React.Fragment>
      <nav class="navbar sticky-top navbar-expand-lg justify-content-start">
        <h1>H1 MOVIE RENTAL</h1>
        <ul><li>
          <Link to="/" class="header">Home</Link> 
        </li></ul>
        <ul><li>
          <a class="header">Movies</a>
          <ul>
            <li><Link to="/movies">Browse All Movies</Link></li>
          </ul>
        </li></ul>
      </nav>
    </React.Fragment>
  );
}

export default Header;