import React from 'react';
import { Container } from 'react-bootstrap';

function Home() {
  return(
    <React.Fragment>
      <Container className="main">
      <h2>H2 Welcome to the video store rental store place</h2>
      <h3>H3 Here is some information about our store</h3>
      <h4>H4 small</h4>
      <h5>H5 smaller</h5>
      <h6>H6 smallest</h6>
      <p>P paragraph text looks like this</p>
      </Container>
    </React.Fragment>
  );
}

export default Home;