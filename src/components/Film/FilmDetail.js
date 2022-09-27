import React from "react";
import PropTypes from "prop-types";
import { Button, Image, Row, Col, Container } from "react-bootstrap";
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
      <div className="jumbotron detail">
        <Image className="backdrop" src={`${film.backdrop}`} />
        <h1 className="bottom-left">{film.title}</h1>
      </div>
      <Container className="main detail">  
      <Row>
      <Col sm={8}>
      <h2>({film.releaseDate.split("-")[0]})</h2>
      <h4>{film.tagline}</h4>
      <p>{film.overview}</p>
      </Col>
      <Col sm={4} className="justify-content-center">
        <Button className="img-btn"><Image className="detailPoster" src={film.posterUrl}></Image></Button>
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