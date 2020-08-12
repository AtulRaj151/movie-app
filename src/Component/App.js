import React from "react";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";
class App extends React.Component {
  componentDidMount() {
    //make api call
    // dispatch action
    const { store } = this.props;
    store.subscribe(() => {
      console.log("Updated");
      this.forceUpdate();
    });
    store.dispatch(addMovies(data));
    console.log(this.props.store.getState());
  }
  isFavouriteMovie = (movie) => {
    const { movies } = this.props.store.getState();
    const index = movies.favourite.indexOf(movie);

    if (index != -1) {
      return true;
    }
    return false;
  };
  changeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  };
  render() {
    const { movies } = this.props.store.getState();
    const { list, favourite, showFavourites } = movies;
    const displayMovies = showFavourites ? favourite : list;

    console.log(showFavourites);
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.changeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => this.changeTab(true)}
            >
              Favourites
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movies-${index}`}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isFavouriteMovie(movie)}
              />
            ))}
          </div>
          {displayMovies.length == 0 ? (
            <div className="no-movies">No movies to Display</div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
