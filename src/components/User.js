import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchFromAPI } from '../api';

const User = ({ token, setToken, setUser }) => {
  const history = useHistory();
  const params = useParams();
  const { actionType } = params;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await fetchFromAPI({
      body: {
        username,
        password
      },
      method: 'post',
      endpoint: `/users/${actionType}`
    });

    if (result.message === "Thank you for registering" || 
        result.message === "you're logged in!") {
      setToken(result.token);
      setUser(result.user);
      history.push('/myRoutines');
    }
    else {
      setErrorMessage(result.message);
    }

    setPassword('');
    setUsername('');
  }

  useEffect(() => {
    const linkElements = [...document.getElementsByClassName('navLink')];
    linkElements.forEach(element => {
      element.classList.remove('lightBlueBackground');
      if (element.id == 'loginLink') {
        element.classList.add('lightBlueBackground');
      }
    });
  }, []);

  return (
    <div className='userPage'>
      {token && history.push('/myRoutines')}

      <h2 className='profileFormHeader'>
        {actionType === 'login' ? 'Log In' : 'Register'}
      </h2>

      <form onSubmit={handleSubmit} className='userForm'>
        {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
        <label htmlFor='username' >User Name</label>
        <input 
          type='text'
          name='username'
          value={username}
          onChange={event => setUsername(event.target.value)}
          minLength='3'
          maxLength='20'
          required
        />
        <label htmlFor='password'>Password</label>
        <input 
          type='password'
          name='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
          minLength='8'
          maxLength='20'
          required
        />
        <button type='submit'>SUBMIT</button>
        {
          actionType === 'login'
            ? <Link to='/user/register' className='userFormLink'>
                Don't have an account? Register Here.
              </Link>
            : <Link to='/user/login' className='userFormLink'>
                Already have an account? Login here.
              </Link>
        }
      </form>
    </div>
  )
}

export default User;