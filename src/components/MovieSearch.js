import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMovies } from "../store/movies/slice";
import useDebounce from './../hooks/useDebounce';

const MovieSearch = () => {
  const dispatch = useDispatch();

  const [searchTerms, setSearchTerms] = useState({
    title: ""
  });
  
  const debouncedSearch = useDebounce(searchTerms, 500);

  useEffect(() => {
    dispatch(getMovies(searchTerms));
  }, [debouncedSearch]);

  return (
    <>
      <input
        className="form-control search-input"
        type="text"
        value={searchTerms.title}
        placeholder="Search Movie title"
        onChange={({ target }) =>
          setSearchTerms({ ...searchTerms, title: target.value })
        }
      />
    </>
  );
}

export default MovieSearch