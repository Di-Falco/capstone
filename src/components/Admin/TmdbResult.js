import React from "react";
import { Button, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom";

function TmdbResult(props) {
  const { film } = props;

  const handleDisplay = (title) => {
    const parent = document.getElementById(title);
    const child1 = (parent.children)[2];
    child1.classList.toggle("stowed");
    const child2 = (parent.children)[1];
    child2.classList.toggle("stowed");
    parent.classList.toggle("search-border");
  }

  return (
    <React.Fragment>
      <div id={film.title} className="search-result" onClick={() => handleDisplay(film.title)}>
        <h1>{film.title} — {film.year}</h1>
        <p className="brief-overview">&emsp;{film.overview.slice(0, 90).concat('...')}</p>
        <Row className="stowed">
          <Col sm={10}>
            <p className="full-overview">&emsp;{film.overview}</p>
          <br />
          </Col>
          <Col sm={2}>
            <Link to={`/details/${film.id}`}><Button id={film.id} className="details-button">Details</Button></Link>
          </Col>
        </Row>
      </div>
      <hr />
    </React.Fragment>
  );
}

export default TmdbResult;