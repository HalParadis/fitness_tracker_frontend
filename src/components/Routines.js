import React, { useState, useEffect } from "react";
import { fetchFromAPI } from '../api'


const Routines = ({
  token,
  user
}) => {

  const [routines, setRoutines] = useState([]);
  const fetchRoutines = async () => {
    const data = await fetchFromAPI({
      endpoint: "routines",
    });

    console.log("data: ", data);

    if (data) {
      setRoutines(data);
    }
  }

  useEffect(() => {
    fetchRoutines();

  }, [])

  return (
    <>
      <h2><u>Routines</u></h2>
      {routines.map((routine, idx) => (
        <div key={routine.id ?? idx}>
          <h3>Name: {routine.name}</h3>
          <p>Goal: {routine.goal}</p>
          <h6>Creator Name: {routine.creatorName}</h6>
          <hr></hr>
        </div>
      ))}
    </>
  )
}

export default Routines;