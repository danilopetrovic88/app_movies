import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../store/activeUser/slice';
import { useHistory } from 'react-router-dom';

const Login = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(login(credentials));

    setCredentials({
      email: "",
      password: "",
    })

    history.push('/');
  };

  return (
    <div className="container">
      <h1 className="p-4 text-white">Login</h1>
      <div className="row">
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <input 
            required
            type="email" 
            name="email" 
            placeholder='Email address' 
            className="form-control" 
            onChange={({ target }) =>
            setCredentials({ ...credentials, email: target.value })
            }
            /><br />
            <input 
            required
            type="password" 
            name="password" 
            placeholder='Password' 
            className="form-control" 
            onChange={({ target }) =>
            setCredentials({ ...credentials, password: target.value })
            }
            /><br />
            <button className="btn btn-warning">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login