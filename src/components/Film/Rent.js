import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import Header from './../Header';
import Film from './Film';

function Rent (props) {
  const { id } = useParams();
  const film = props.filmList.find(film => film.id === id);

  console.log(props.filmList);
  console.log(film);

  return (
    <React.Fragment>
      <Header />
      <Container className="main rent">
      <h1>Rent {film.title} ?</h1>
      <Row>
      <Col sm={6}>
      <br />
      <Form>
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
            placeholder="Exp. Date"
            // value={values.title} 
          />
          <Form.Control
            // onChange={handleTitleInput}
            placeholder="CVV"
            // value={values.title} 
          />
        </InputGroup>
      </Form>
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