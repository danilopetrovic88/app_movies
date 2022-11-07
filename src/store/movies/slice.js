import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getMovies() {},
  getMovie() {},
  deleteMovie() {},
  addMovie() {},
  editMovie() {},
  addComment() {},
  addLike() {},
  deleteComment() {},
  getGenres() {}
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    movie: null,
    errors: null,
    genres: null
  },
  reducers: {
    setMovies(state, action) {
      state.movies = action.payload.data;
    },
    setMovie(state, action) {
      state.movie = action.payload;
    },
    addNewMovieSuccess(state, action) {
      state.movies = [...state.movies, action.payload];
    },
    addNewCommentSuccess(state, action) {
      state.movie.comments = [...state.movie.comments, action.payload]
    },
    deleteMovieSuccess(state, action) {
      state.movies = state.movies.filter((movie) => movie.id !== Number(action.payload)
      );
    },
    deleteCommentSuccess(state, action) {
      state.movie.comments = state.movie.comments.filter((comment) => comment.id !== Number(action.payload)
      );
    },
    editMovieSuccess(state, action) {
      {state.movie = action.payload}
    },
    clearMovies(state,action) {
      state.movies = [];
    },
    clearMovie(state,action) {
      state.movie = null
    },
    addNewLikeSuccess(state, action) {
      state.movie.likes = [...state.movie.likes, action.payload]
    },
    createMovieError(state,action) {
      state.errors = action.payload
    },
    clearMovieErrors(state, action) {
      state.errors = null
    },
    clearGenres(state,action) {
      state.genres = null
    },
    getGenresSuccess(state,action) {
      state.genres = action.payload
    },
    ...middlewareActions,
  }
});

export const {
  getMovies,
  setMovies,
  getMovie,
  setMovie,
  deleteMovie,
  deleteMovieSuccess,
  addMovie,
  addNewMovieSuccess,
  editMovieSuccess,
  editMovie,
  addComment,
  addNewCommentSuccess,
  clearMovie,
  deleteCommentSuccess,
  deleteComment,
  addLike,
  addNewLikeSuccess,
  createMovieError,
  clearMovieErrors,
  getGenres,
  getGenresSuccess,
  clearGenres,
  clearMovies
} = moviesSlice.actions;
export default moviesSlice.reducer;