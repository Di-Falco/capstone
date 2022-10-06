import React from "react";
import PropTypes from "prop-types";
import { Button, Image, Row, Col, Container } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import Header from './../Header';

function FilmDetail(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const film = props.filmList.find(film => film.id === id);
  let formats = film.format;
  if (formats.includes(',')) {formats = formats.split(',');} else {formats=[film.format]}
  let formatIcons = [];
  
  for (let i=0; i<formats.length; i++) {
    switch(formats[i]) {
      case('VHS'):
        formatIcons.push('|');
        break;
      case('DVD'):
        formatIcons.push(' V ');
        break;
      case('BluRay'):
        formatIcons.push(' I ');
        break;
      case('LaserDisc'):
        formatIcons.push(' û ');
        break;
      case('Betamax'):
        formatIcons.push(' \\ ');
    }
  }

  const starArray = [];
  for (let i=1; i<=5; i++) {
    i <= Math.round(+(film.rating))/2 ? starArray.push("★") : starArray.push("☆");
  }
  starArray.push(` [ ${(Number(film.rating)).toFixed(1)} ]`);


  return (
    <React.Fragment>
      <Header />
      <div className="jumbotron detail">
        <Image className="backdrop" src={`${film.backdrop}`} />
        <h3 className="bottom-left"><em>{film.title}</em></h3>
      </div>
      <div className="container details">  
      <Row>
      <Col sm={8}>
      <h4>({film.releaseDate.split("-")[0]})</h4>
      <h4 id="rating">{starArray}</h4>
      <h4 id="tagline">{film.tagline}</h4>
      <p id="be-kind-rewind">&emsp;{film.overview}</p>
      </Col>
      <Col sm={4} className="justify-content-center">
        <Image className="detailPoster img-btn" src={film.posterUrl} />
        <br />
        <h1 className='format-font'>{formatIcons.map((format) => format + "  ")}</h1>
      </Col>
      </Row>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <Link to={{
        pathname: `/rent/${film.id}`
      }}><Button>Rent</Button></Link>
      </div>
    </React.Fragment>
  );
}

FilmDetail.propTypes = {
  film: PropTypes.object,
  handleSeedingMovieData: PropTypes.func
}

export default FilmDetail;