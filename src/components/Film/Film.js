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
        <Card.Title >{props.title}</Card.Title>
        <Card.Subtitle>({props.releaseDate.split("-")[0]})</Card.Subtitle>
        {/* <Card.Text>{props.overview.length > 460 ? props.overview.slice(0, 460).concat("...") : props.overview}</Card.Text> */}
      </Card.ImgOverlay>
    </Card>
    </Link>
    </React.Fragment>
  );
}

export default Film;