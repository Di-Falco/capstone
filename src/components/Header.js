import React from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

function Header() {
  return(
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/"><h1>H1 MOVIE RENTAL</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Movies" id="basic-nav-dropdown">
            <NavDropdown.Item href="/movies/search">Search Movies</NavDropdown.Item>
            <NavDropdown.Item href="/movies">Browse Movies</NavDropdown.Item>
            <NavDropdown.Item href="/screenings">Upcoming Screenings</NavDropdown.Item>
          </NavDropdown>
          <Nav.Item>
            <Nav.Link href="/events">Events</Nav.Link>
          </Nav.Item>
        </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    </React.Fragment>
  );
}

export default Header;