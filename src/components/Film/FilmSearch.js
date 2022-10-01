import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from 'firebase/firestore';
import db from './../../firebase.js';
import SearchResult from "./SearchResult";
import { Container, Form, InputGroup, Button, Row, Col } from "react-bootstrap";

function FilmSearch (props) {

  const [filmList, setFilmList] = useState([]);
  const [error, setError] = useState(null);
  // let searchResults = [];

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "movies"),
      (collectionSnapshot) => {
        const films = [];
        collectionSnapshot.forEach((doc) => {
          films.push({
            ...doc.data(),
            id: doc.id
          });
        });
        setFilmList(films);
      },
      (error) => {
        setError(error.message);
      }
    );

    return () => unSubscribe();
  }, []);

  const [values, setValues] = useState({
    title: "",
    startYear: 0,
    endYear: 3000,
    genres: []
  }); 
  const [submitted, setSubmitted] = useState(false);

  const [searchResults, setSearchResults] = useState(filmList);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    setSubmitted(true);
    search(values);
  }

  const handleTitleInput = (event) => {
    setValues({...values, title: event.target.value});
  }

  const handleStartYearInput = (event) => {
    setValues({...values, startYear: event.target.value});
  }

  const handleEndYearInput = (event) => {
    setValues({...values, endYear: event.target.value});
  }

  const handleGenreInput = (event) => {
    setValues({...values, genres: event.target.value})
  }

  const search = (values) => {
    setSearchResults([...filmList]);
    if (values.title !== "") { setSearchResults(searchResults => 
      [...searchResults].filter(film => 
        String(film.title).toLowerCase().includes(String(values.title).toLowerCase()) 
      )); 
    }
    if (values.startYear !== "") { 
      setSearchResults (searchResults => 
        [...searchResults].filter(film => film.releaseDate.split("-")[0] >= values.startYear)); 
    }
    if (values.endYear !== "") { 
      setSearchResults(searchResults => 
        [...searchResults].filter(film => film.releaseDate.split("-")[0] <= values.endYear)); 
    }
    if (values.genres !== "Select a genre") {
      console.log(values.genres);
      setSearchResults(searchResults => {
        [...searchResults].filter(film => {
          let filmGenres = film.genres.map(a => a.name);
          console.log(film.title, " ", filmGenres);
          return filmGenres.includes(String(values.genres)) ? film : null;
        });
        console.log("SEARCH RESULTS: ", searchResults);
        return searchResults;
      });
    }
  }

  return(
    <React.Fragment>
      <Container className="main">
        <Row>
          <Col sm={4}>
            <h1>Search Movies</h1>
            <Form id="searchForm" className="mt-2 mb-2" onSubmit={handleSubmit}>
              <InputGroup className="mb-2">
                <Form.Control
                  onChange={handleTitleInput}
                  placeholder="search by title"
                  value={values.title}
                />
              </InputGroup>
              <InputGroup className="mb-2">
                <Form.Control 
                  onChange={handleStartYearInput}
                  placeholder="from: 1980"
                />
                <Form.Control 
                  onChange={handleEndYearInput}
                  placeholder="to:&ensp;2000"
                />
              </InputGroup>
              <InputGroup>
                <Form.Select
                  onChange={handleGenreInput} >
                  <option>Select a genre</option>
                  <option value='Action'>Action</option>
                  <option value='Adventure'>Adventure</option>
                  <option value='Animation'>Animation</option>
                </Form.Select>
              </InputGroup>
              <Button className="end" type="submit">Search</Button>
            </Form>
          </Col>
          <Col sm={8}>
            <div className="searchResults">
              <h1>Results</h1>
              {searchResults.map(film => 
                <SearchResult 
                  title={film.title} 
                  year={film.releaseDate.split("-")[0]} 
                  overview={film.overview} 
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default FilmSearch;