import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchFromAPI } from "../api";

const MyRoutines = ({ token, user }) => {
  const history = useHistory();
  const [myRoutines, setMyRoutines] = useState(null);

  console.log('user.username', user.username);

  const fetchMyRoutines = async () => {
    console.log('entered fetchMyRoutines');
    const response = await fetchFromAPI({
      token,
      endpoint: `/users/${user.username}/routines`
    });

    console.log('fetchMyRoutines response:', response);

    if (Array.isArray(response)) {
      setMyRoutines(response);
    }
  }

  useEffect(() => {
    fetchMyRoutines();
  }, []);

  return <>
    {
      !myRoutines
        ? history.push('/')
        : <>
          <h2><u>My Routines</u></h2>

          <div className='myRoutines'>
            {
              routines.map((routine, idx) => (
                <div key={routine.id ?? idx}>
                  <h3><u>Name: {routine.name}</u></h3>
                  <p>Goal: {routine.goal}</p>
                  <h6>Creator Name: {routine.creatorName}</h6>

                  <h3><u>Activities:</u></h3>
                  {
                    routine.activities.map((activity, idx) => (
                      <div key={activity.id ?? idx}>
                        <h4>Name: {activity.name}</h4>
                        <p>Description: {activity.description}</p>
                        <p>Duration: {activity.duration}</p>
                        <p>Count: {activity.count}</p>
                      </div>
                    ))
                  }
                  <hr></hr>
                </div>
              ))
            }
          </div>
        </>
    }
  </>
}

export default MyRoutines;