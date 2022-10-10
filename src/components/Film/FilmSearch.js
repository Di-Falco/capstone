import React, { useEffect, useState } from "react";
import SearchResult from "./SearchResult";
import Header from './../Header';
import { Container, Form, InputGroup, Row, Col } from "react-bootstrap";

function FilmSearch (props) {

  // const [filmList, setFilmList] = useState(props.filmList);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const unSubscribe = onSnapshot(
  //     collection(db, "movies"),
  //     (collectionSnapshot) => {
  //       const films = [];
  //       collectionSnapshot.forEach((doc) => {
  //         films.push({
  //           ...doc.data(),
  //           id: doc.id
  //         });
  //       });
  //       setFilmList(films);
  //     },
  //     (error) => {
  //       setError(error.message);
  //     }
  //   );

  //   return () => unSubscribe();
  // }, []);

  const [values, setValues] = useState({
    title: "",
    startYear: 0,
    endYear: 3000,
    genre: "",
    format: "",
    minRating: 0,
    maxRating: 10
  }); 

  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    search(values);
  }

  const handleTitleInput = (event) => {
    setValues({...values, title: event.target.value});
    search(values);
  }

  const handleStartYearInput = (event) => {
    let startYear;
    event.target.value === undefined ? startYear = 0 : startYear = event.target.value;
    setValues({...values, startYear: startYear});
    search(values);
  }

  const handleEndYearInput = (event) => {
    let endYear;
    event.target.value === undefined ? endYear = 0 : endYear = event.target.value;
    setValues({...values, endYear: endYear});
    search(values);
  }

  const handleGenreInput = (value) => {
    setValues({...values, genre: value});
    handleDisplay("select1");
  }

  const handleFormatInput = (value) => {
    setValues({...values, format: value});
    handleDisplay("select2")
  }

  const handleMinRating = (event) => {
    setValues({...values, minRating: event.target.value !== "" ? Number(event.target.value) : 0})
  }

  const handleMaxRating = (event) => {
    setValues({...values, maxRating: event.target.value !== "" ? Number(event.target.value) : 10})
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
    setSearchResults([...props.filmList]);
    setSearchResults(searchResults => 
      [...props.filmList].filter(film => {
        return (values.genre !== '' ? film.genres.map(a => a.name).includes(String(values.genre)) : film.genres.length !== 0) &&
        (values.format !== '' ? film.format.includes(String(values.format)) : film.format.length !== 0) &&
        String(film.title).toLowerCase().includes(String(values.title).toLowerCase()) &&
        film.releaseDate.split("-")[0] >= values.startYear &&
        film.releaseDate.split("-")[0] <= values.endYear &&
        film.rating >= values.minRating &&
        film.rating <= values.maxRating
      })
    ); 
    sortList();
  }

  useEffect(() => {
    search(values);
  }, [values])

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
      default:
        break;
    }
  }

  return(
    <React.Fragment>
      <Header />
      <Container className="main">
        <Row>
          <Col sm={4} className="search-column">
            <h1>Search Movies</h1>
            <Form id="searchForm" className="mt-2 mb-2" onSubmit={handleSubmit}>
              <InputGroup>
                <Form.Control
                  onChange={handleTitleInput}
                  placeholder="search by title"
                  value={values.title} />
              </InputGroup>
              <small> YEAR </small>
              <InputGroup>
                <Form.Control 
                  onChange={handleStartYearInput}
                  placeholder="min."
                />
                <Form.Control 
                  onChange={handleEndYearInput}
                  placeholder="max."
                />
              </InputGroup>
              <small> RATING </small>
              <InputGroup className="mb-2">
                <Form.Control 
                  onChange={handleMinRating}
                  placeholder="min."
                />
                <Form.Control 
                  onChange={handleMaxRating}
                  placeholder="max."
                />
              </InputGroup>
                <button className="select" onClick={() => handleDisplay("select1")}>{values.genre ? ">" + values.genre : "Select a genre"}</button>
                <div className="custom-select" id="select1">
                  <div className="stowed" id="selectOptions1">
                  <button className="select-btn" onClick={() => handleGenreInput('')}>--</button>
                  <button className="select-btn" onClick={() => handleGenreInput('Action')}>Action</button>
                  <button className="select-btn" onClick={() => handleGenreInput('Adventure')}>Adventure</button>
                  <button className="select-btn" onClick={() => handleGenreInput('Animation')}>Animation</button>
                  <button className="select-btn" onClick={() => handleGenreInput('Comedy')}>Comedy</button>
                  <button className="select-btn" onClick={() => handleGenreInput('Crime')}>Crime</button>
                  <button className="select-btn" onClick={() => handleGenreInput('Drama')}>Drama</button>
                  <button className="select-btn" onClick={() => handleGenreInput('Family')}>Family</button>
                  <button className="select-btn" onClick={() => handleGenreInput('Fantasy')}>Fantasy</button>
                  <button className="select-btn" onClick={() => handleGenreInput('History')}>History</button>
                  <button className="select-btn" onClick={() => handleGenreInput('Horror')}>Horror</button>
                  <button className="select-btn" onClick={() => handleGenreInput('Music')}>Music</button>
                  <button className="select-btn" onClick={() => handleGenreInput('Mystery')}>Mystery</button>
                  <button className="select-btn" onClick={() => handleGenreInput('Romance')}>Romance</button>
                  <button className="select-btn" onClick={() => handleGenreInput('Science Fiction')}>Science Fiction</button>
                  <button className="select-btn" onClick={() => handleGenreInput('Thriller')}>Thriller</button>
                  <button className="select-btn" onClick={() => handleGenreInput('TV Movie')}>TV Movie</button>
                  <button className="select-btn" onClick={() => handleGenreInput('War')}>War</button>
                  <button className="select-btn" onClick={() => handleGenreInput('Western')}>Western</button>
                  </div>
                </div>
              <button className="select" onClick={() => handleDisplay("select2")}>{values.format ? ">" + values.format + "" : "Select a Format"}</button>
                <div className="custom-select" id="select2">
                  <div className="stowed" id="selectOptions1">
                  <button className="select-btn" onClick={() => handleFormatInput('')}>--</button>
                  <button className="select-btn" onClick={() => handleFormatInput('DVD')}>DVD</button>
                  <button className="select-btn" onClick={() => handleFormatInput('BluRay')}>BluRay</button>
                  <button className="select-btn" onClick={() => handleFormatInput('VHS')}>VHS</button>
                  <button className="select-btn" onClick={() => handleFormatInput('LaserDisc')}>LaserDisc</button>
                  <button className="select-btn" onClick={() => handleFormatInput('Betamax')}>Betamax</button>
                  </div>
                </div>
            </Form>
          </Col>
          <Col sm={8} className="result-column">
            <div className="searchResults">
              {searchResults.map(film => 
                <SearchResult 
                  title={film.title} 
                  year={film.releaseDate.split("-")[0]} 
                  overview={film.overview} 
                  selectedFilm={film}
                  filmList={props.filmList}
                  id={film.id}
                  key={film.id}
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