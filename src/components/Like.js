import React from 'react'
import { useDispatch } from 'react-redux';
import { addLike } from '../store/movies/slice';

const Like = ({movie}) => {

    const dispatch = useDispatch();

  return (
        <>
        <button 
            className='btn btn-success btn-sm' 
            onClick={() => 
                dispatch(addLike({ like: "liked", movieId: movie.id}))
            }
            >
            Like <b>{movie.likes.filter(like => like.like === "liked").length}</b>
            </button>

        <button 
            className='btn btn-warning btn-sm' 
            onClick={() => 
            dispatch(addLike({ like: "disliked", movieId: movie.id}))
            }
            >
            Dislike <b>{movie.likes.filter(like => like.like === "disliked").length}</b>
        </button>
        </>
  )
}

export default Like