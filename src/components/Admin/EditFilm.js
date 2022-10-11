import React, { useState, useEffect } from 'react';
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './../../firebase.js';
import Header from './../Header';
import SearchResult from '../Film/SearchResult';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import $ from 'jquery';

function EditFilm (props) {
  const [searchResults, setSearchResults] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState(0);
  const [formats, setFormats] = useState([]);
  let newArray = [];

  useEffect(() => {
    searchTmdb(title);
  }, [title]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  }

  const handleDisplay = (title) => {
    const parent = document.getElementById(title);
    const child1 = (parent.children)[0];
    child1.classList.toggle("stowed");
  }

  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  }

  const handleIdInput = (event) => {
    setId(event.target.value);
  }

  const handleFormatInput = (value) => {
    console.log(formats);
    newArray = formats
    if (newArray.includes(value)) {
      newArray.splice(newArray.indexOf(value), 1) 
    } else { 
      newArray.push(value) 
    }
    setFormats(newArray);
    formats.length > 0 ? $(".select").html(" " + newArray.join(" / ")) : $(".select").html("select formats");
  }

  const findFilm = async (id) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7549b759940c60c10f1c789e68a231e9&language=en-US`);
      if(!response.ok) {
        throw Error(response.statusText);
      }
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch(error) {
      return error.message;
    }
  }

  const searchTmdb = async (title) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=7549b759940c60c10f1c789e68a231e9&language=&query=${title}&page=1&include_adult=false`);
      if(!response.ok) {
        throw Error(response.statusText);
      }
      const jsonResponse = await response.json();
      jsonResponse.results ? setSearchResults(jsonResponse.results) : setSearchResults(searchResults);
      jsonResponse.results ? setSubmitted(true) : setSubmitted(false);
      return jsonResponse;
    } catch(error) {
      return error.message;
    }
  } 

  const handleSelectingFilm = (film) => {
    setId(film.id);
  }

  const handleEditingFilm = async (id) => {
    if ( formats.length === 0 ) { 
      $("#status").html(`error: no formats`);
    } else {
      setFormats(formats);
      const stringifiedFormats = formats.join();
      const response = await findFilm(id);
      const movieToAdd = {
        id: id,
        title: String(response.title),
        genres: response.genres,
        language: response.original_language,
        overview: response.overview,
        posterUrl: ("https://image.tmdb.org/t/p/w154" + response.poster_path),
        backdrop: ("https://image.tmdb.org/t/p/w300" + (response.backdrop_path ? response.backdrop_path : response.poster_path)),
        rating: response.vote_average,
        releaseDate: response.release_date,
        runtime: response.runtime,
        tagline: (response.original_language === "en" ? response.tagline : response.original_title),
        available: "TRUE",
        format: stringifiedFormats,
      }
      await setDoc(doc(db, "movies", String(response.id)), movieToAdd);
      $("#status").html(`added TMDB #${response.id}`);
    }
  }

  return(
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
            <h1>Input TMDB ID</h1>
            <Form id="searchForm" className="mt-2 mb-2">
              <InputGroup>
                <Form.Control 
                  onChange={handleIdInput}
                  placeholder="TMDB ID"
                />
              </InputGroup>
            </Form>
            <h1>Select Formats</h1>
            <Form id="searchForm" className="mt-2 mb-2">           
              <button className="select" onClick={() => handleDisplay("select2")}>{"Select a Format"}</button>
              <div className="custom-select" id="select2">
                <div className="stowed" id="selectOptions1">
                <button className="select-btn" id="DVD" onClick={() => handleFormatInput('DVD')}>DVD</button>
                <button className="select-btn" id="BluRay" onClick={() => handleFormatInput('BluRay')}>BluRay</button>
                <button className="select-btn" id="VHS" onClick={() => handleFormatInput('VHS')}>VHS</button>
                <button className="select-btn" id="LaserDisc" onClick={() => handleFormatInput('LaserDisc')}>LaserDisc</button>
                <button className="select-btn" id="Betamax" onClick={() => handleFormatInput('Betamax')}>Betamax</button>
                </div>
              </div>
            </Form>
            <Button onClick={() => handleEditingFilm(id)}>Submit Edit</Button>
          </Col>
          <Col sm={7} className="result-column">
            { submitted ? 
              (searchResults).map(film => {
              return (<SearchResult 
                editing={true}
                handleSelectingFilm={() => handleSelectingFilm(film)}
                title={film.title} 
                year={film.release_date ? film.release_date.split("-")[0] : "XXXX"} 
                overview={film.overview} 
                selectedFilm={film}
                filmList={props.filmList}
                id={film.id}
                key={film.id}
              />);
            })
            : null}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default EditFilm;