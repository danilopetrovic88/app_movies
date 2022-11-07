import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import activeUserReducer from "./activeUser/slice";
import moviesReducer from "./movies/slice";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    activeUser: activeUserReducer,
    movies: moviesReducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

for (const saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;