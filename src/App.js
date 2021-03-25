import React, {useState, useEffect} from 'react';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import  MovieForm from './components/movie-form';
import './App.css';

function App() {

  const [movies, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 26bccd5dc7731fbacbfbc684d2456f960178df79'
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovie(resp))
    .catch(error => console.log(error))
  }, [])

  const movieClicked = movie => {
    setSelectedMovie(movie);

  }


  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }
  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  const updatedMovie = movie => {
    const newMovies = movies.map( mov => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    })
    setMovie(newMovies)
  }
  const newMovie = () => {
    setEditedMovie({title: '', description: ''});
    setSelectedMovie(null);
  }

  const movieCreated = movie => {
    const newMovies = [...movies, movie];
    setMovie(newMovies);
  }
  return (
    <div className="App">
      <header className="App-header">
          <h1>Movies Rater</h1>
      </header>
      <div className="layout">
        <div>
        <MovieList movies={movies} movieClicked={loadMovie}  editClicked={editClicked}/>
        <button onClick={newMovie}>New movie</button>
        </div>

      <MovieDetails movie={selectedMovie} updatedMovie={loadMovie}/>
      { editedMovie ?
          <MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated}/>
          : null}

          </div>
    </div>
  );
}

export default App;
