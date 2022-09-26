import React, { useEffect, useState } from 'react';
import FilmList from './FilmList';
import FilmDetail from './FilmDetail';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { Button, Container, Form } from 'react-bootstrap';
import db from './../../firebase.js';
import { useNavigate, useParams } from "react-router-dom";

let redirectPage;

function FilmControl() {

  const [filmList, setFilmList] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  let { currentPage } = useParams();
  (currentPage).includes("id") ? (redirectPage === undefined ? redirectPage = 1 : redirectPage = redirectPage) : (redirectPage = currentPage);

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

  const handleClick = (event) => {
    console.log("CURRENT PAGE: " + currentPage);
    if (selectedFilm != null) {
      console.log("REDIRECT PAGE: " + redirectPage);
      navigate(`/movies/${redirectPage}`);
    }
  }

  const handleChangingSelectedFilm = (id) => {
    const selection = filmList
      .filter(film => film.id === id)[0];
    setSelectedFilm(selection);
  }

  const searchTmdb = async (tmdbId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=7549b759940c60c10f1c789e68a231e9&language=en-US`);
      if(!response.ok) {
        throw Error(response.statusText);
      }
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch(error) {
      return error.message;
    }
  }

  const handleSeedingMovieData = async (movieToEdit) => {
    const movieRef = doc(db, "movies", movieToEdit.id);
    const response = await searchTmdb(movieToEdit.tmdbId);
    movieToEdit.genres = response.genres;
    movieToEdit.language = response.original_language;
    movieToEdit.overview = response.overview;
    movieToEdit.posterUrl = "https://image.tmdb.org/t/p/original" + response.poster_path;
    if (response.backdrop_path !== null) {
      movieToEdit.backdrop = "https://image.tmdb.org/t/p/original" + response.backdrop_path;
    } else {
      movieToEdit.backdrop = "https://image.tmdb.org/t/p/original" + response.poster_path;
    }
    movieToEdit.rating = response.vote_average;
    movieToEdit.releaseDate = response.release_date;
    movieToEdit.runtime = response.runtime;
    if(response.original_language === "en") {
    movieToEdit.tagline = response.tagline;
    } else {
      movieToEdit.tagline = response.original_title;
    }
    await updateDoc(movieRef, movieToEdit);
    console.log("UPDATE REACHED");
  }

  let currentlyVisibleState = null;
  let buttonText = null;

  if (error) {
    currentlyVisibleState = <p>There was an error: {error}</p>
  } else if (selectedFilm != null) {
    currentlyVisibleState = 
    <FilmDetail 
      film = { selectedFilm } 
      filmList = { filmList } 
      handleSeedingMovieData = { handleSeedingMovieData } />
    buttonText = "Return to Movie List";
  } else {
    currentlyVisibleState = 
    <FilmList 
      filmList = { filmList }
      onFilmSelection = { handleChangingSelectedFilm }
      handleSeedingMovieData = { handleSeedingMovieData } />
    buttonText = "Placeholder";
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
      <Container className="main">
      {error ? null : 
        <Form onSubmit={handleClick}>
          <Button className="main-button" type="submit">{buttonText}</Button>
        </Form>
      }
      </Container>
    </React.Fragment>
  )
}

export default FilmControl;