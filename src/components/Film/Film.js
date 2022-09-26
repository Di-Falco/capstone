import React from "react";
import { Card } from "react-bootstrap";

function Film(props) {
  return(
    <React.Fragment>
    <Card className="filmCard" onClick = {() => props.whenFilmClicked(props.id)}>
      <Card.Img variant="top" src={props.backdrop}/>
      <Card.Body>
      <Card.Title>{props.title} ({props.releaseDate.split("-")[0]})</Card.Title>
      <Card.Text>{props.overview}</Card.Text>
      </Card.Body>
    </Card>
    </React.Fragment>
  );
}

export default Film;