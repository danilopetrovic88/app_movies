import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { register } from '../store/activeUser/slice';
import { useHistory } from 'react-router-dom';

const Register = () => {

  const dispatch = useDispatch();

  const history = useHistory();

  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });

  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(credentials));
    setCredentials({
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    })
    history.push('/login');
  };

  return (
    <div className="container">
      <h1 className="p-4 text-white">Register</h1>
      <div className="row">
        <div className="col-5">
          <form onSubmit={handleSubmit}>
            <input 
            required
            value={credentials.value}
            type="text" 
            name="first_name" 
            placeholder='First Name' 
            className="form-control" 
            onChange={({ target }) =>
            setCredentials({ ...credentials, first_name: target.value })
            }
            /><br />
            <input 
            required
            value={credentials.last_name}
            type="text" 
            name="last_name" 
            placeholder='Last Name' 
            className="form-control" 
            onChange={({ target }) =>
            setCredentials({ ...credentials, last_name: target.value })
            }
            /><br />
            <input 
            required
            value={credentials.email}
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
            value={credentials.password}
            type="password" 
            name="password" 
            placeholder='Password' 
            className="form-control" 
            onChange={({ target }) =>
            setCredentials({ ...credentials, password: target.value })
            }
            /><br />
            {invalidCredentials && (
            <p style={{ color: "red" }}>Invalid credentials</p>
            )}
            <button className="btn btn-success">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register