import React, { useState } from "react";
import { fetchFromAPI } from "../../api";

const RoutineActivityForm = ({ 
  token, 
  routine, 
  activity, // can get from routine
  activities,
  routineActivityId, // can get from activity
  activityId // can get from activity in the dropdown list
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
        method: activities ? 'post' : 'patch',
        endpoint: activities 
          ? `/routines/${routineId}/activities` 
          : `/routine_activities/${routineActivityId}`,
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
      <form onSubmit={handleSubmit} className='routineActivityForm'>
        {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
        <select
          name='allActivities'
          value={chosenActivity}
          onChange={() => setChosenActivity(event.target.value)}
        >
          {
            activities.map(value => {
              return <option key={value.id} value={value.name}>{value.name}</option>
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
        <button type='submit'>{activities ? "Add Activity" : "Update Activity"}</button>
      </form>
    </>
    )
  }

  export default RoutineActivityForm;