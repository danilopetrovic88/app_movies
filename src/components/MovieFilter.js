import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectGenres } from '../store/movies/selectors';
import { getGenres, getMovies } from '../store/movies/slice';

const MovieFilter = () => {

const genres = useSelector(selectGenres);

const dispatch = useDispatch();

const [genre, setGenre] = useState({
    genre: ''
});

useEffect(() => {
    dispatch(getGenres());
    dispatch(getMovies(genre))
    if(genre.genre === 'all') {
        dispatch(getMovies())
    }
}, [genre])

  return (
    <div>
        <label className='text-white p-2'>Filter movies by genre: </label>
        <select className='text-center' onChange={({target}) => setGenre({...genre, genre: target.value})}>
            {
            genres !== null && genres.map((genre,index) => (
                <option value={genre} key={index}>{genre}</option>
            ))
            }
        </select>
    </div>
  )
}

export default MovieFilter