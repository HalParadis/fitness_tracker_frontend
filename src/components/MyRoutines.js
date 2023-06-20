import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchFromAPI } from "../api";
import { RoutineForm, RoutineActivityForm } from "./index";

const MyRoutines = ({ token, user }) => {
  const history = useHistory();
  const [myRoutines, setMyRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  //const [routineId, setRoutineId] = useState('');

  const fetchMyRoutines = async () => {
    const response = await fetchFromAPI({
      token,
      endpoint: `/users/${user.username}/routines`
    });

    if (Array.isArray(response)) {
      setMyRoutines(response);
    }
  }

  const fetchActivities = async () => {
    const data = await fetchFromAPI({
      endpoint: "activities",
    });

    console.log("data: ", data);

    if (data) {
      setActivities(data);
    }
  }

  useEffect(() => {
    user && fetchMyRoutines();
    fetchActivities();
  }, []);

  return <>
    {token ?
      <>
        <h2><u>My Routines</u></h2>
        <RoutineForm
          token={token}
          user={user}
          fetchMyRoutines={fetchMyRoutines}
        />

        <div className='myRoutines'>
          {
            myRoutines.map((routine, idx) => (
              <div key={routine.id ?? idx}>
                <h3><u>Name: {routine.name}</u></h3>
                <RoutineForm
                  token={token}
                  user={user}
                  routine={routine}
                  fetchMyRoutines={fetchMyRoutines}
                />
                <p>Goal: {routine.goal}</p>
                <h6>Creator Name: {routine.creatorName}</h6>

                <h3><u>Activities:</u></h3>
                <RoutineActivityForm 
                  activities={activities}
                />
                {
                  routine.activities.map((activity, idx) => (
                    <div key={activity.id ?? idx}>
                      <RoutineActivityForm 
                        activity={activity}
                      />

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
      : history.push('/userForm/login')
    }
  </>
}

export default MyRoutines;