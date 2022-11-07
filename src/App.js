
import './App.css';
import { Switch, Link, Route, useHistory } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveUser, selectIsAuthenticated } from './store/activeUser/selectors';
import { getActiveUser, logout } from './store/activeUser/slice';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import SingleMovie from './pages/SingleMovie';
import AppMovies from './components/AppMovies';
import { useEffect } from 'react';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';


function App() {

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    dispatch(getActiveUser());
  }, [])

  return (
    
    <>
      <nav className='navbar navbar-expand navbar-light bg-success'>
        <ul className='navbar-nav'>
        <li className='nav-item'>
            <Link to={'/'} className='nav-link text-white' >MOVIES APP</Link>
          </li>
          {
            !isAuthenticated && 
            <li className='nav-item'>
              <Link to={'/register'} className='nav-link text-white' >Register</Link>
            </li>
          }
          {
            !isAuthenticated &&
            <li className='nav-item'>
              <Link to={'/login'} className='nav-link text-white' >Login</Link>
            </li>
          }
          {
            isAuthenticated &&
            <li className='nav-item'>
              <Link to={'/add'} className='nav-link text-white' >Create Movie</Link>
            </li>
          }
          {
            isAuthenticated && 
            <li className="nav-item">
              <button onClick={handleLogout} className='btn nav-link btn-warning text-white' style={{"textTransform":"capitalize"}}>
                LOGOUT
              </button>
            </li>
          }
        </ul>
      </nav>
      <div>
        <Switch>
        <PrivateRoute path={'/'} exact >
           <AppMovies />
        </PrivateRoute>
          <PublicRoute path={'/register'} exact >
            <Register />
          </PublicRoute>
          <PublicRoute path={'/login'} exact >
            <Login />
          </PublicRoute>
          <PrivateRoute path={"/movies/:id"} exact>
            <SingleMovie />
          </PrivateRoute>
          <PrivateRoute path={"/add"} exact>
            <AddMovie />
          </PrivateRoute>
          <PrivateRoute path={"/edit/:id"} exact>
            <EditMovie />
          </PrivateRoute>
        </Switch>
      </div>
    </>
  );
}

export default App;
