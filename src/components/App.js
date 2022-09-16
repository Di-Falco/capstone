import React from 'react';
import './../App.css';
import Header from './Header';
import Home from './Home/Home';
import FilmControl from './Film/FilmControl';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';

function App() {
  return(
    <React.Fragment>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/movies" element={<FilmControl />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
