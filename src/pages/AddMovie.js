import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addMovie, clearGenres, clearMovieErrors, clearMovies } from '../store/movies/slice';
import { selectErrors } from './../store/movies/selectors';

const AddMovie = () => {

    const history = useHistory();
    const genres = [
        'drama',
        'comedy',
        'action',
        'adventure',
        'crime',
        'history',
        'ScyFi',
    ]
    const dispatch = useDispatch();

    const [ newMovie, setNewMovie ] = useState({
        title: '',
        description: '',
        genre: '',
        images: []
    }) 

    useEffect(() => {   
        dispatch(clearMovies());
        dispatch(clearMovieErrors());
        dispatch(clearGenres());
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addMovie(newMovie))
        history.push('/');
    }

  return (
    <div className="contaier">
        <div className="row">
            <div className="col-10 offset-1">
                <h3 className="text-center text-white">
                   Create New Movie
                </h3>
                <form onSubmit={handleSubmit}>
                   <input 
                   required 
                   minLength={2} 
                   maxLength={255} 
                   type="text" 
                   placeholder='Title' 
                   name='title' 
                   value={newMovie.title}
                   className="form-control" 
                   onChange={({ target }) => setNewMovie({...newMovie, title: target.value})}
                   /><br />
                   <textarea 
                   placeholder='Description' 
                   required
                   name="description" 
                   cols="30" rows="10" 
                   className="form-control"
                   value={newMovie.description}
                   onChange={({ target }) => setNewMovie({...newMovie, description: target.value})}
                   >
                    </textarea>
                    <br />
                    <select 
                    className='form-control'
                    onChange={({target}) => {
                        setNewMovie({ ...newMovie, genre: target.value })
                    }}
                    value={newMovie.genre}
                    >
                       {
                        genres.map((genre,index) => (
                            <option key={index} className='form-control'>
                               {genre}
                             </option>
                        ))
                       }
                    </select>
                        <input 
                        type="text" 
                        placeholder='Image url...' 
                        name='url' 
                        className="form-control"
                        onChange={({target}) => setNewMovie(
                            {
                                ...newMovie,
                                images: [ 
                                    ...newMovie.images,
                                    {
                                        url: target.value
                                    }
                                ]
                            }
                        )}
                        />
                    <button className="btn btn-success">
                        Create New Movie
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddMovie