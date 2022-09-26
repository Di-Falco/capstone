import React from 'react';
import Film from'./Film';

function FilmList(props) {
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
    </React.Fragment>
  );
}

export default FilmList;