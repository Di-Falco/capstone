import React from "react";
import PropTypes from "prop-types";
import { Button, Image } from "react-bootstrap";

function FilmDetail(props) {
  const { film, handleSeedingMovieData } = props;
  return (
    <React.Fragment>
      <h2>{film.title} ({film.releaseDate.split("-")[0]})</h2>
      <h4>{film.tagline}</h4>
      <Image className="poster" rounded="true" src={`${film.posterUrl}`}/>
      <p>{film.overview}</p>
      <Button onClick = { () => handleSeedingMovieData(film) }>Update Movie Info</Button>
    </React.Fragment>
  );
}

FilmDetail.propTypes = {
  film: PropTypes.object,
  handleSeedingMovieData: PropTypes.func
}

export default FilmDetail;