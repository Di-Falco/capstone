import React from 'react';

function Film(props) {
  return(
    <React.Fragment>
    <div onClick = {() => props.whenFilmClicked(props.id)}>
      <h3>{props.title} - {props.year}</h3>
      <h1>{props.poster}</h1>
      <h3>{props.director}</h3>
      <h5>{props.description}</h5>
    </div>
    <hr />
    </React.Fragment>
  );
}

export default Film;