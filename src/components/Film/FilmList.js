import React from 'react';
import Film from'./Film';
import { Button } from "react-bootstrap";

function FilmList(props) {

  const seedAll = (filmList) => {
    filmList.forEach(film => {
      if(film.posterUrl === "https://image.tmdb.org/t/p/original/") {
        props.handleSeedingMovieData(film);
      }
    });
  }

  return(
    <React.Fragment>
    {Object.values(props.filmList).map((film) => 
      <Film
        whenFilmClicked = {props.onFilmSelection}
        title = {film.title}
        releaseDate = {film.releaseDate}
        posterUrl = {film.posterUrl}
        overview = {film.overview}
        id = {film.id}
        key = {film.id}
      />
    )}
    <Button onClick={()=> seedAll(props.filmList)}>Update All</Button>
    </React.Fragment>
  );
}

export default FilmList;