import React from 'react';
import { Container, Image } from 'react-bootstrap';

function Home() {
  return(
    <React.Fragment>
      <Container className="main">
        <Image className="CRT" src={require('./../../assets/images/CRT_Screen.png')}/>
        <div className="CRT-screen">
      <h2 className="format-font">†</h2>
      <h6 id="top-left">H3 Here is some information about our store</h6>
      <h6 id="top-right">H4 small</h6>
      <h6 id="bottom-left">H5 smaller</h6>
      <h6 id="bottom-right">H6 smallest</h6>
      </div>
      </Container>
    </React.Fragment>
  );
}

export default Home;