import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchFromAPI } from "../api";
import { RoutineForm, AddActivityForm, UpdateActivityForm } from "./index";

const MyRoutines = ({ token, user }) => {
  const history = useHistory();
  const [myRoutines, setMyRoutines] = useState([]);
  const [activities, setActivities] = useState([]);

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

    if (data) {
      setActivities(data);
    }
  }

  useEffect(() => {
    user && fetchMyRoutines();
    fetchActivities();
  }, []);

  return <div className="myRoutines">
    {token ?
      <>
        <div className="myRoutinesHeaderContainer">
        <h2 className="myRoutinesHeader" ><u>My Routines</u></h2>

        <RoutineForm
          token={token}
          user={user}
          fetchMyRoutines={fetchMyRoutines}
        />
        </div>
        <div>
          {
            myRoutines.map((routine, idx) => (
              <div className="routine" key={routine.id ?? idx}>
                <h3><u>Name: {routine.name}</u></h3>

                <button
                  type='button'
                  className='deleteRoutineButton'
                  onClick={async () => {
                    const result = await fetchFromAPI({
                      token,
                      method: 'delete',
                      endpoint: `/routines/${routine.id}`
                    });
                    if (!result.message) fetchMyRoutines();
                  }}
                >Delete Routine</button>

                <RoutineForm
                  token={token}
                  user={user}
                  routine={routine}
                  fetchMyRoutines={fetchMyRoutines}
                />

                <AddActivityForm
                  activities={activities}
                  routineId={routine.id}
                  token={token}
                  fetchMyRoutines={fetchMyRoutines}
                />

                <p>Goal: {routine.goal}</p>
                <h6>Creator Name: {routine.creatorName}</h6>

                <h3><u>Activities:</u></h3>

                {
                  routine.activities.map((activity, idx) => (
                    <div key={activity.id ?? idx}>
                      <h4>Name: {activity.name}</h4>

                      <button
                        type='button'
                        className='deleteActivityButton'
                        onClick={async () => {
                          const result = await fetchFromAPI({
                            token,
                            method: 'delete',
                            endpoint: `routine_activities/${activity.routineActivityId}`
                          });
                          if (!result.message) fetchMyRoutines();
                        }}
                      >Delete Activity</button>

                      <UpdateActivityForm
                        token={token}
                        fetchMyRoutines={fetchMyRoutines}
                        activity={activity}
                      />

                      <p>Description: {activity.description}</p>
                      <p>Duration: {activity.duration}</p>
                      <p>Count: {activity.count}</p>

                    </div>
                  ))
                }

              </div>
            ))
          }
        </div>
      </>
      : history.push('/user/login')
    }
  </div>
}

export default MyRoutines;