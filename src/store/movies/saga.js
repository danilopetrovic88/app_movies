import { call, put, takeLatest } from "redux-saga/effects";

import {
  getMovie,
  getMovies,
  setMovie,
  setMovies,
  addMovie,
  deleteMovie,
  deleteMovieSuccess,
  editMovie,
  editMovieSuccess,
  addNewMovieSuccess,
  addNewCommentSuccess,
  addComment,
  deleteCommentSuccess,
  deleteComment,
  addLike,
  addNewLikeSuccess,
  createMovieError,
  getGenres,
  getGenresSuccess
} from "./slice";

import { 
  getAllMovies, 
  getSingleMovie, 
  movieDelete, 
  movieEdit, 
  movieCreate, 
  commentCreate, 
  commentDelete, 
  likeCreate, 
  genres} from './../../services/movieService';

function* getMoviesHandler({payload}) {

  try {
    const data = yield call(getAllMovies, payload);
    yield put(
      setMovies({
        data: data
      })
    );
  } catch (e) {
    console.error(e);
  }
}

function* getMovieHandler({ payload }) {
  try {
    const data = yield call(getSingleMovie, payload);
    yield put(setMovie(data));
  } catch (e) {
    console.error(e);
  }
}

function* deleteMovieHandler(action) {
  try {
    yield call(movieDelete, action.payload);
    yield put(deleteMovieSuccess(action.payload));
  } catch (e) {
    console.log(e);
  }
}

function* handleEditMovie({ payload }) {
  const movie  = payload;
  try {
    const editedMovie = yield call(movieEdit, movie, movie.id);
    yield put(editMovieSuccess(editedMovie))
  } catch (e) {
    console.log(e);
  }
}

function* handleAddMovie({ payload }) {
  try {
    const data = yield call(movieCreate, payload);
    yield put(addNewMovieSuccess(data))
    
  } catch (e) {
    yield put(createMovieError(e))
  }
}

function* handleAddNewComment({ payload }) {
  try {
    const {data} = yield call(commentCreate, payload.comment, payload.movieId);
    yield put(addNewCommentSuccess(data))
  } catch (e) {
    console.log(e);
  }
}

function* deleteCommentHandler(action) {
  try {
    yield call(commentDelete, action.payload.id, action.payload.comment_id);
    yield put(deleteCommentSuccess(action.payload.comment_id));
  } catch (e) {
    console.log(e);
  }
}

function* handleAddNewLike( {payload} ) {
  try {
    const data = yield call(likeCreate, payload.like, payload.movieId);
    yield put(addNewLikeSuccess(data))
  } catch (e) {
    console.log(e);
  }
}

function* handleGetGenres() {
  try {
    const {data} = yield call(genres);
    yield put(getGenresSuccess(data));
  } catch (e) {
    console.log(e);
  }
}



export function* watchGetMovies() {
  yield takeLatest(getMovies.type, getMoviesHandler);
}
export function* watchGetMovie() {
  yield takeLatest(getMovie.type, getMovieHandler);
}

export function* watchEditMovie() {
  yield takeLatest(editMovie.type, handleEditMovie);
}
export function* watchDeleteMovie() {
  yield takeLatest(deleteMovie.type, deleteMovieHandler);
}
export function* watchAddMovie() {
  yield takeLatest(addMovie.type, handleAddMovie);
}
export function* watchAddNewComment() {
  yield takeLatest(addComment.type, handleAddNewComment);
}
export function* watchDeleteComment() {
  yield takeLatest(deleteComment.type, deleteCommentHandler);
}
export function* watchAddNewLike() {
  yield takeLatest(addLike.type, handleAddNewLike);
}
export function* watchGetGenres() {
  yield takeLatest(getGenres.type, handleGetGenres);
}