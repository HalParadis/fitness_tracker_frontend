import React, { useState } from "react";
import { fetchFromAPI } from "../../api";

const AddActivityForm = ({
  token,
  activities,
  routineId
}) => {
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [chosenActivity, setChosenActivity] = useState('none');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await fetchFromAPI({
      body: {
        count,
        duration,
        activityId: chosenActivity.id
      },
      method: 'post',
      endpoint: `/routines/${routineId}/activities`, 
      token
    });

    if (result.message) {
      setErrorMessage(result.message)
    }
    else {
      fetchMyRoutines();
      setErrorMessage(null);
    }

    setCount(0);
    setDuration(0);
    setChosenActivity('none');
    setErrorMessage(null);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='addActivityForm'>
        {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
        <select
          name='allActivities'
          value={chosenActivity}
          onChange={() => setChosenActivity(event.target.value)}
        >
          {
            activities.map(activity => {
              return <option key={activity.id} value={activity.name}>{activity.name}</option>
            })
          }
        </select>
        <input
          type='text'
          name='routineActivityCount'
          placeholder='count'
          value={count}
          onChange={event => setCount(event.target.value)}
          minLength='3'
          maxLength='20'
          required
        />
        <input
          type='text'
          name='routineActivityDuration'
          placeholder='duration'
          value={duration}
          onChange={event => setDuration(event.target.value)}
          required
        />
        <button type='submit'>Add Activity</button>
      </form>
    </>
  )
}

export default AddActivityForm;