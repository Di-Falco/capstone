import React from 'react';
import './../App.css';
import Header from './Header';
import Home from './Home/Home';
// import FilmControl from './Film/FilmControl';

function App() {
  return(
    <React.Fragment>
      <Header />
      <Home />
    </React.Fragment>
  );
}

export default App;
