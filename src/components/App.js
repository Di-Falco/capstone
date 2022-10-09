import React, {useEffect, useState} from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './../firebase.js';
import Home from './Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';
import './../index.scss'
import FilmControl from './Film/FilmControl';
import FilmDetail from './Film/FilmDetail';
import FilmSearch from './Film/FilmSearch';
import Account from './Home/Account';
import Rent from './Film/Rent';
import AddFilm from './Admin/AddFilm';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';

function App() {  
  const [filmList, setFilmList] = useState([]);
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
          <div id="main-content">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/movies/:currentPage" element={<FilmControl />} />
              <Route exact path="/details/:id" element={<FilmDetail filmList={filmList}/>} />
              <Route exact path="/movies/search" element={<FilmSearch />} />
              <Route exact path="search/details/:id" element={<FilmDetail filmList={filmList}/> } />
              <Route exact path="/account" element={<Account />} />
              <Route exact path="/rent/:id" element={<Rent filmList={filmList}/>} />
              <Route exact path="/admin/add" element={<AddFilm filmList={filmList}/>} />
            </Routes>
            <h3 id="top-left">CH13<br /><span id="play">►</span> PLAY<br />0:00:00</h3>
            <h3 id="top-right">TAPE<br /><span id="rec">●</span> REC<br />0:00:00</h3>
            <h3 id="bottom-left">TV <span id="play">►</span><br />SRC</h3>
            <h3 id="bottom-right">LP <span id="play">►</span><br />DST</h3>
          </div>
        </div>
      </Router>
      <Footer />
    </React.Fragment>
  );
}

export default App;
