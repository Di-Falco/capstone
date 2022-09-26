import React from 'react';
import Film from'./Film';
import { Row, Col } from "react-bootstrap";

function FilmList(props) {
  let row = 3;

  // const seedAll = (filmList) => {
  //   filmList.forEach(film => {
  //     props.handleSeedingMovieData(film);
  //   });
  // }

  const arrayBlock = (filmList, index) => {
    const array = filmList.slice();
    const blocks = [];
    while (array.length) blocks.push(array.splice(0, index));
    return blocks;
  }



  return(
    arrayBlock(Object.values(props.filmList.slice(0,12)), row).map((row, index) => (
    <React.Fragment>
    <Row key={index}>
    {(row).map((film) => 
      <React.Fragment>
      <Col key={film.id}>
      <Film
        whenFilmClicked = {props.onFilmSelection}
        title = {film.title}
        tagline = {film.tagline}
        releaseDate = {film.releaseDate}
        posterUrl = {film.posterUrl}
        backdrop={film.backdrop}
        overview = {film.overview}
        id = {film.id}
        key = {film.id}
      />
      </Col>
      </React.Fragment>
    )}
    </Row>
    <br />
    </React.Fragment>
  )))
}

export default FilmList;