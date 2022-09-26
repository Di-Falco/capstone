import React from 'react';
import Film from'./Film';
import { Button, Row, Col } from "react-bootstrap";

function FilmList(props) {
  let amt = 0;
  let count = 0;
  let row = 3;

  const seedAll = (filmList) => {
    filmList.forEach(film => {
      props.handleSeedingMovieData(film);
    });
  }

  const arrayBlock = (filmList, index) => {
    const array = filmList.slice();
    const blocks = [];
    while (array.length) blocks.push(array.splice(0, index));
    return blocks;
  }

  const tally = () => {
    count = amt++;
  }

  return(
    arrayBlock(Object.values(props.filmList.slice(0,9)), row).map((row, index) => (
    <React.Fragment>
    <Row>
    {(row).map((film) => 
      <React.Fragment>
        {tally()}
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
      </React.Fragment>
    )}
    </Row>
    <br />
    </React.Fragment>
  )))
}

export default FilmList;