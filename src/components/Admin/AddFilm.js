import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import Header from './../Header';
import SearchResult from './../Film/SearchResult';

function AddFilm () {
  const [searchResults, setSearchResults] = useState([]);
  const [title, setTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setSearchResults(await searchTmdb(title));
    console.log(searchResults);
  }

  useEffect(() => {
      async function searchTmdb (title) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=7549b759940c60c10f1c789e68a231e9&language=&query=${title}&page=1&include_adult=true`);
        if(!response.ok) {
          throw Error(response.statusText);
        }
        const jsonResponse = await response.json();
        console.log(title, " ", jsonResponse);
        jsonResponse.results ? setSearchResults(jsonResponse.results) : setSearchResults(searchResults);
        jsonResponse.results ? setSubmitted(true) : setSubmitted(false);
        return jsonResponse;
      } catch(error) {
        return error.message;
      }
    } 
    searchTmdb(title);
  }, [title])

  return (
    <React.Fragment>
      <Header />
      <Container className="main">
        <Row>
          <Col sm={5} className="search-column" onSubmit={handleSubmit}>
            <h1>Search TMDB</h1>
            <Form id="searchForm" className="mt-2 mb-2">
              <InputGroup>
                <Form.Control 
                  onChange={handleTitleInput}
                  placeholder="title"
                />
              </InputGroup>
            </Form>
          </Col>
          <Col sm={7} className="result-column">
            { submitted ? 
              (searchResults).map(film => {
              return (<SearchResult 
                title={film.title} 
                year={film.release_date ? film.release_date.split("-")[0] : "XXXX"} 
                overview={film.overview} 
                selectedFilm={film}
                id={film.id}
                key={film.id}
              />);
            })
            : console.log("null")}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default AddFilm;