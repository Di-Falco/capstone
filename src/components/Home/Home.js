import React from 'react';
import { Container, Image } from 'react-bootstrap';

function Home() {
  return(
    <React.Fragment>
      <Container className="main">
      <div className="menu">
        <h4>------------- MENU -------------</h4>
        <h4><a href="/"><button className="menu-btn">HOME</button></a>&emsp;<button className="menu-btn">ACCOUNT</button></h4>
        <h4><a href="/movies/1"><button className="menu-btn">BROWSE MOVIES</button></a>&emsp;<a href="/movies/search"><button className="menu-btn">SEARCH MOVIES</button></a></h4>
        <h2 className="format-font" id="fbi-font">†</h2>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Home;