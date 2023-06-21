import React, { useState } from "react";
import { fetchFromAPI } from "../../api";

const UpdateActivityForm = ({
  token,
  activity,
  fetchMyRoutines
}) => {
  const [count, setCount] = useState(activity.count);
  const [duration, setDuration] = useState(activity.duration);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await fetchFromAPI({
      body: {
        count,
        duration
      },
      method: 'post',
      endpoint: `/routine_activities/${activity.routineActivityId}`, 
      token
    });

    if (result.message) {
      setErrorMessage(result.message)
    }
    else {
      fetchMyRoutines();
      setErrorMessage(null);
    }

    setCount('');
    setDuration('');
    setErrorMessage(null);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='UpdateActivityForm'>
        {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
        <input
          type='text'
          name='routineActivityCount'
          placeholder='count'
          value={count}
          onChange={event => setCount(event.target.value)}
          maxLength='5'
          required
        />
        <input
          type='text'
          name='routineActivityDuration'
          placeholder='duration'
          value={duration}
          onChange={event => setDuration(event.target.value)}
          maxLength='5'
          required
        />
        <button type='submit'>Update Activity</button>
      </form>
    </>
  )
}

export default UpdateActivityForm;