import React from "react";
import { Card, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Film(props) {

  // return(
  //   <React.Fragment>
  //     <Row>
  //       <Image thumbnail="true" src={props.posterUrl} className="thumbnail"/>
  //       <h2>{props.title} ({props.releaseDate.split("-")[0]})</h2>
  //       <p>{props.tagline}</p>

  //     </Row>
  //   </React.Fragment>
  // );

  return(
    <React.Fragment>
    <Link to={{
      pathname: "/movies", 
      search: `?id=${props.id}`
    }}>
    <Card className="filmCard" onClick = {() => props.whenFilmClicked(props.id)}>
      <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Subtitle>({props.releaseDate.split("-")[0]})</Card.Subtitle>
      <Card.Text>{props.tagline}</Card.Text>
      </Card.Body>
      <Card.Img variant="bottom" src={props.backdrop}/>
    </Card>
    </Link>
    </React.Fragment>
  );
}

export default Film;