import React from 'react';
import FilmList from './FilmList';
import FilmDetail from './FilmDetail';

class FilmControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFilm: null,
      mainFilmList: { // test data input below
        1: { 
          title: "Alien",
          year: "1979",
          poster: "ALIEN POSTER",
          director: "Ridley Scott",
          description: "A movie about a really weird guy on a spaceship",
          id: 1
        },
        2: {
          title: "Aliens",
          year: "1986",
          poster: "ALIENS POSTER",
          director: "Ridley Scott",
          description: "A movie about a bunch of weird guys and their mom",
          id: 2
        }
      }
    };
  }

  // WIP API fetch
  // componentDidMount() {
  //   fetch("API URL HERE")
  //     .then(result => result.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           mainFilmList: result.items
  //         });
  //       },
  //       (error) => {
  //         this.setState({
  //           error
  //         });
  //       }
  //     )
  // }

  handleClick = () => {
    if (this.state.selectedFilm != null) {
      this.setState({
        selectedFilm: null
      });
    }
  }

  handleChangingSelectedFilm = (id) => {
    const selectedFilm = this.props.mainFilmList[id];
    this.setState({ selectedFilm: selectedFilm});
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.selectedFilm != null) {
      currentlyVisibleState = <FilmDetail film = { this.state.selectedFilm } />
      buttonText = "Return to Movie List";
    } else {
      currentlyVisibleState = <FilmList filmList = {this.state.mainFilmList}
      onFilmSelection = {this.handleChangingSelectedFilm} />
      buttonText = "Placeholder";
    }

    return(
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default FilmControl;