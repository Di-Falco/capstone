import React from 'react';
import Film from './Film';
import Header from './../Header';
import { auth } from './../../firebase.js';
import { Row, Col, Container, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

function FilmList(props) {

  let { currentPage } = useParams();
  currentPage = Number(currentPage);

  let row = 3;
  let pages = 0;

  const seedAll = (filmList) => {
    filmList.forEach(film => {
      props.handleSeedingMovieData(film);
    });
  }

  pages = Math.floor(props.filmList.length/12) + 1 
  const page = [];
  page.push(
    <Link to={{
      pathname: `/movies/${ currentPage > 1 ? currentPage - 1: 1 }`
    }}>
      <Button className="start">Prev</Button>
    </Link>
  );
  if (currentPage > pages - 2) page.push(<Button className="btn-group">...</Button>);
  for (let i = (currentPage > 3 ? currentPage-3 : 1); i <= (currentPage <= pages-3 ? currentPage+3 : pages); i++) {
    page.push(
      <Link to={{
        pathname: `/movies/${i}`
      }}>
      { (i === Number(currentPage)) ? <Button key={i} className="btn-group" id="currentPage"> {i} </Button> : <Button key={i} className="btn-group"> {i} </Button> }
      </Link>
    );
  }
  if (currentPage < 2) page.push(<Button className="btn-group">...</Button>);
  page.push(
    <Link to={{
      pathname: `/movies/${ currentPage > 1 ? currentPage + 1 : 1 }`
    }}>
      <Button className="end">Next</Button>
    </Link>
  );

  const arrayBlock = (filmList, index) => {
    const array = filmList.slice();
    const blocks = [];
    while (array.length) blocks.push(array.splice(0, index));
    return blocks;
  }

  const x = currentPage*12-12;
  const y = currentPage*12;
  return (
    <React.Fragment>
      <Header />
    <Container className="main list">
    { arrayBlock(Object.values(props.filmList.slice(x,y)), row).map((row, index) => (
    <React.Fragment>
    <Row>
    {(row).map((film) => 
      <React.Fragment>
      <Col key={film.id}>
      <Film
        whenFilmClicked = {props.onFilmSelection}
        title = {film.title}
        tagline = {film.tagline}
        releaseDate = {film.releaseDate}
        posterUrl = {film.posterUrl}
        backdrop={film.backdrop}
        format={film.format}
        available={film.available}
        rating={Math.floor(+(film.rating))}
        id = {film.id}
        key = {film.id}
      />
      </Col>
      </React.Fragment>
    )}
    </Row>
    <br />
    </React.Fragment>
  ))}
  {(auth.currentUser && auth.currentUser.email === "aodifalco@gmail.com") ? <Button onClick={() => seedAll(props.filmList)}>Seed ALL!</Button> : null}
  <div id="pagination">{page}</div>
  <br />
  </Container>
  </React.Fragment>
  );
}

export default FilmList;