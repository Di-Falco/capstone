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
    genreOne: "",
    genreTwo: ""
  }); 
  const [submitted, setSubmitted] = useState(false);

  const [searchResults, setSearchResults] = useState(filmList);

  const handleSubmit = (event) => {
    event.preventDefault();
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

  const handleFirstGenreInput = (event) => {
    setValues({...values, genreOne: event.target.value})
  }

  const handleSecondGenreInput = (event) => {
    setValues({...values, genreTwo: event.target.value})
  }

  const compare = (a, b) => {
    if (Number(a.id) < Number(b.id)) {
      return -1;
    }
    if (Number(a.id) > Number(b.id)) {
      return 1;
    }
    return 0;
  }

  const sortList = () => {
    setSearchResults(searchResults => searchResults.sort( compare ));
  }

  const search = (values) => {
    setSearchResults([...filmList]);
    setSearchResults(searchResults => 
      [...filmList].filter(film => {
        return (values.genreOne != '' ? film.genres.map(a => a.name).includes(String(values.genreOne)) : film.genres.length !== 0) &&
        (values.genreTwo != '' ? film.genres.map(a => a.name).includes(String(values.genreTwo)) : film.genres.length !== 0) &&
        String(film.title).toLowerCase().includes(String(values.title).toLowerCase()) &&
        film.releaseDate.split("-")[0] >= values.startYear &&
        film.releaseDate.split("-")[0] <= values.endYear
      })
    ); 
    sortList();
  }

  // const compareStrings = (string1, string2) => {
  //   string1.split("");
  //   string2.split("");
  //   let similarity = 0;
  //   string1.forEach( function(char, i) {
  //     if (char === string2[i])
  //     similarity++;
  //     if (string2.length === i)
  //     return similarity/string1.length;
  //   });
  //   return similarity /= string1.length;
  // }

  return(
    <React.Fragment>
      <Container className="main">
        <Row>
          <Col sm={4} className="search-column">
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
              <InputGroup className="mb-2">
                <Form.Select
                  onChange={handleFirstGenreInput} >
                  <option selected id="placeholder" value=''>Select a genre</option>
                  <option value='Action'>Action</option>
                  <option value='Adventure'>Adventure</option>
                  <option value='Animation'>Animation</option>
                  <option value='Comedy'>Comedy</option>
                  <option value='Crime'>Crime</option>
                  <option value='Drama'>Drama</option>
                  <option value='Family'>Family</option>
                  <option value='Fantasy'>Fantasy</option>
                  <option value='History'>History</option>
                  <option value='Horror'>Horror</option>
                  <option value='Music'>Music</option>
                  <option value='Mystery'>Mystery</option>
                  <option value='Romance'>Romance</option>
                  <option value='Science Fiction'>Science Fiction</option>
                  <option value='Thriller'>Thriller</option>
                  <option value='TV Movie'>TV Movie</option>
                  <option value='War'>War</option>
                  <option value='Western'>Western</option>
                </Form.Select>
              </InputGroup>
              <InputGroup className="mb-2">
                <Form.Select
                  onChange={handleSecondGenreInput} >
                  <option selected id="placeholder" value=''>Select a genre</option>
                  <option value='Action'>Action</option>
                  <option value='Adventure'>Adventure</option>
                  <option value='Animation'>Animation</option>
                  <option value='Comedy'>Comedy</option>
                  <option value='Crime'>Crime</option>
                  <option value='Drama'>Drama</option>
                  <option value='Family'>Family</option>
                  <option value='Fantasy'>Fantasy</option>
                  <option value='History'>History</option>
                  <option value='Horror'>Horror</option>
                  <option value='Music'>Music</option>
                  <option value='Mystery'>Mystery</option>
                  <option value='Romance'>Romance</option>
                  <option value='Science Fiction'>Science Fiction</option>
                  <option value='Thriller'>Thriller</option>
                  <option value='TV Movie'>TV Movie</option>
                  <option value='War'>War</option>
                  <option value='Western'>Western</option>
                </Form.Select>
              </InputGroup>
              <Button className="end" type="submit">Search</Button>
            </Form>
          </Col>
          <Col sm={8} className="result-column">
            <div className="searchResults">
              <h1>Results</h1>
              {(searchResults.length > 0 || !submitted) ? searchResults.map(film => 
                <SearchResult 
                  title={film.title} 
                  year={film.releaseDate.split("-")[0]} 
                  overview={film.overview} 
                  selectedFilm={film}
                  filmList={filmList}
                  id={film.id}
                  key={film.id}
                />
              ) : <h2>No movies in our inventory match your search</h2>}
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default FilmSearch;