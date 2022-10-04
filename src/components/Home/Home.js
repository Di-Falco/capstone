import React from 'react';
import { Container, Image } from 'react-bootstrap';

function Home() {
  return(
    <React.Fragment>
      <Container className="main">
        <h2 className="format-font">†</h2>
        {/* <Image className="CRT" src={require('./../../assets/images/CRT_Screen.png')}/>
        <div className="CRT-screen">
      <h2 className="format-font">†</h2>
      <button><h3 id="top-left">CH0<br />PLAY<br />0:00:00</h3></button>
      <button><h3 id="top-right">TAPE<br />•REC<br />0:00:00</h3></button>
      <button><h3 id="bottom-left">TVÂ<br />SRC</h3></button>
      <button><h3 id="bottom-right">LPÂ<br />DST</h3></button>
      </div> */}
      </Container>
    </React.Fragment>
  );
}

export default Home;