import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addComment } from '../store/movies/slice';

const AddComment = () => {
    const [newComment, setNewComment] = useState({ 
      body: '',
    });
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleSubmit = (e) => {
      e.preventDefault();
          dispatch(
              addComment({
                  comment:newComment,
                  movieId: id
              })
          );

        setNewComment({
          body: ''
        })
  }
  
    return (
      <div style={{ 
        'margin': '0 4rem' 
        }}>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='form-control'
            style={{ 
              'border': '3px solid #444' ,
              'width': '20rem'
            }}
            placeholder="Leave your comment..."
            value={newComment.body}
            onChange={({ target }) => setNewComment({ body: target.value })}
          />
          <button className='btn btn-success'>Add Comment</button>
        </form>
      </div>
    );
}

export default AddComment