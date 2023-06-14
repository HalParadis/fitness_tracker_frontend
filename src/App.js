import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';

import {
  Routines,
  MyRoutines,
  MyRoutinesForm,
  Activities
} from './components';

const App = () => {
  return (
    <>
      <header>
        <h1>Fitness Tracker</h1>
        <nav>
          <Link to="/myRoutines">My Routines</Link>
          <Link to="/routines">All Routines</Link>
          <Link to="/activities">All Activities</Link>
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

      <Route path='activities'>
        <Activities 

        />
      </Route>

      <Route path='/myRoutines/:actionType'>
        <MyRoutinesForm />
      </Route>
    </>
  )
}

export default App;