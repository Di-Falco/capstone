import React from "react";
import { Button, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom";

function SearchResult(props) {

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
      <div id={props.title} className="search-result" onClick={() => handleDisplay(props.title)}>
        <h1>{props.title} — {props.year}</h1>
        <p className="brief-overview">&emsp;{props.overview.slice(0, 90).concat('...')}</p>
        <Row className="stowed">
          <Col sm={10}>
            <p className="full-overview">&emsp;{props.overview}</p>
          <br />
          </Col>
          <Col sm={2}>
            { props.filmList.map(a => a.tmdbId).includes(props.tmdbId) ? <Link to={`/details/${props.id}`}><Button id={props.id} className="details-button">Details</Button></Link> : <Button className="details-button">Select</Button> }
          </Col>
        </Row>
      </div>
      <hr />
    </React.Fragment>
  );
}

export default SearchResult;