import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { getMovies } from '../store/movies/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectErrors, selectMovies } from './../store/movies/selectors';
import MovieSearch from './MovieSearch';
import MovieFilter from './MovieFilter';

const AppMovies = () => {

const dispatch = useDispatch();
const history = useHistory();
const movies = useSelector(selectMovies);
const errors = useSelector(selectErrors);

const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getMovies());
  }, [])

  useEffect(() => {
    if(movies.length > 0) {
      setIsLoading(false);
    }
  }, [movies])

  

  return (
   <>
    <h2 className='m-4 text-center text-white'> Welcome to Movies App </h2>
        {
              errors !== null && 
                <div className='card text-center' style={{ 'width' : '30rem', 'margin' : '0 auto' }}>
                    <div className='card-header bg-danger text-white'><b>Title error</b></div>
                    <div className='card-body'>
                        {errors.response.data.errors.title[0]}
                    </div>
                </div>
        }
    <MovieSearch />
    <MovieFilter />
    <div className='container'>
      <div className='row'>
          <div className='col-10 offset-1' id='movieContainer'>
          {
              !isLoading && movies.map((movie, index) => ( 
                <div key={index} className="card card--bg">
                  <div className='card-body'>
                  <Link to={`/movies/${movie.id}`} className="btn text-white">
                    <b>Movie Title: </b>{ movie.title }
                    <img className='img-fluid' src={movie.images.length && movie.images[0].url} />
                    </Link><br />
                  </div>
                </div>
              ))
            }
        </div>
      </div>
    </div>
   </>
  )
}

export default AppMovies