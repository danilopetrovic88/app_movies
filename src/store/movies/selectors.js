export function selectMovies(state) {
    return state.movies.movies;
}
  
export function selectMovie(state) {
  return state.movies.movie;
}

export function selectErrors(state) {
  return state.movies.errors
}

export function selectGenres(state) {
  return state.movies.genres
}