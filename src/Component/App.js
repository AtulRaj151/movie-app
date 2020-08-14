import React from "react";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";
import { StoreContext } from "..";
import { connect } from "../index";
class App extends React.Component {
  componentDidMount() {
    //make api call
    // dispatch action
    // const { store } = this.props;
    // store.subscribe(() => {
    //   // console.log("Updated");
    //   this.forceUpdate();
    // });
    this.props.dispatch(addMovies(data));
    // console.log(this.props.store.getState());
  }
  isFavouriteMovie = (movie) => {
    const { movies } = this.props;
    const index = movies.favourite.indexOf(movie);

    if (index != -1) {
      return true;
    }
    return false;
  };
  changeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  };
  render() {
    const { movies, search } = this.props;
    const { list, favourite, showFavourites } = movies;
    const displayMovies = showFavourites ? favourite : list;

    console.log(showFavourites);
    return (
      <div className="App">
        <Navbar search={search} />
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
                dispatch={this.props.dispatch}
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

class AppWrapper extends React.Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => <App store={store} />}
      </StoreContext.Consumer>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search,
  };
}
const connectedAppCompement = connect(mapStateToProps)(App);
export default connectedAppCompement;
