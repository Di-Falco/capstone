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

  let currentlyVisibleState = null;
  let buttonText = null;

  if (selectedFilm != null) {
    currentlyVisibleState = <FilmDetail film = { selectedFilm } />
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