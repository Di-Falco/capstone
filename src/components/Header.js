import React from 'react';
import { auth } from './../firebase.js';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

function Header() {
  return(
    <React.Fragment>
      <div className="header">
      <Navbar>
        <Container>
        <Navbar.Brand href="/"><h1>H1 VIDEO</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title=">Movies" id="basic-nav-dropdown">
            <NavDropdown.Item href="/movies/search">Search Movies</NavDropdown.Item>
            <NavDropdown.Item href="/movies/1">Browse Movies</NavDropdown.Item>
            {/* <NavDropdown.Item href="/screenings">Upcoming Screenings</NavDropdown.Item> */}
          </NavDropdown>
          <Nav.Item>
            <Nav.Link href="/account">{">Account"}</Nav.Link>
          </Nav.Item>
          { 
            (auth.currentUser && auth.currentUser.email === "aodifalco@gmail.com") ? 
            <NavDropdown title=">Inventory" id="basic-nav-dropdown">
              <NavDropdown.Item href="/admin/add">Add Movie</NavDropdown.Item>
            </NavDropdown> : 
            null
          }
        </Nav>
        </Navbar.Collapse>
        {(auth.currentUser) ? <p>{auth.currentUser.email}</p> : null}
        </Container>
        </Navbar>
        </div>
    </React.Fragment>
  );
}

export default Header;