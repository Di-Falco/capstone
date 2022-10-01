import React from "react";

function SearchResult(props) {

  const handleDisplay = (title) => {
    const parent = document.getElementById(title);
    const child1 = (parent.children)[1];
    const child2 = (parent.children)[2];
    child1.classList.toggle("stowed");
    child2.classList.toggle("stowed");
    parent.classList.toggle("search-border");
  }

  return (
    <React.Fragment>
      <div id={props.title} className="search-result" onClick={() => handleDisplay(props.title)}>
        <h1>{props.title} — {props.year}</h1>
        <p className="brief-overview">&emsp;{props.overview.slice(0, 90).concat('...')}</p>
        <p className="full-overview stowed">&emsp;{props.overview}</p>
      </div>
      <hr />
    </React.Fragment>
  );
}

export default SearchResult;