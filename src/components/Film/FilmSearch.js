import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from 'firebase/firestore';
import db from './../../firebase.js';
import SearchResult from "./SearchResult";
import Header from './../Header';
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

  const handleFirstGenreInput = (value) => {
    setValues({...values, genreOne: value})
  }

  const handleSecondGenreInput = (value) => {
    setValues({...values, genreTwo: value})
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

  const handleDisplay = (title) => {
    const parent = document.getElementById(title);
    const child1 = (parent.children)[0];
    child1.classList.toggle("stowed");
    switch (title) {
      case("select1"):
        (document.getElementById("select2").children)[0].classList.add("stowed");
        break;
      case("select2"):
        (document.getElementById("select1").children)[0].classList.add("stowed");
        break;
    }
  }

  // ————————————————————————————

  return(
    <React.Fragment>
      <Header />
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
                  placeholder="1980"
                />
                <Form.Control 
                  onChange={handleEndYearInput}
                  placeholder="2000"
                />
              </InputGroup>
                <button className="select" onClick={() => handleDisplay("select1")}>Select a genre</button>
                <div className="custom-select" id="select1">
                  <div className="stowed" id="selectOptions1">
                  <button className="select-btn" onClick={() => handleFirstGenreInput('')}>--</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('Action')}>Action</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('Adventure')}>Adventure</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('Animation')}>Animation</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('Comedy')}>Comedy</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('Crime')}>Crime</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('Drama')}>Drama</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('Family')}>Family</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('Fantasy')}>Fantasy</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('History')}>History</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('Horror')}>Horror</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('Music')}>Music</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('Mystery')}>Mystery</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('Romance')}>Romance</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('Science Fiction')}>Science Fiction</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('Thriller')}>Thriller</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('TV Movie')}>TV Movie</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('War')}>War</button>
                  <button className="select-btn" onClick={() => handleFirstGenreInput('Western')}>Western</button>
                  </div>
                </div>
              <button className="select" onClick={() => handleDisplay("select2")}>Select a genre</button>
                <div className="custom-select" id="select2">
                  <div className="stowed" id="selectOptions1">
                  <button className="select-btn" onClick={() => handleSecondGenreInput('')}>--</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('Action')}>Action</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('Adventure')}>Adventure</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('Animation')}>Animation</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('Comedy')}>Comedy</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('Crime')}>Crime</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('Drama')}>Drama</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('Family')}>Family</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('Fantasy')}>Fantasy</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('History')}>History</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('Horror')}>Horror</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('Music')}>Music</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('Mystery')}>Mystery</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('Romance')}>Romance</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('Science Fiction')}>Science Fiction</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('Thriller')}>Thriller</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('TV Movie')}>TV Movie</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('War')}>War</button>
                  <button className="select-btn" onClick={() => handleSecondGenreInput('Western')}>Western</button>
                  </div>
                </div>
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