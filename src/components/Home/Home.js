import React from 'react';
import { Container, Image } from 'react-bootstrap';

function Home() {
  return(
    <React.Fragment>
      <Container className="main">
      <div className="menu">
        <h4>------------- MENU -------------</h4>
        <h4><button className="menu-btn">HOME</button>&emsp;<button className="menu-btn">SEARCH MOVIES</button></h4>
        <h4><button className="menu-btn">BROWSE MOVIES</button>&emsp;<button className="menu-btn">SEARCH MOVIES</button></h4>
        <h2 className="format-font" id="fbi-font">†</h2>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Home;