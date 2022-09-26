import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

function FilmDetail(props) {
  const { film, handleSeedingMovieData } = props;
  console.log(film);
  return (
    <React.Fragment>
      <Button onClick = { () => handleSeedingMovieData(film) }>Update Movie Info</Button>
    </React.Fragment>
  );
}

FilmDetail.propTypes = {
  film: PropTypes.object,
  handleSeedingMovieData: PropTypes.func
}

export default FilmDetail;