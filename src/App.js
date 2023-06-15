import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';


import {
  Routines,
  MyRoutines,
  UserForm,
  Activities
} from './components';

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);


  return (
    <>
      <header>
        <h1>Fitness Tracker</h1>
        <nav>
          <Link to="/routines">All Routines</Link> |
          <Link to="/activities">All Activities</Link> |
          {
            token
              ? <Link to='/myRoutines'>My Routines</Link>
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
        <MyRoutines />
      </Route>

      <Route path='/activities'>
        <Activities 
          token={token}
          user={user}
        />
      </Route>

      <Route path='/userForm/:actionType'>
        <UserForm />
      </Route>
    </>
  )
}

export default App;