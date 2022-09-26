import React, { useEffect, useState } from 'react';
import FilmList from './FilmList';
import FilmDetail from './FilmDetail';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { Button, Container } from 'react-bootstrap';
import db from './../../firebase.js';

function FilmControl() {

  const [filmList, setFilmList] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [error, setError] = useState(null);

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

  const handleClick = () => {
    if (selectedFilm != null) {
      setSelectedFilm(null);
    }
  }

  const handleChangingSelectedFilm = (id) => {
    const selection = filmList
      .filter(film => film.id === id)[0];
    setSelectedFilm(selection);
  }

  const searchTmdb = async (tmdbId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=&language=en-US`);
      if(!response.ok) {
        console.log(response);
        throw Error(response.statusText);
      }
      const jsonResponse = await response.json();
      console.log(jsonResponse);
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
    movieToEdit.posterUrl = movieToEdit.posterUrl + response.poster_path;
    movieToEdit.rating = response.vote_average;
    movieToEdit.releaseDate = response.release_date;
    movieToEdit.runtime = response.runtime;
    if(response.language === "en") {
    movieToEdit.tagline = response.tagline;
    } else {
      movieToEdit.tagline = response.original_title;
    }
    await updateDoc(movieRef, movieToEdit);
  }

  let currentlyVisibleState = null;
  let buttonText = null;

  if (error) {
    currentlyVisibleState = <p>There was an error: {error}</p>
  } else if (selectedFilm != null) {
    currentlyVisibleState = <FilmDetail film = { selectedFilm } handleSeedingMovieData = { handleSeedingMovieData }/>
    buttonText = "Return to Movie List";
  } else {
    currentlyVisibleState = <FilmList filmList = { filmList }
    onFilmSelection = { handleChangingSelectedFilm } />
    buttonText = "Placeholder";
  }

  return (
    <React.Fragment>
      <Container className="main">
      {currentlyVisibleState}
      {error ? null : <Button className="main-button" onClick={handleClick}>{buttonText}</Button>}
      </Container>
    </React.Fragment>
  )
}

export default FilmControl;