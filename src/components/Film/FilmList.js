import React from 'react';
import Film from'./Film';

function FilmList(props) {
  return(
    <React.Fragment>
    {Object.values(props.filmList).map((film) => 
      <Film
        // whenFilmClicked = {props.onFilmSelection}
        title = {film.title}
        year = {film.year}
        poster = {film.poster}
        director = {film.director}
        decription = {film.description}
        id = {film.id}
        key = {film.id}
      />
    )}
    </React.Fragment>
  );
}

export default FilmList;