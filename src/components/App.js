import React, {useEffect, useState} from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from './../firebase.js';
import Header from './Header';
import Home from './Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';
import './../index.scss'
import FilmControl from './Film/FilmControl';
import FilmDetail from './Film/FilmDetail';
import FilmSearch from './Film/FilmSearch';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function App() {  const [filmList, setFilmList] = useState([]);
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

  return(
    <React.Fragment>
      <Router>
        <div className="CRT-screen">
        {/* <Header /> */}
          <div id="main-content">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/movies/:currentPage" element={<FilmControl />} />
          <Route exact path="/details/:id" element={<FilmDetail filmList={filmList}/>} />
          <Route exact path="/movies/search" element={<FilmSearch />} />
          <Route
            exact
            path="search/details/:id"
            element={
            <FilmDetail filmList={filmList}/> } />
        </Routes>
      <h3 id="top-left">CH13<br />PLAY<br />0:00:00</h3>
      <h3 id="top-right">TAPE<br />ÇREC<br />0:00:00</h3>
      <h3 id="bottom-left">TVÂ<br />SRC</h3>
      <h3 id="bottom-right">LPÂ<br />DST</h3>
        </div>
        </div>
        {/* <img className="CRT" src={require('./../assets/images/CRT_Screen.png')}/> */}
      </Router>
    </React.Fragment>
  );
}

export default App;
