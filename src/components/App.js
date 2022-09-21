import React from 'react';
import './../App.css';
import Header from './Header';
import Home from './Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilmControl from './Film/FilmControl';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function App() {
  return(
    <React.Fragment>
      <Router>
        <Header />
        <Container>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/movies" element={<FilmControl />} />
        </Routes>
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
