import React from "react";
import PropTypes from "prop-types";
import { Button, Image, Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function FilmDetail(props) {
  console.log(props.film.tmdbId);
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
      <div className="jumbotron">
        <Image className="backdrop" src={`${film.backdrop}`}/>
      </div>
        <Container className="main">
      <h2>{film.title} ({film.releaseDate.split("-")[0]})</h2>
      <h4>{film.tagline}</h4>
      <Row>
      <Col sm={8}>
      <p>{film.overview}</p>
      </Col>
      </Row>
      <Button onClick = { () => handleSeedingMovieData(film) }>Update Movie Info</Button>
      </Container>
    </React.Fragment>
  );
}

FilmDetail.propTypes = {
  film: PropTypes.object,
  handleSeedingMovieData: PropTypes.func
}

export default FilmDetail;