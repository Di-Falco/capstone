import React, { useState } from 'react';
import { auth } from './../../firebase.js';
import { useParams } from "react-router-dom";
import { Container, Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import Header from './../Header';
import Film from './Film';

function Rent (props) {
  const { id } = useParams();
  const film = props.filmList.find(film => film.id === id);
  let formats = film.format;
  const [selectedFormat, setSelectedFormat] = useState(null);
  if (formats.includes(',')) {formats = formats.split(',');} else {formats=[film.format]}

  const handleDisplay = (title) => {
    const parent = document.getElementById(title);
    const child1 = (parent.children)[0];
    child1.classList.toggle("stowed");
  }

  const handleFormatSelection = (event) => {
    setSelectedFormat(event.target.value);
    console.log(selectedFormat);
    handleDisplay("select-format");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <Header />
      <Container className="main rent">
      <h1>Rent <em>{film.title}</em> ?</h1>
      <Row>
      <Col sm={7}>
      <Form onSubmit={handleSubmit}>
        <button className="select" onClick={() => handleDisplay("select-format")}>{selectedFormat ? ">" + selectedFormat : "Select a Format"}</button>
          <div className="custom-select" id="select-format"> 
            <div className="stowed" id="selectOptions1">
              {formats.map(format => 
                <button onClick={handleFormatSelection} className="select-btn" value={format}>{format}</button>
              )}
            </div>
          </div>
          <h1 className="mb-2 mt-2">Payment Info</h1>
        <InputGroup className="mb-2">
          <Form.Control
            // onChange={handleTitleInput}
            placeholder="0000 0000 0000 0000"
            // value={values.title} 
          />
        </InputGroup>
        <InputGroup className="mb-2">
          <Form.Control
            // onChange={handleTitleInput}
            placeholder="MM/YY"
            // value={values.title} 
          />
          <Form.Control
            // onChange={handleTitleInput}
            placeholder="CVV"
            // value={values.title} 
          />
        </InputGroup>
        {(auth.currentUser === null) ? <InputGroup><Form.Control placeholder="email"/></InputGroup> : null}
        <Button type="submit">Confirm Rental</Button>
      </Form>
      {/* All rentals are due back within 7 days. There is no late fee. */}
      <h1 className="mt-2" id="be-kind-rewind">Be kind, rewind.</h1>
      </Col>
      <Col sm={5}>
      <Film
        title = {film.title}
        releaseDate = {film.releaseDate}
        posterUrl = {film.posterUrl}
        overview = {film.overview}
        format={film.format}
        available={film.available}
        id = {film.id}
        key = {film.id}
      />
      </Col>
      </Row>
      </Container>
    </React.Fragment>
  );
}

export default Rent;