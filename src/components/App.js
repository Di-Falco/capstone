import React from 'react';
import Header from './Header';
import Home from './Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';
import FilmControl from './Film/FilmControl';
import FilmDetail from './Film/FilmDetail';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import FilmList from './Film/FilmList';

function App() {
  return(
    <React.Fragment>
      <Router>
        <Header />
        <Container>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/movies" element={<FilmControl />} />
          <Route path="/movies?id=:id" element={<FilmDetail />} />
        </Routes>
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
