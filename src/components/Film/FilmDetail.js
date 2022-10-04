import React from "react";
import PropTypes from "prop-types";
import { Button, Image, Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function FilmDetail(props) {
  const { id } = useParams();
  let film;

  console.log("ID: ", id);

  console.log(props.filmList);

  if (id !== null) {
    film = props.filmList.find(film => film.id === id);
  } else {
    ({ film } = props);
  }

  console.log("FILM: ",film);

  let formats = film.format;
  console.log("PROPS: ", film.format);
  console.log("FORMATS: ", formats);
  if (formats.includes(',')) {formats = formats.split(',');} else {formats=[film.format]}
  let formatIcons = [];
  
  for (let i=0; i<formats.length; i++) {
    switch(formats[i]) {
      case('VHS'):
        formatIcons.push('|');
        break;
      case('DVD'):
        formatIcons.push('V');
        break;
      case('BluRay'):
        formatIcons.push('I');
        break;
      case('LaserDisc'):
        formatIcons.push('û');
        break;
      case('Betamax'):
        formatIcons.push('\\');
    }
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
        <div className="img-btn"><Image className="detailPoster" src={film.posterUrl}></Image></div>
        <br />
        <h1 className='format-font'>{formatIcons.map((format) => format + "  ")}</h1>
      </Col>
      </Row>
      {/* <Button onClick = { () => handleSeedingMovieData(film) }>Update Movie Info</Button> */}
      </Container>
    </React.Fragment>
  );
}

FilmDetail.propTypes = {
  film: PropTypes.object,
  handleSeedingMovieData: PropTypes.func
}

export default FilmDetail;