import React from 'react';
import Film from'./Film';
import { Button, Row, Col } from "react-bootstrap";

function FilmList(props) {

  const seedAll = (filmList) => {
    filmList.forEach(film => {
      props.handleSeedingMovieData(film);
    });
  }

  return(
    <React.Fragment>
    {Object.values(props.filmList.slice(0,9)).map((film) => 
      <React.Fragment>
      <Row> 
      <Col>
      <Film
        whenFilmClicked = {props.onFilmSelection}
        title = {film.title}
        releaseDate = {film.releaseDate}
        posterUrl = {film.posterUrl}
        backdrop={film.backdrop}
        overview = {film.overview}
        id = {film.id}
        key = {film.id}
      />
      </Col>
      </Row>
      </React.Fragment>
    )}
    <Button onClick={()=> seedAll(props.filmList)}>Update All</Button>
    </React.Fragment>
  );
}

export default FilmList;