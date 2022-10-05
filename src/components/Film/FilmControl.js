import React, { useEffect, useState } from 'react';
import FilmList from './FilmList';
import FilmDetail from './FilmDetail';
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { Container } from 'react-bootstrap';
import { db } from './../../firebase.js';
import { useParams } from "react-router-dom";

let redirectPage;

function FilmControl() {

  const [filmList, setFilmList] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [error, setError] = useState(null);
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

 
  // const compare = (a, b) => {
  //   if (Number(a.id) < Number(b.id)) {
  //     return -1;
  //   }
  //   if (Number(a.id) > Number(b.id)) {
  //     return 1;
  //   }
  //   return 0;
  // }

  // const sortList = () => {
  //   setFilmList(filmList.sort( compare ));
  // }

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
    movieToEdit.posterUrl = "https://image.tmdb.org/t/p/w154" + response.poster_path;
    if (response.backdrop_path !== null) {
      movieToEdit.backdrop = "https://image.tmdb.org/t/p/w300" + response.backdrop_path;
    } else {
      movieToEdit.backdrop = "https://image.tmdb.org/t/p/w342" + response.poster_path;
    }
    movieToEdit.rating = response.vote_average;
    movieToEdit.releaseDate = response.release_date;
    movieToEdit.runtime = response.runtime;
    if(response.original_language === "en") {
    movieToEdit.tagline = response.tagline;
    } else {
      movieToEdit.tagline = response.original_title;
    }
    await setDoc(movieRef, movieToEdit);
  }

  let currentlyVisibleState = null;

  if (error) {
    currentlyVisibleState = <p>There was an error: {error}</p>
  } else if (selectedFilm != null) {
    currentlyVisibleState = 
    <FilmDetail 
      film = { selectedFilm } 
      filmList = { filmList } 
      handleSeedingMovieData = { handleSeedingMovieData } />
  } else {
    currentlyVisibleState = 
    <FilmList 
      filmList = { filmList }
      onFilmSelection = { handleChangingSelectedFilm }
      handleSeedingMovieData = { handleSeedingMovieData } />
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
      {/* <Container className="main">
      </Container> */}
    </React.Fragment>
  )
}

export default FilmControl;