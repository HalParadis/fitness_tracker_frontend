import React, { useState, useEffect } from 'react';
import { Route, Link, useHistory } from 'react-router-dom';

import {
  Routines,
  MyRoutines,
  UserForm,
  Activities
} from './components';

const App = () => {
  const history = useHistory();

  const [token, setToken] = useState(localStorage.getItem('token') ?? '');
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  const logout = () => {
    setToken(null);
    setUser(null);
    history.push('/');
  }

  useEffect(() => {
    if (token !== "") {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token]);

  return (
    <>
      <header>
        <h1>Fitness Tracker</h1>
        <nav>
          <Link to="/routines">Public Routines</Link> |
          <Link to="/activities">All Activities</Link> |
          {
            token
              ? <>
                <Link to='/myRoutines'>My Routines</Link> |
                <button
                  className='logoutButton'
                  type='button'
                  onClick={logout}
                >Log Out</button>
              </>
              : <Link to='/userForm/login'>Log In</Link>
          }
        </nav>
      </header>

      <Route exact path='/'>
        <h2>Welcome to the site</h2>
      </Route>

      <Route path='/routines'>
        <Routines />
      </Route>

      <Route path='/myRoutines'>
        <MyRoutines 
          token={token}
          user={user}
        />
      </Route>

      <Route path='/activities'>
        <Activities 
          token={token}
          user={user}
        />
      </Route>

      <Route path='/userForm/:actionType'>
        <UserForm 
          token={token}
          setToken={setToken}
          setUser={setUser}
        />
      </Route>
    </>
  )
}

export default App;