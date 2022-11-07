import React, { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearMovie, deleteComment, deleteMovie, getMovie } from '../store/movies/slice';
import { selectMovie } from '../store/movies/selectors';
import { selectActiveUser } from '../store/activeUser/selectors';
import AddComment from '../components/AddComment';
import Like from '../components/Like';

const SingleMovie = () => {

    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const movie = useSelector(selectMovie);
    const activeUser = useSelector(selectActiveUser);

    useEffect(() => {
         dispatch(getMovie(id))
         return () => dispatch(clearMovie());
    }, [id])

    if(!movie) {
        return null
    }

    const handleDelete = () => {
      dispatch(deleteMovie(id))
      history.push('/');
   }

   const handleDeleteComment = (commentId) => {
    let comment_id = commentId.toString();
    dispatch(deleteComment({id, comment_id}));
 }

  return (
    movie !== undefined && (
    <div 
    className="container text-white"
    style={{
      'display': 'flex',
      'flexDirection': 'row',
      'justifyContent': 'center',
      'alignItems': 'center',
      'height': '100vh'
    }}
    >
      <div className='row'>
      <div 
      className="card card--background-img"
      style={{
        'width': '30vw',
        'margin': '2rem auto'
      }}
      >
        <div className="card-header">
          <p className="p-2 nav-link btn btn-success">
            <b>Author: </b>{movie.user.first_name + ' ' + movie.user.last_name}
          </p>
          <p className="p-2 text-center"><b>Title: </b>{movie.title}</p>
          <p className="p-2 text-center" style={{ 'textTransform': 'capitalize' }}><b>Genre: </b>{movie.genre}</p>
          <p className='p-2 text-center'><b>Description: </b>{movie.description}</p>
        </div>
        <div className="card-body flex-center">
            <img className='img-fluid' src={movie.images[0].url} />
        </div>
        <div className="card-footer">
            <div className='container'>
               <Like movie={movie} activeUser={activeUser} />
               {activeUser !== null && activeUser.id === movie.user.id && (
                             <div>
                                <Link 
                                to={`/edit/${id}`} 
                                className="btn btn-warning m-2"
                                >
                                Edit
                                </Link> 
                                <button 
                                onClick={handleDelete} 
                                className="btn btn-danger m-2"
                                >
                                Delete movie
                                </button>
                             </div>
            )}
            </div>
        </div>
      </div>
      </div>
      <div 
      style={{
        'height': '80vh',
        'width': '100%'
      }}
      >
      <ul 
      className='list-group'
      style={{
        'overflow-y': 'scroll',
        'margin': '4rem'
      }}
      >
        <span>COMMENTS</span>

            {
              movie.comments.length > 0 && movie.comments.map((comment, index) => (
                <li 
                key={index} className='list-group-item'
                style={{
                  'display':'flex',
                  'flexDirection':'column' 
                }}
                >
                  <div>
                  <b>
                    {comment.user.first_name + ' ' + comment.user.last_name}
                 </b>
                 <p>{comment.body}</p>
                 <p>Created: {comment.created_at.split('T')[0]}</p>
                  </div>
                 {
                  activeUser && activeUser.id === comment.user_id && (
                    <button
                     className='btn btn-danger'
                     onClick={() => handleDeleteComment(comment.id)}
                     >
                      Delete Comment
                    </button>
                  )
                 }
                 </li>
              ))
            }
          </ul>
          <AddComment />
      </div>
    </div>
  )
  )
}

export default SingleMovie