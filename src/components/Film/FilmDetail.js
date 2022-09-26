import React from "react";
import PropTypes from "prop-types";
import { Button, Image, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function FilmDetail(props) {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  let film;
  const { handleSeedingMovieData } = props;

  if (id !== null) {
    film = props.filmList.find(film => film.id === id);
  } else {
    ({ film } = props);
  }

  return (
    <React.Fragment>
      <h2>{film.title} ({film.releaseDate.split("-")[0]})</h2>
      <h4>{film.tagline}</h4>
      <Row>
      <Col sm={4}>
      <Image className="poster mb-5" rounded="true" src={`${film.posterUrl}`}/>
      </Col>
      <Col sm={8}>
      <p>{film.overview}</p>
      </Col>
      </Row>
      <Button onClick = { () => handleSeedingMovieData(film) }>Update Movie Info</Button>
    </React.Fragment>
  );
}

FilmDetail.propTypes = {
  film: PropTypes.object,
  handleSeedingMovieData: PropTypes.func
}

export default FilmDetail;