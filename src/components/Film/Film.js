import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Film(props) {
  const [loading, setLoading] = useState(true);

  return(
    <React.Fragment>
    <Link to={{
      pathname: `/details/${props.id}`
    }}>
    <Card className="filmCard" onClick = {() => props.whenFilmClicked(props.id)} style={loading ? { display:'none' } : {}}>
      <Card.Img src={props.posterUrl} onLoad={() => setLoading(false)}/>
      <Card.ImgOverlay className="hidden">
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2">({props.releaseDate.split("-")[0]})</Card.Subtitle>
        <Card.Subtitle>{(props.available === "TRUE") ? "Available" : "Unavailable"}</Card.Subtitle>
        <Card.Subtitle className="card-overview mt-2">{(props.overview) ? props.overview : null}</Card.Subtitle>
      </Card.ImgOverlay>
    </Card>
    </Link>
    </React.Fragment>
  );
}

export default Film;