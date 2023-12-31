import React, { useState, useEffect } from 'react';
import { Route, Link, useHistory } from 'react-router-dom';

import {
  Routines,
  MyRoutines,
  User,
  Activities
} from './components';

const App = () => {
  const history = useHistory();

  const [token, setToken] = useState(localStorage.getItem('token') ?? '');
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  const logout = () => {
    setToken('');
    setUser(null);
    history.push('/user/login');
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
          <Link 
            id='routinesLink'
            className='navLink' 
            to="/routines"
          >Public Routines</Link> |

          <Link 
            id='activitiesLink'
            className='navLink' 
            to="/activities"
          >All Activities</Link> |

          {
            token
              ? <>
                  <Link 
                    id='myRoutinesLink'
                    className='navLink' 
                    to='/myRoutines'
                  >My Routines</Link> |

                  <button
                    className='logoutButton'
                    type='button'
                    onClick={logout}
                  >Log Out</button>
                </>

              : <Link 
                  id='loginLink'
                  className='navLink loginLink' 
                  to='/user/login'
                >Log In</Link>
          }
        </nav>
      </header>

      <Route exact path='/'>
        <Routines />
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
        />
      </Route>

      <Route path='/user/:actionType'>
        <User 
          token={token}
          setToken={setToken}
          setUser={setUser}
        />
      </Route>
    </>
  )
}

export default App;