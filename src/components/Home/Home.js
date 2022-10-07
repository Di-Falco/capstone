import React from 'react';
import { Container } from 'react-bootstrap';

function Home() {
  return(
    <React.Fragment>
      <Container className="main">
      <div className="menu">
        <h1>H1 Video</h1>
        <h4>---------MENU---------</h4>
        <h4><a href="/"><button className="menu-btn">HOME</button></a>&emsp;<a href="https://github.com/Di-Falco/capstone"><button className="menu-btn">INFO</button></a>&emsp;<a href="/account"><button className="menu-btn">ACCOUNT</button></a></h4>
        <h4><a href="/movies/1"><button className="menu-btn">BROWSE MOVIES</button></a>&emsp;<a href="/movies/search"><button className="menu-btn">SEARCH MOVIES</button></a></h4>
        <br />
        <h4>-----Be Kind, Rewind-----</h4>
        <h2 className="format-font" id="fbi-font">†</h2>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Home;