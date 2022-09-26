import React from 'react';

function Film(props) {
  return(
    <React.Fragment>
    <div onClick = {() => props.whenFilmClicked(props.id)}>
      <h3>{props.title} ({props.releaseDate})</h3>
      <h1>{props.poster}</h1>
      <h5>{props.overview}</h5>
    </div>
    <hr />
    </React.Fragment>
  );
}

export default Film;