import React from "react";
import PropTypes from "prop-types";
import { Button, Image, Row, Col } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { auth } from './../../firebase.js';
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
        break;
      default:
        break;
    }
  }

  const starArray = [];
  for (let i=1; i<=5; i++) {
    (i*2 <= Math.round(+((film.rating).toFixed(1))) ? starArray.push("★") : (i*2 - 1 <= Math.round(+((film.rating).toFixed(1))) ? starArray.push("½") : starArray.push("☆")));
  }
  starArray.push(` [ ${(Number(film.rating)).toFixed(1)} ]`);

  const seed = async (id) => {
    console.log("I'm trying!");
  }

  return (
    <React.Fragment>
      <Header />
      <div className="jumbotron details">
        <Image className="backdrop" src={`${film.backdrop}`} />
        <h3 className="bottom-left" id="title"><em>{film.title}</em></h3>
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
      { (auth.currentUser && auth.currentUser.email === "aodifalco@gmail.com") ? <Link to={{ pathname: `/admin/edit/${film.id}` }}><Button>Edit</Button></Link> : null }
      { (auth.currentUser && auth.currentUser.email === "aodifalco@gmail.com") ? <Link to={{ pathname: `/admin/delete/${film.id}` }}><Button>Delete</Button></Link> : null }
      { (auth.currentUser && auth.currentUser.email === "aodifalco@gmail.com") ? <Button onClick={() => seed(film.id)}>sODA!</Button> : null }
      </div>
      <br id="hidden-br"/>
    </React.Fragment>
  );
}

FilmDetail.propTypes = {
  film: PropTypes.object,
  handleSeedingMovieData: PropTypes.func
}

export default FilmDetail;