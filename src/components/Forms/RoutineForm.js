import React, { useState } from "react";
import { fetchFromAPI } from "../../api";

const RoutineForm = ({ token, routine, fetchMyRoutines }) => {
  const [name, setName] = useState(routine ? routine.name : '');
  const [goal, setGoal] = useState(routine ? routine.goal : '');
  const [errorMessage, setErrorMessage] = useState(null);

  const routineId = routine ? routine.id : undefined;
  
  const handleSubmit = async (event) => {
    //console.log("error thingy",`routines/${routineId && routineId}`);
    event.preventDefault();
    const result = await fetchFromAPI({
      body: {
        name,
        goal
      },
      method: routineId ? 'patch' : 'post',
      endpoint: routineId ? `/routines/${routineId}` : "/routines",
      token
    });

    if (result.message) {
      setErrorMessage(result.message)
    }
    else {
      fetchMyRoutines();
      setErrorMessage(null);
    }

    setName('');
    setGoal('');

  }

  return (
    <>
      <form onSubmit={handleSubmit} className='routineForm'>
        {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
        <input
          type='text'
          name='routineName'
          placeholder='name'
          value={name}
          onChange={event => setName(event.target.value)}
          minLength='3'
          maxLength='20'
          required
        />
        <input
          type='text'
          name='goal'
          placeholder='goal'
          value={goal}
          onChange={event => setGoal(event.target.value)}
          required
        />
        <button type='submit'>{routineId ? "Update Routine" : "Create Routine"}</button>
      </form>
    </>
  )
}

export default RoutineForm;