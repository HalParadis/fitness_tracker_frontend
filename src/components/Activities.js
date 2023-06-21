import React, { useState, useEffect } from "react";
import { fetchFromAPI } from '../api';

const Activities = ({
  token
}) => {

  const [activities, setActivities] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchActivities = async () => {
    const data = await fetchFromAPI({
      endpoint: "activities",
    });

    if (data) {
      setActivities(data);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await fetchFromAPI({
      body: {
        name,
        description
      },
      method: 'post',
      endpoint: 'activities',
      token
    });

    if (result.message) {
      setErrorMessage(result.message)
    }
    else {
      fetchActivities();
    }

    setName('');
    setDescription('');

  }

  useEffect(() => {
    fetchActivities();
  }, [])


  return (
    <div className='activities'>
      <h2><u>Activities</u></h2>

      {token &&
        <form onSubmit={handleSubmit} className='addActivityForm'>
          {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
          <input
            type='text'
            name='activityName'
            placeholder='name'
            value={name}
            onChange={event => setName(event.target.value)}
            minLength='3'
            maxLength='20'
            required
          />
          <input
            type='text'
            name='activityDescription'
            placeholder='description'
            value={description}
            onChange={event => setDescription(event.target.value)}
            required
          />
          <button type='submit'>Add Activity</button>
        </form>
      }

      <div className="displayActivities">
        {activities.map((activity, idx) => (
          <div className='activity' key={activity.id ?? idx}>
            <h3>{activity.name}</h3>
            <p>{activity.description}</p>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Activities;