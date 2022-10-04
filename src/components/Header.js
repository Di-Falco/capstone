import React from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

function Header() {
  return(
    <React.Fragment>
      <Navbar>
        <Container>
        <Navbar.Brand href="/"><h1>H1 VIDEO</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="ÂMovies" id="basic-nav-dropdown">
            <NavDropdown.Item href="/movies/search">Search Movies</NavDropdown.Item>
            <NavDropdown.Item href="/movies/1">Browse Movies</NavDropdown.Item>
            <NavDropdown.Item href="/screenings">Upcoming Screenings</NavDropdown.Item>
          </NavDropdown>
          <Nav.Item>
            <Nav.Link href="/events">ÂEvents</Nav.Link>
          </Nav.Item>
        </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    </React.Fragment>
  );
}

export default Header;