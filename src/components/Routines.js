import React, { useState, useEffect } from "react";
import { fetchFromAPI } from '../api'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Routines = () => {
  const history = useHistory();
  const [routines, setRoutines] = useState([]);
  const fetchRoutines = async () => {
    const data = await fetchFromAPI({
      endpoint: "routines",
    });

    if (data) {
      setRoutines(data);
    }
  }

  useEffect(() => {
    if (history.location.pathname !== '/routines') history.push('/routines');

    fetchRoutines();

    const linkElements = [...document.getElementsByClassName('navLink')];
    linkElements.forEach(element => {
      element.classList.remove('lightBlueBackground');
      if (element.id == 'routinesLink') {
        element.classList.add('lightBlueBackground');
      }
    });
  }, [])

  return (
    <div className='publicRoutines'>
      <h2 className='publicRoutinesHeader'><u>Routines</u></h2>
      {
        routines.map((routine, idx) => (
          <div className='routine' key={routine.id ?? idx}>
            <h3><u>{routine.name}</u></h3>
            <p>Goal: {routine.goal}</p>
            <h6>Creator Name: {routine.creatorName}</h6>
            
            <div className='horizontalLine'></div>

            <h3><u>Activities:</u></h3>
            {
              routine.activities.map((activity, idx) => (
                <div className='activity' key={activity.id ?? idx}>
                  <h4>{activity.name}</h4>
                  <p>{activity.description}</p>
                  <p>Duration: {activity.duration}</p>
                  <p>Count: {activity.count}</p>
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Routines;