import React from 'react';
import Header from './Header';
import Home from './Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';
import './../index.css'
import FilmControl from './Film/FilmControl';
import FilmDetail from './Film/FilmDetail';
import FilmSearch from './Film/FilmSearch';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import FilmList from './Film/FilmList';

function App() {
  // const [filmList, setFilmList] = useState({});

  return(
    <React.Fragment>
      <Router>
        <Header />
        <Container>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/movies/:currentPage" element={<FilmControl />} />
          <Route exact path="/movies/?id=:id" element={<FilmDetail />} />
          <Route path="/movies/search" element={<FilmSearch />} />
        </Routes>
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
