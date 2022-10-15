import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './../../firebase.js';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../Header';
import Film from '../Film/Film';

function DeleteFilm (props) {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  const film = props.filmList.find(film => film.id === id);

  const deleteFilm = async (id) => {
    await deleteDoc(doc(db, "movies", id));
    setResult(`movie #${id} has been deleted`);
  }

  return(
    <React.Fragment>
      <Header />
      <Container className="main">
        <Row className="mb-2 mt-2">
          <h1>Do you want to remove this film from inventory?</h1>
          <Col sm={6} className="mb-2 mt-2">
            <h1>Delete <em>{film.title}</em> ?</h1>
            <Button onClick={() => deleteFilm(film.id)}>Delete</Button>
            <h1>{result}</h1>
          </Col>
          <Col sm={4} className="mb-2 mt-2">
            { result !== null ? null : 
              <Film
                title = {film.title}
                releaseDate = {film.releaseDate}
                posterUrl = {film.posterUrl}
                available={film.available}
                id = {film.id}
                key = {film.id}
              />
            }
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default DeleteFilm;