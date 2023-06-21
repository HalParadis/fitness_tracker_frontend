import React, { useState } from "react";
import { fetchFromAPI } from "../../api";

const AddActivityForm = ({
  token,
  activities,
  routineActivities,
  routineId,
  fetchMyRoutines
}) => {
  const [count, setCount] = useState('');
  const [duration, setDuration] = useState('');
  const [chosenActivityName, setChosenActivityName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [show, setShow] = useState(false);

  const allowedActivities = activities.filter(activity => {
    return !routineActivities.find(routineActivity => {
      return routineActivity.name === activity.name;
    })
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const chosenActivity = activities.find(activity => activity.name == chosenActivityName);
    if (chosenActivity) {
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

      setCount('');
      setDuration('');
      setChosenActivityName('');
      setErrorMessage(null);
    }
    else {
      setErrorMessage('Please choose an activity');
    }
  }

  return (
    <>
      {show
        ? <button
          type="button"
          onClick={() => setShow(!show)}
        >Close Form</button>
        : <button
          type="button"
          onClick={() => setShow(!show)}
        >Add Activity</button>
      }
      {show &&
        <form onSubmit={handleSubmit} className='addActivityForm'>
          {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
          <select
            name='allowedActivities'
            value={chosenActivityName}
            onChange={() => setChosenActivityName(event.target.value)}
          >
            <option value="">Please choose an activity</option>
            {
              allowedActivities.map(activity => {
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
          <button type='submit'>Add Activity</button>
        </form>
      }
    </>
  )
}

export default AddActivityForm;