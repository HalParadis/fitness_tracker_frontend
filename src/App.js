import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom/cjs/react-router-dom.min';

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
        <Activities />
      </Route>

      <Route path='/myRoutines/:actionType'>
        <MyRoutinesForm />
      </Route>
    </>
  )
}

export default App;